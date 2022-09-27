interface IContext {
    import(name: string): Promise<any>
};

type IImportDef = (e: any) => void;
type IExportDef = (name, value) => void;

type ISetup = () => void | Promise<void>;

type IModuleSetup = (exports: IExportDef, context: IContext ) => IModule;

interface IModule {
    setters: IImportDef[];
    execute: ISetup;
}
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
            const loader = async () => {
                const all = [];
                for (const iterator of module.dependencies) {
                    if (iterator.isResolved
                        || iterator.ignoreModule === module
                        || iterator === module.ignoreModule
                        || (iterator.importPromise && iterator.isDependentOn(module))) {
                        all.push(Promise.resolve(iterator.exports));
                        continue;
                    }
                    all.push(this.import(iterator));
                }
                const resolved = await Promise.all(all);
                const r = setup((key, value) => {
                    module.exports[key] = value;
                }, instance);

                // set all imports...
                const { setters } = r;
                for (let index = 0; index < resolved.length; index++) {
                    const element = resolved[index];
                    setters[index](element);
                }

                const rp = r.execute();
                if (rp && rp.then) {
                    await rp;
                }

                if (module.dynamicImports) {
                    for (const iterator of module.dynamicImports) {
                        if (iterator.replacedModule.importPromise) {
                            continue;
                        }
                        await instance.import(iterator.replacedModule);
                    }
                }
                return module.exports;
            };

            module.resolver = loader();
            module.factory = () => module.exports;
        };
    }

};