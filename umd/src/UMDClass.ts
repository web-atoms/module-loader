/// <reference path="./AmdLoader.ts"/>

class UMDClass {

    public viewPrefix = "web";

    public defaultApp = "web-atoms-core/dist/web/WebApp";

    public resolvePath(n: string): string {
        return AmdLoader.instance.resolveSource(n, null);
    }

    public resolveViewPath(path: string): string {
        return path.replace("{platform}", this.viewPrefix);
    }

    public map(
        name: string,
        path: string,
        type: ("amd" | "global") = "amd"): void {
        AmdLoader.instance.map(name, path, type);
    }

    public async resolveViewClassAsync(path: string): Promise<any> {
        path = this.resolveViewPath(path);
        const e: any = AmdLoader.instance.import(path);
        return e.default;
    }

    public async load(path: string, designMode?: boolean): Promise<any> {
        const { Atom } = await AmdLoader.instance.import("web-atoms-core/dist/Atom");
        Atom.designMode = designMode;
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