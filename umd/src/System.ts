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

        const currentModule: Module = document.currentScript?.[currentModuleSymbol] ?? AmdLoader.current;

        const name = typeof nameOrImports === "string"
            ? nameOrImports
            : void 0;

        let imports = importsOrSetup as string[];
        if (arguments.length === 2) {
            imports = nameOrImports as string[];
            setup = importsOrSetup as IModuleSetup;
        }

        const module = name ? instance.get(name) : currentModule;

        if (module.packed) {
            for(const d of imports) {
                const absolutePath = module.require.resolve(d);
                const dm = instance.get(absolutePath);
                if (/\.(css|less)$/i.test(absolutePath)) {
                    // we will not add it as a dependency
                    // ass css/less are packed.
                    dm.packed = true;
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

        module.setup = setup;

        module.loader = promiseDone;

        const r = module.setup((key, value) => {
            if (typeof key === "object") {
                merge(module.exports, key);
                if (!module.exports.default) {
                    module.exports.default = module.exports;
                }
                return module.exports;
            }
            module.exports[key] = value;
            return value;
        }, module);

        module.resolver = async () => {

            const ds = [];

            const { setters } = r;
            let isCircularDependency;
            let index = 0;
            for (const iterator of module.dependencies) {

                const set = setters[index++];

                if (iterator.isResolved) {
                    set(iterator.getExports());
                    continue;
                }

                const setP = this.import(iterator).then(set);

                if (iterator.isDependentOn(module)) {
                    isCircularDependency = true;
                    continue;
                }
                ds.push(setP);
            }

            await Promise.all(ds);

            if (isCircularDependency) {
                await new Promise((resolve) => setTimeout(resolve,1));
            }

            const rp = r.execute() as any;
            if (rp?.then) {
                await rp;
            }
            module.isResolved = true;
            module.getExports();
            if (module.postExports) {
                module.postExports();
            }
    
            if (module.dynamicImports) {
                for (const iterator of module.dynamicImports) {
                    if (iterator.replacedModule.importPromise) {
                        continue;
                    }
                    await this.import(iterator.replacedModule);
                }
            }
            return module.exports;
        };

        return module;
        
    }
}
