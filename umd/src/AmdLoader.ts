/// <reference path="./Promise.ts"/>
/// <reference path="./ReflectMetadata.ts"/>
/// <reference path="./ArrayHelper.ts"/>
/// <reference path="./Module.ts"/>
declare var require: any;

declare var md: any;

if (typeof require !== "undefined") {
    md = require("module").Module;
}

class AmdLoader {

    public static isMedia = /\.(jpg|jpeg|gif|png|mp4|mp3|css|html|svg|json)$/i;

    public static globalVar: any = {};

    public static moduleProgress: (name: string, modules: {[key: string]: Module}, status: "done" | "loading") => void;

    public static moduleLoader:
        (packageName: string, url: string, success: () => void, failed: (error: any) => void) => void;

    public static instance: AmdLoader = new AmdLoader();

    public static current: Module = null;

    public root: Module = null;

    public defaultUrl: string = null;

    public currentStack: Module[] = [];

    // public pendingModules: Module[] = [];

    // public resolverStack: Module[] = [];

    // only useful in node environment
    public nodeModules: Module[] = [];

    public modules: { [key: string]: Module } = {};

    public pathMap: { [key: string]: IPackage } = {};

    public enableMock: boolean;

    public define: any;

    private mockTypes: MockType[] = [];

    private lastTimeout: any = null;

    private tail: Module;

    private dirty: boolean = false;

    public register(
        packages: string[],
        modules: string[]): void {
        for (const iterator of packages) {
            if (!this.pathMap[iterator]) {
                this.map(iterator, "/");
            }
        }
        for (const iterator of modules) {
            this.get(iterator);
        }
    }

    public setupRoot(root: string, url: string): void {
        for (const key in this.pathMap) {
            if (this.pathMap.hasOwnProperty(key)) {
                const moduleUrl: string = key === root ? url : `${url}/node_modules/${key}`;
                this.map(key, moduleUrl);
            }
        }
        this.defaultUrl = `${url}/node_modules/`;
    }

    public registerModule(name: string, moduleExports: { [key: string]: any }): void {
        const m: Module = this.get(name);
        m.package.url = "/";
        m.exports = { __esModule: true, ... moduleExports };
        m.loader = Promise.resolve();
        m.resolver = Promise.resolve(m.exports);
        m.isLoaded = true;
        m.isResolved = true;
    }

    public setup(name: string): void {
        const jsModule: Module = this.get(name);
        // tslint:disable-next-line:ban-types
        const define: Function = this.define;
        jsModule.loader = Promise.resolve();
        AmdLoader.current = jsModule;
        if (define) {
            define();
        }
        if (jsModule.exportVar) {
            jsModule.exports = AmdLoader.globalVar[jsModule.exportVar];
        }

        this.push(jsModule);

        jsModule.isLoaded = true;
        setTimeout(() => {
            this.loadDependencies(jsModule);
        }, 1);
    }

    public loadDependencies(m: Module): void {
        this.resolveModule(m).catch((e) => {
            // tslint:disable-next-line:no-console
            console.error(e);
        });
        if (m.dependencies.length) {
            const all = m.dependencies.map(async (m1) => {
                if (m1.isResolved) { return; }
                await this.import(m1);
            });
            Promise.all(all).catch((e) => {
                // tslint:disable-next-line:no-console
                console.error(e);
            }).then(() => {
                m.resolve();
            });
        } else {
            m.resolve();
        }
        this.queueResolveModules(1);
    }

    public replace(type: any, name: string, mock: boolean): void {
        if (mock && !this.enableMock) {
            return;
        }
        const peek: Module = this.currentStack.length ? this.currentStack[this.currentStack.length - 1] : undefined;
        const rt: MockType = new MockType(peek, type, name, mock);
        this.mockTypes.push(rt);
    }

    public resolveType(type: any): any {
        const t: MockType = this.mockTypes.find((tx) => tx.type === type);
        return t ? t.replaced : type;
    }

    public map(
        packageName: string,
        packageUrl: string,
        type: ("amd" | "global") = "amd",
        exportVar?: string
    ): IPackage {

        // ignore map if it exists already...
        let existing: IPackage = this.pathMap[packageName];
        if (existing) {
            existing.url = packageUrl;
            existing.exportVar = exportVar;
            existing.type = type;
            return existing;
        }

        existing = {
            name: packageName,
            url: packageUrl,
            type,
            exportVar,
            version: ""
        };
        if (packageName === "reflect-metadata") {
            type = "global";
        }

        this.pathMap[packageName] = existing;
        return existing;
    }

