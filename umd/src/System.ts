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

class System {

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
            instance.define = () => {

            const name = typeof nameOrImports === "string"
                ? nameOrImports
                : AmdLoader.current.name;

            let imports = importsOrSetup as string[];
            if (arguments.length === 2) {
                imports = nameOrImports as string[];
                setup = importsOrSetup as IModuleSetup;
            }

            const module = instance.get(name);
            module.dependencies.push(... imports.map((x) => instance.get(module.require.resolve(x))));
            module.isLoaded = true;
            // const loader = async () => {


            //     const all = [];
            //     for (const iterator of module.dependencies) {
            //         if (iterator.isResolved
            //             // || iterator.ignoreModule === module
            //             // || iterator === module.ignoreModule
            //             || (iterator.importPromise && iterator.isDependentOn(module))) {
            //             all.push(Promise.resolve(iterator.exports));
            //             continue;
            //         }
            //         all.push(this.import(iterator));
            //     }
            //     const resolved = await Promise.all(all);
            //     AmdLoader.instance.currentStack.push(module);
            //     const r = setup((key, value) => {
            //         if (typeof key === "object") {
            //             merge(module.exports, key);
            //             return module.exports;
            //         }
            //         module.exports[key] = value;
            //         return value;
            //     }, instance);
            //     AmdLoader.instance.currentStack.pop();

            //     const def = module.exports.default;
            //     if (typeof def === "function" || typeof def === "object") {
            //         def[UMD.nameSymbol] = module.name;
            //     }

            //     // set all imports...
            //     const { setters } = r;
            //     for (let index = 0; index < resolved.length; index++) {
            //         const element = resolved[index];
            //         setters[index](element);
            //     }
            //     module.isResolved = true;
            //     const rp = r.execute();
            //     if (rp && rp.then) {
            //         await rp;
            //     }

            //     module.postExports?.();

            //     if (module.dynamicImports) {
            //         for (const iterator of module.dynamicImports) {
            //             if (iterator.replacedModule.importPromise) {
            //                 continue;
            //             }
            //             await instance.import(iterator.replacedModule);
            //         }
            //     }
            //     return module.exports;
            // };

            // module.resolver = loader();
            module.factory = () => {
                const r = setup((key, value) => {
                            if (typeof key === "object") {
                                merge(module.exports, key);
                                return module.exports;
                            }
                            module.exports[key] = value;
                            return value;
                        }, instance);

                var list = module.dependencies;

                const { setters } = r;
                    for (let index = 0; index < list.length; index++) {
                        const element = list[index];
                        setters[index](element.getExports());
                    }
                return module.exports;
            }
        };
    }

}
