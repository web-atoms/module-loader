/// <reference path="./AmdLoader.ts"/>

class UMDClass {

    public viewPrefix = "web";

    public defaultApp = "web-atoms-core/dist/web/WebApp";

    public lang = "en-US";

    public resolvePath(n: string): string {
        return AmdLoader.instance.resolveSource(n, null);
    }

    public resolveViewPath(path: string): string {
        return path.replace("{platform}", this.viewPrefix);
    }

    public map(
        name: string,
        path: string,
        type: ("amd" | "global") = "amd",
        exportVar?: string): void {
        AmdLoader.instance.map(name, path, type, exportVar);
    }

    public mockType(type: any, name: string): void {
        AmdLoader.instance.replace(type, name, true);
    }

    public inject(type: any, name: string): void {
        AmdLoader.instance.replace(type, name, false);
    }

    public mock(): void {
        AmdLoader.instance.enableMock = true;
    }

    public async resolveViewClassAsync(path: string): Promise<any> {
        path = this.resolveViewPath(path);
        const e: any = await AmdLoader.instance.import(path);
        return e.default;
    }

    public async load(path: string, designMode?: boolean): Promise<any> {
        const a: any = await AmdLoader.instance.import("web-atoms-core/dist/Atom");
        a.Atom.designMode = designMode;
        const al: any = await AmdLoader.instance.import("web-atoms-core/dist/core/AtomList");
        return await AmdLoader.instance.import(path);
    }

    public async loadView(path: string, designMode?: boolean, appPath?: string): Promise<any> {
        appPath = appPath || this.defaultApp;
        const m: any = await this.load(appPath, designMode);
        const app: any = new (m.default)();
        app.onReady(async () => {
            try {
                const viewClass: any = await AmdLoader.instance.import(path);
                const view: any = new (viewClass.default)(app);
                app.root = view;
            } catch (e) {
                console.error(e);
            }
        });
    }


}

const UMD: UMDClass = new UMDClass();