    public resolveSource(name: string, defExt: string = ".js"): string {
        try {
            if (/^((\/)|((http|https)\:\/\/))/i.test(name)) {
                // console.log(`ResolveSource fail: ${name}`);
                return name;
            }
            let path: string = null;
            for (const key in this.pathMap) {
                if (this.pathMap.hasOwnProperty(key)) {
                    const packageName: string = key;
                    if (name.startsWith(packageName)) {
                        path = this.pathMap[key].url;
                        if (name.length !== packageName.length) {
                            if (name[packageName.length] !== "/") {
                                continue;
                            }
                            name = name.substr(packageName.length + 1);
                        } else {
                            return path;
                        }
                        if (path.endsWith("/")) {
                            path = path.substr(0, path.length - 1);
                        }
                        path = path + "/" + name;
                        const i = path.lastIndexOf("/");
                        const fname = path.substr(i + 1);
                        if (fname.indexOf(".") === -1) {
                            path = path + defExt;
                        }
                        // if (defExt && !path.endsWith(defExt)) {
                        //     path = path + defExt;
                        // }
                        return path;
                    }
                }
            }
            return name;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(`Failed to resolve ${name} with error ${JSON.stringify(e)}`);
            // tslint:disable-next-line:no-console
            console.error(e);
        }
    }

    public resolveRelativePath(name: string, currentPackage: string): string {

        if (name.charAt(0) !== ".") {
            return name;
        }

        const tokens: string[] = name.split("/");

        const currentTokens: string[] = currentPackage.split("/");

        currentTokens.pop();

        while (tokens.length) {
            const first: string = tokens[0];
            if (first === "..") {
                currentTokens.pop();
                tokens.splice(0, 1);
                continue;
            }
            if (first === ".") {
                tokens.splice(0, 1);
            }
            break;
        }

        return `${currentTokens.join("/")}/${tokens.join("/")}`;
    }

    public getPackageVersion(name: string): ({
        packageName: string,
        version: string,
        name: string
    }) {
        let [scope, packageName] = name.split("/", 3);
        let version: string = "";
        if (scope[0] !== "@") {
            packageName = scope;
            scope = "";
        } else {
            scope += "/";
        }

        const versionTokens: string[] = packageName.split("@");
        if (versionTokens.length > 1) {
            // remove version and map it..
            version = versionTokens[1];
            name = name.replace("@" + version, "");
        }
        packageName = scope + packageName;
        return { packageName, version, name };
    }

    public get(name1: string): Module {

        let module: Module = this.modules[name1];
        if (!module) {

            // strip '@' version info
            const { packageName, version, name } = this.getPackageVersion(name1);
            module = new Module(name);

            this.modules[name1] = module;

            module.package = this.pathMap[packageName] ||
                (this.pathMap[packageName] = {
                        type: "amd",
                        name: packageName,
                        version,
                        url: this.defaultUrl ?
                            (this.defaultUrl + packageName) : undefined
                    });

            module.url = this.resolveSource(name);
            if (!module.url) {
                if (typeof require === "undefined") {
                    throw new Error(`No url mapped for ${name}`);
                }
            }
            module.require = (n: string) => {
                const an: string = this.resolveRelativePath(n, module.name);
                const resolvedModule: Module = this.get(an);
                const m = resolvedModule.getExports();
                return m;
            };
            module.require.resolve = (n: string) => this.resolveRelativePath(n, module.name);
            this.modules[name] = module;
        }
        return module;
    }

    public async import(name: string | Module): Promise<any> {
        if (typeof require !== "undefined") {
            return Promise.resolve(require(name));
        }
        const module: Module = typeof name === "object" ? name as Module : this.get(name);
        await this.load(module);
        const e = await this.resolveModule(module);
        return e;
    }

    public load(module: Module): Promise<any> {

        if (module.loader) {
            return module.loader;
        }
        this.push(module);
        if (AmdLoader.isMedia.test(module.url)) {
            const m = {
                url: module.url,
                toString: () => module.url
            };
            const e = { __esModule: true, default: m };
            module.exports = e;
            module.emptyExports = e;
            module.loader = Promise.resolve();
            module.isLoaded = true;
            return module.loader;
        }
        module.loader = new Promise((resolve, reject) => {

            AmdLoader.moduleLoader(module.name, module.url, () => {

                try {
                    AmdLoader.current = module;
                    if (AmdLoader.instance.define) {
                        AmdLoader.instance.define();
                        AmdLoader.instance.define = null;
                    }

                    if (module.exportVar) {
                        module.exports = AmdLoader.globalVar[module.exportVar];
                    }

                    if (AmdLoader.moduleProgress) {
                        AmdLoader.moduleProgress(module.name, this.modules , "loading");
                    }

                    module.isLoaded = true;

                    setTimeout(() => {
                        this.loadDependencies(module);
                    }, 1);
                    resolve();

                } catch (e) {
                    reject(e);
                }

            }, (error) => {
                reject(error);
            });

        });

        return module.loader;
    }

    public resolveModule(module: Module): Promise<any> {
        if (module.resolver) {
            return module.resolver;
        }
        module.resolver = this._resolveModule(module);
        return module.resolver;
    }

    public remove(m: Module): void {
        if (this.tail === m) {
            this.tail = m.previous;
        }
        if (m.next) {
            m.next.previous = m.previous;
        }
        if (m.previous) {
            m.previous.next = m.next;
        }
        m.next = null;
        m.previous = null;
        this.dirty = true;
        this.queueResolveModules();
    }

