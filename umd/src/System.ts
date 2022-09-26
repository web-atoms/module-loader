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

    public static register(imports: string[],
        setup: IModuleSetup);
    public static register(name: string,
        imports: string[],
        setup: IModuleSetup);
    public static register(
        nameOrImports: string | string[],
        importsOrSetup: string[] | IModuleSetup,
        setup?: IModuleSetup) {

            AmdLoader.instance.define = () => {
        
            let name = AmdLoader.current.name;

            let imports = importsOrSetup as string[];
            if (arguments.length === 2) {
                imports = nameOrImports as string[];
                setup = importsOrSetup as IModuleSetup;
            }

            const module = AmdLoader.instance.get(name);
            module.dependencies.push(... imports.map((x) => AmdLoader.instance.get(module.require.resolve(x))));
            const loader = async () => {
                const all = [];
                for (const iterator of module.dependencies) {
                    if (iterator.isResolved
                        || iterator.ignoreModule === module
                        || iterator === module.ignoreModule
                        || (iterator.importPromise && iterator.isDependentOn(module))) {
                        all.push(iterator.exports);
                        continue;
                    }
                    all.push(this.import(iterator));
                }
                await Promise.all(all);
                const r = setup((name, value) => {
                    module.exports[name] = value;
                }, AmdLoader.instance);

                // set all imports...
                const { setters } = r;
                for (let index = 0; index < all.length; index++) {
                    const element = all[index];
                    setters[index](element);
                }

                const rp = r.execute();
                if (rp && rp.then) {
                    await rp;
                }
                return module.exports;
            };

            module.resolver = loader();
        };
    }

};