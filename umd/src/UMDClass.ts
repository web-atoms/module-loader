/// <reference path="./AmdLoader.ts"/>
/// <reference path="./TSLib.ts"/>

// declare var Symbol: any;

const globalNS = (typeof window !== "undefined" ? window : global);

class UMDClass {

    public debug = false;

    public viewPrefix = "web";

    public defaultApp = "@web-atoms/core/dist/web/WebApp";

    public lang = "en-US";

    public nameSymbol = typeof Symbol !== "undefined" ?  Symbol() : "_$_nameSymbol";

    public get mock(): boolean {
        return AmdLoader.instance.enableMock;
    }

    public set mock(v: boolean) {
        AmdLoader.instance.enableMock = v;
    }

    public resolvePath(n: string): string {
        return AmdLoader.instance.resolveSource(n, null);
    }

    public resolveViewPath(path: string): string {
        return path.replace("{platform}", this.viewPrefix);
    }

    public resolveType(type: any): any {
        return AmdLoader.instance.resolveType(type);
    }

    public map(
        name: string,
        path: string,
        type: ("amd" | "global") = "amd",
        exportVar?: string): void {
        AmdLoader.instance.map(name, path, type, exportVar);
    }

    public setupRoot(name: string, url: string): void {
        AmdLoader.instance.setupRoot(name, url);
    }

    public mockType(type: any, name: string): void {
        AmdLoader.instance.replace(type, name, true);
    }

    public inject(type: any, name: string): void {
        AmdLoader.instance.replace(type, name, false);
    }

    public async resolveViewClassAsync(path: string): Promise<any> {
        path = this.resolveViewPath(path);
        const e: any = await AmdLoader.instance.import(path);
        return e.default;
    }

    public import(path: string): Promise<any> {
        return AmdLoader.instance.import(path);
    }

    public async load(path: string, designMode?: boolean): Promise<any> {
        this.mock = designMode;
        const t: any = await AmdLoader.instance.import("@web-atoms/core/dist/core/types");
        const a: any = await AmdLoader.instance.import("@web-atoms/core/dist/Atom");
        a.Atom.designMode = designMode;
        const al: any = await AmdLoader.instance.import("@web-atoms/core/dist/core/AtomList");
        return await AmdLoader.instance.import(path);
    }

    /**
     * Host the view inside given element with given id
     * @param id id of element to host view in
     * @param path path of module
     * @param designMode true/false (default false)
     */
    public async hostView(id: string | HTMLElement, path: string, designMode?: boolean): Promise<any> {
        try {
            this.mock = designMode;
            AmdLoader.instance.get(path);
            const m: any = await this.load(this.defaultApp, designMode);
            const app: any = (globalNS.webApp ??= new (m.default)());
            await app.initPromise;
            const viewClass: any = await AmdLoader.instance.import(path);
            const view: any = new (viewClass.default)(app);
            // app.root = view;
            const element: HTMLElement = typeof id === "string" ? document.getElementById(id) : id;
            element.appendChild(view.element);
            return view;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);
        }
    }

    public async loadView(path: string, designMode?: boolean, appPath?: string): Promise<any> {
        try {
            this.mock = designMode;
            appPath = appPath || this.defaultApp;
            AmdLoader.instance.get(path);
            const m: any = await this.load(appPath, designMode);
            const app: any = (globalNS.webApp ??= new (m.default)());
            await app.initPromise;
            const viewClass: any = await AmdLoader.instance.import(path);
            const view: any = new (viewClass.default)(app);
            app.root = view;
            return view;
        } catch (er) {
            // tslint:disable-next-line: no-console
            console.error(er);
            throw er;
        }
    }

}

const UMD: UMDClass = new UMDClass();
((u) => {
    globalNS.UMD = u;
    globalNS.AmdLoader = AmdLoader;
    globalNS.System = System;
    AmdLoader.instance.registerModule("tslib", setupTSLib());
})(UMD);
