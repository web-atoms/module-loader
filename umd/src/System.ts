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

        module.setup = setup;

        module.loader = promiseDone;

        const r = module.setup((key, value) => {
            if (typeof key === "object") {
                merge(module.exports, key);
                return module.exports;
            }
            module.exports[key] = value;
            return value;
        }, module);

        // var list = module.dependencies;

        // const postResolve = new Promise<void>((resolve, reject) => {
        //     module.factory = () => {
        //         const r = module.setup((key, value) => {
        //                     if (typeof key === "object") {
        //                         merge(module.exports, key);
        //                         return module.exports;
        //                     }
        //                     module.exports[key] = value;
        //                     return value;
        //                 }, module);

        //         var list = module.dependencies;

        //         // wait here...
        //         const ds = [];
        //         for (const iterator of list) {
        //             if (iterator.isResolved
        //                 // || iterator.ignoreModule === module
        //                 // || iterator === module.ignoreModule
        //                 || (iterator.importPromise && iterator.isDependentOn(module))) {
        //                 continue;
        //             }
        //             ds.push(this.import(iterator));
        //         }

        //         Promise.all(ds).then(() => {

        //             const { setters } = r;
        //             for (let index = 0; index < list.length; index++) {
        //                 const element = list[index];
        //                 setters[index](element.getExports());
        //             }

        //             const rp = r.execute() as any;
        //             if (rp?.then) {
        //                 rp.then(resolve, reject);
        //                 // rp.catch((error) => {
        //                 //     console.error(error);
        //                 // });
        //             } else {
        //                 resolve();
        //             }
        //         });

        //         return module.exports;

        //     };
        // });

        module.resolver = async () => {

            const ds = [];

            let isCircularDependency;
            for (const iterator of module.dependencies) {
                if (iterator.isResolved) {
                    continue;
                }

                if (iterator.importPromise && iterator.isDependentOn(module)) {
                    isCircularDependency = true;
                    continue;
                }
                ds.push(this.import(iterator));
            }
            await Promise.all(ds);

            if (isCircularDependency) {
                await new Promise((resolve) => setTimeout(resolve,1));
            }

            const { setters } = r;
            var list = module.dependencies;
            for (let index = 0; index < list.length; index++) {
                const element = list[index];
                setters[index](element.getExports());
            }

            const rp = r.execute() as any;
            module.isResolved = true;
            if (rp?.then) {
                await rp;
            }

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
