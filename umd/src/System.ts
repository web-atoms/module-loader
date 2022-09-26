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

    public static register(imports: string[],
        setup: IModuleSetup);
    public static register(name: string,
        imports: string[],
        setup: IModuleSetup);
    public static register(
        nameOrImports: string | string[],
        importsOrSetup: string[] | IModuleSetup,
        setup?: IModuleSetup) {

        const loader = async () => {
            let name = Array.isArray(nameOrImports)
                ? AmdLoader.current.name
                : nameOrImports as string;
            let imports = importsOrSetup as string[];
            if (arguments.length === 2) {
                imports = nameOrImports as string[];
                setup = importsOrSetup as IModuleSetup;
            }

            const module = AmdLoader.instance.get(name);
            // load all modules...
            const all = await Promise.all(
                imports.map(
                    (x) => AmdLoader.instance.import(module.require.resolve(x))
                )
            );

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

        }

        AmdLoader.instance.define = () => {
            loader().catch((error) => console.error(error));
        };
    }

};