    public queueResolveModules(n: number = 1): void {
        if (this.lastTimeout) {
            // clearTimeout(this.lastTimeout);
            // this.lastTimeout = null;
            return;
        }
        this.lastTimeout = setTimeout(() => {
            this.lastTimeout = 0;
            this.resolvePendingModules();
        }, n);
    }

    private resolvePendingModules(): void {

        if (!this.tail) {
            return;
        }

        this.dirty = false;

        // first resolve modules without any
        // dependencies
        const pending: Module[] = [];
        let m = this.tail;
        while (m) {
            if (!m.dependencies.length) {
                m.resolve();
            } else {
                pending.push(m);
            }
            m = m.previous;
        }
        if (this.dirty) {
            this.dirty = false;
            return;
        }
        for (const iterator of pending) {
            iterator.resolve();
        }
        if (this.dirty) {
            this.dirty = false;
            return;
        }
        if (this.tail) {
            this.queueResolveModules();
        }
    }

    private push(m: Module): void {
        if (this.tail) {
            m.previous = this.tail;
            this.tail.next = m;
        }
        this.tail = m;
    }

    private async _resolveModule(module: Module): Promise<any> {

        if (!this.root) {
            this.root = module;
        }

        await new Promise((resolve, reject) => {
            module.dependencyHooks = [resolve, reject];
        });

        // tslint:disable-next-line:typedef
        const exports = module.getExports();

        // load requested dependencies for mock or abstract injects
        const pendingList: MockType[] = this.mockTypes.filter((t) => !t.loaded );
        if (pendingList.length) {
            for (const iterator of pendingList) {
                iterator.loaded = true;
            }
            const tasks = pendingList.map(async (iterator) => {
                const containerModule: Module = iterator.module;
                const resolvedName: string = this.resolveRelativePath(iterator.moduleName, containerModule.name);
                const im: Module = this.get(resolvedName);
                im.ignoreModule = module;
                const ex: any = await this.import(im);
                const type: any = ex[iterator.exportName];
                iterator.replaced = type;
            });
            await Promise.all(tasks);
        }

        const setHooks: Promise<void> = new Promise((resolve, reject) => {
            module.resolveHooks = [resolve, reject];
        });
        await setHooks;

        if (this.root === module) {
            this.root = null;
            AmdLoader.moduleProgress(null, this.modules, "done");
        }
        module.isResolved = true;

        return exports;
    }

}

declare var global: any;

const a: AmdLoader = AmdLoader.instance;
a.map("global", "/", "global");
a.registerModule("global/document",  { default: document });
a.registerModule("global/window", { default: typeof window !== "undefined" ? window : global });
a.map("reflect-metadata", "/", "global");
a.registerModule("reflect-metadata", Reflect);

AmdLoader.moduleLoader = (name, url, success, error) => {

    const script: HTMLScriptElement = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    const s: any = script as any;
    script.onload = s.onreadystatechange = () => {
        if ((s.readyState && s.readyState !== "complete" && s.readyState !== "loaded")) {
            return;
        }
        script.onload = s.onreadystatechange = null;
        success();
    };
    script.onerror = (e) => { error(e); };
    document.body.appendChild(script);
};

AmdLoader.moduleProgress = (() => {

    if (!document) {
        return (name, p) => {
            // tslint:disable-next-line:no-console
            console.log(`${name} ${p}%`);
        };
    }

    const progressDiv: HTMLDivElement = document.createElement("div");
    progressDiv.className = "web-atoms-progress-div";
    const style: CSSStyleDeclaration = progressDiv.style;

    style.position = "absolute";
    style.margin = "auto";
    style.width = "200px";
    style.height = "100px";
    style.top = style.right = style.left = style.bottom = "5px";

    style.borderStyle = "solid";
    style.borderWidth = "1px";
    style.borderColor = "#A0A0A0";
    style.borderRadius = "5px";
    style.padding = "5px";
    style.textAlign = "left";
    style.verticalAlign = "bottom";

    const progressLabel: HTMLPreElement = document.createElement("pre");
    progressDiv.appendChild(progressLabel);
    progressLabel.style.color = "#A0A0A0";

    const ps: CSSStyleDeclaration = progressLabel.style;
    ps.position = "absolute";
    ps.left = "5px";
    ps.bottom = "0";

    function ready(): void {
        document.body.appendChild(progressDiv);
    }

    function completed(): void {
        document.removeEventListener( "DOMContentLoaded", completed );
        window.removeEventListener( "load", completed );
        ready();
    }

    if ( document.readyState === "complete" ||
        // tslint:disable-next-line:no-string-literal
        ( document.readyState !== "loading" && !document.documentElement["doScroll"] ) ) {

        window.setTimeout( ready );
    } else {
        document.addEventListener( "DOMContentLoaded", completed );
        window.addEventListener( "load", completed );
    }

    return (name, n, status) => {
        if (status === "done") {
            progressDiv.style.display = "none";
            return;
        } else {
            progressDiv.style.display = "block";
        }
        name = name.split("/").pop();
        progressLabel.textContent = name;
    };
})();
