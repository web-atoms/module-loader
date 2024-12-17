/// <reference path="./Module.ts"/>

interface IContext {
    import(name: string): Promise<any>;
}

type IImportDef = (e: any) => void;
type IExportDef = (name, value) => void;

type ISetup = () => void | Promise<void>;

type IModuleSetup = (exports: IExportDef, context: IContext ) => IModule;

interface IModule {
    setters: IImportDef[];
    execute: ISetup;
}

const merge = (target, source) => {
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
        }
    }
};

const enumerable = true, configurable = true;

class System {

    /**
     * Returns absolute url for given module id
     * @param id module identifier
     * @returns absolute URL
     */
    public static resolve(id) {
        return AmdLoader.instance.resolveSource(id);
    }

    public static import(name) {
        return AmdLoader.instance.import(name);
    }

    public static register(
        imports: string[],
        setup: IModuleSetup);
    public static register(
        name: string,
        imports: string[],
        setup: IModuleSetup);
    public static register(
        nameOrImports: string | string[],
        importsOrSetup: string[] | IModuleSetup,
        setup?: IModuleSetup) {

        const instance = AmdLoader.instance;

        if (!AmdLoader.current) {
            // dynamic loader
            const amdModule = document.currentScript[currentModuleSymbol];

            if (amdModule) {
                AmdLoader.current = amdModule;
            }
        }

        const name = typeof nameOrImports === "string"
            ? nameOrImports
            : AmdLoader.current.name;

        let imports = importsOrSetup as string[];
        if (arguments.length === 2) {
            imports = nameOrImports as string[];
            setup = importsOrSetup as IModuleSetup;
        }

        const module = instance.get(name);

        module.loader = new Promise((resolve, reject) => {
            if (module.isLoaded) {
                return;
            }
            if (module.packed) {
                for(const d of imports) {
                    const absolutePath = module.require.resolve(d);
                    const dm = instance.get(absolutePath);
                    if (/\.(css|less)$/i.test(absolutePath)) {
                        // we will not add it as a dependency
                        // ass css/less are packed.
                        dm.packed = true;
                        continue;
                    }
                    module.dependencies.push(dm);
                }
            } else {
                for(const d of imports) {
                    const absolutePath = module.require.resolve(d);
                    const dm = instance.get(absolutePath);
                    module.dependencies.push(dm);
                }
            }
            module.isLoaded = true;

            if (module.exportVar) {
                module.exports = AmdLoader.globalVar[module.exportVar];
            }

            module.resolver = async () => {

                const postResolve = new Promise<void>((resolve, reject) => {
                    module.factory = () => {
                        const r = setup((key, value) => {
                                    if (typeof key === "object") {
                                        merge(module.exports, key);
                                        return module.exports;
                                    }
                                    module.exports[key] = value;
                                    return value;
                                }, module);
    
                        var list = module.dependencies;
    
                        const { setters } = r;
                        for (let index = 0; index < list.length; index++) {
                            const element = list[index];
                            setters[index](element.getExports());
                        }
    
                        const rp = r.execute() as any;
                        if (rp?.then) {
                            rp.then(resolve, reject);
                            // rp.catch((error) => {
                            //     console.error(error);
                            // });
                        } else {
                            resolve();
                        }
    
                        return module.exports;
                    };
                });

                await AmdLoader.instance.resolve(module);
                await postResolve;
                return module.exports;
            };
            resolve(module);
        });

        return module;
        
    }
}
