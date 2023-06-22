/// <reference path="./TSLib.ts"/>
/// <reference path="./ReflectMetadata.ts"/>
/// <reference path="./ArrayHelper.ts"/>
/// <reference path="./Module.ts"/>
declare var require: any;

declare var md: any;

if (typeof require !== "undefined") {
    md = require("module").Module;
}

// we cannot use global import as global import do not support any event of dependent modules loaded,
// there is no way to detect duplication of module
// there is no way to inspect and set path of module

// const globalImport = typeof global !== "undefined"
//     ? global.import
//     : (window as any).import;

const promiseDone = Promise.resolve(0);

class AmdLoader {

    public static isMedia = /\.(jpg|jpeg|gif|png|mp4|mp3|css|html|svg)$/i;

    public static isJson = /\.json$/i;

    public static globalVar: any = {};

    public static moduleProgress: (name: string, modules: Map<string, Module>, status: "done" | "loading") => void;

    public static moduleLoader:
        (packageName: string, url: string, success: () => void, failed: (error: any) => void) => void;

    public static httpTextLoader:
        (url: string, resolve: (r: any) => void, failed: (error: any) => void) => void;

    public static instance: AmdLoader = new AmdLoader();

    public static current: Module = null;

    public root: Module = null;

    public defaultUrl: string = null;

    public currentStack: Module[] = [];

    // public pendingModules: Module[] = [];

    // public resolverStack: Module[] = [];

    // only useful in node environment
    public nodeModules: Module[] = [];

    public modules: Map<string, Module> = new Map();

    public pathMap: Map<string, IPackage> = new Map();

    public enableMock: boolean;

    public define: any;

    private mockTypes: MockType[] = [];

    public register(
        packages: string[],
        modules: string[]): void {
        for (const iterator of packages) {
            if (!this.pathMap.has(iterator)) {
                this.map(iterator, "/");
            }
        }
        for (const iterator of modules) {
            this.get(iterator);
        }
    }

    public setupRoot(root: string, url: string): void {
        if (url.endsWith("/")) {
            url = url.substring(0, url.length - 1);
        }
        for (const key of this.pathMap.keys()) {
            const moduleUrl: string = key === root ? url : `${url}/node_modules/${key}`;
            this.map(key, moduleUrl);
        }
        this.defaultUrl = `${url}/node_modules/`;
    }

    public registerModule(name: string, moduleExports: { [key: string]: any }): void {
        const m: Module = this.get(name);
        m.package.url = "/";
        m.exports = { __esModule: true, ... moduleExports };
        m.loader = promiseDone;
        m.resolver = () => Promise.resolve(m.exports);
        m.isLoaded = true;
        m.isResolved = true;
    }

    public setup(name: string): void {
        const jsModule: Module = this.get(name);
        // tslint:disable-next-line:ban-types
        const define: Function = this.define;
        jsModule.loader = promiseDone;
        AmdLoader.current = jsModule;
        if (define) {
            define();
        }
        if (jsModule.exportVar) {
            jsModule.exports = AmdLoader.globalVar[jsModule.exportVar];
        }
        jsModule.isLoaded = true;
        // this is not possible as
        // dynamically injected module may be pending to be injected
        // jsModule.getExports();
        // jsModule.isResolved = true;
    }

    public replace(type: any, name: string, mock: boolean): void {
        if (mock && !this.enableMock) {
            return;
        }
        const peek: Module = this.currentStack.length ? this.currentStack[this.currentStack.length - 1] : undefined;
        name = this.resolveRelativePath(name, peek.name);
        const rt: MockType = new MockType(peek, type, name, mock);
        rt.replacedModule = this.get(rt.moduleName);
        rt.replacedModule.postExports = () => {
            rt.replaced = rt.replacedModule.getExports()[rt.exportName];
        };
        (peek.dynamicImports = peek.dynamicImports || []).push(rt);
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
        let existing: IPackage = this.pathMap.get(packageName);
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

        this.pathMap.set(packageName, existing);
        return existing;
    }

    public resolveSource(name: string, defExt: string = ".js"): string {
        try {
            if (/^((\/)|((http|https)\:\/\/))/i.test(name)) {
                // console.log(`ResolveSource fail: ${name}`);
                return name;
            }
            let path: string = null;
            for (const key of this.pathMap.keys()) {
                const packageName: string = key;
                if (name.startsWith(packageName)) {
                    path = this.pathMap.get(key).url;
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
                    const i = name.lastIndexOf("/");
                    const fileName = name.substr(i + 1);
                    if (fileName.indexOf(".") === -1) {
                        path = path + defExt;
                    }
                    // if (defExt && !path.endsWith(defExt)) {
                    //     path = path + defExt;
                    // }
                    return path;
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

        let module: Module = this.modules.get(name1);
        if (!module) {

            // strip '@' version info
            const { packageName, version, name } = this.getPackageVersion(name1);
            module = new Module(name);

            this.modules.set(name1, module);

            let pp = this.pathMap.get(packageName);
            if (!pp) {
                pp = {
                    type: "amd",
                    name: packageName,
                    version,
                    url: this.defaultUrl ?
                        (this.defaultUrl + packageName) : undefined
                };
                this.pathMap.set(packageName, pp);
            }

            module.package = pp;

            // module.url = this.resolveSource(name);
            // if (!module.url) {
            //     if (typeof require === "undefined") {
            //         throw new Error(`No url mapped for ${name}`);
            //     }
            // }
            module.require = (n: string | string[], resolve, reject) => {
                let isAsync = false;
                if (typeof n !== "string") {
                    n = n[0];
                    isAsync = true;
                }

                const an: string = this.resolveRelativePath(n, module.name);
                const resolvedModule: Module = this.get(an);
                if (isAsync) {
                    return this.import(resolvedModule).then(resolve, reject);
                }
                const m = resolvedModule.getExports();
                return m;
            };
            module.require.resolve = (n: string) => this.resolveRelativePath(n, module.name);
            this.modules.set(name, module);
        }
        return module;
    }

    public import(name: string | Module): Promise<any> {
        const module: Module = typeof name === "object" ? name as Module : this.get(name);
        if (module.importPromise) {
            return module.importPromise;
        }
        const m = this.importNodeModule(module);
        if (m) {
            return m;
        }
        if (module.isResolved) {
            module.importPromise = Promise.resolve(module.getExports());
            return module.importPromise;
        }
        module.importPromise = this.importAsync(module);
        return module.importPromise;
    }

    public importNodeModule(module: Module) {
        if (typeof require !== "undefined") {
            const name = module.url;
            // we are inside node ..
            // we need to check if the module is System or UMD
            // UMD can be loaded directly, but System needs to be loaded
            // via http loader...
            const moduleCode = require("fs").readFileSync(require.resolve(name), "utf8").trim();
            if (!/^System\.Register/.test(moduleCode)) {
                return Promise.resolve(require(name));
            }
        }
    }

    public async importAsync(module: Module): Promise<any> {
        await this.load(module);
        if (module.resolver) {
            return await module.resolver();
        }
        return await this.resolve(module);
    }

    public async resolve(module: Module): Promise<any> {
        const ds = [];
        if (UMD.debug) {
            const waiting = (module as any).waiting = [];
            for (const iterator of module.dependencies) {
                if (iterator.isResolved
                    // || iterator.ignoreModule === module
                    // || iterator === module.ignoreModule
                    || (iterator.importPromise && iterator.isDependentOn(module))) {
                    continue;
                }
                waiting.push(iterator);
                ds.push(this.import(iterator));
            }
        } else {
            for (const iterator of module.dependencies) {
                if (iterator.isResolved
                    // || iterator.ignoreModule === module
                    // || iterator === module.ignoreModule
                    || (iterator.importPromise && iterator.isDependentOn(module))) {
                    continue;
                }
                ds.push(this.import(iterator));
            }
        }
        await Promise.all(ds);
        const exports = module.getExports();
        module.isResolved = true;
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

        return exports;
    }

    public load(module: Module): Promise<any> {

        if (module.loader) {
            return module.loader;
        }
        if (AmdLoader.isJson.test(module.url)) {
            const mUrl = module.url.startsWith(module.package.url) ? module.url : module.package.url + module.url;
            module.loader = new Promise<void>((resolve, reject) => {
                try {
                    AmdLoader.httpTextLoader(mUrl, (r) => {
                        try {
                            module.exports = JSON.parse(r);
                            module.emptyExports = module.exports;
                            module.isLoaded = true;
                            resolve();
                        } catch (e) {
                            reject(e);
                        }
                    }, reject);
                } catch (e1) {
                    reject(e1);
                }
            });
        }

        if (AmdLoader.isMedia.test(module.url)) {
            // in case of packed loader
            // module.package.url isn't set
            // so it should be loaded only first time when requested...
            const m = {
                get url() {
                    const mUrl = !module.url.startsWith(module.package.url)
                    ? (module.package.url + module.url)
                    : module.url;
                    Object.defineProperty(m, "url", { value: mUrl, enumerable: true });
                    return mUrl;
                },
                toString() {
                    return this.url;
                }
            };
            const e = { __esModule: true, default: m };
            module.exports = e;
            module.emptyExports = e;
            module.loader = promiseDone;
            module.isLoaded = true;
            return module.loader;
        }
        module.loader = new Promise<void>((resolve, reject) => {

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
                    resolve();
                } catch (e) {
                    // tslint:disable-next-line: no-console
                    console.error(e);
                    reject(e);
                }

            }, (error) => {
                reject(error);
            });

        });

        return module.loader;
    }
}

declare var global: any;

const a: AmdLoader = AmdLoader.instance;
a.map("global", "/", "global");
a.registerModule("global/document",  { default: document });
a.registerModule("global/window", { default: typeof window !== "undefined" ? window : global });
a.map("reflect-metadata", "/", "global");
a.registerModule("reflect-metadata", Reflect);

// a.watch();

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

AmdLoader.httpTextLoader = (url, success, error) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                success(xhr.responseText);
            } else {
                error(xhr.responseText);
            }
        }
    };
    xhr.open("GET", url);
    xhr.send();
};

var amdConfig;
amdConfig ??= {};
amdConfig.moduleProgress ??= (() => {

    if (!document) {
        return (name, p) => {
            // tslint:disable-next-line:no-console
            console.log(`${name} ${p}%`);
        };
    }

    return (name, n, status) => {
    };
})();

AmdLoader.moduleProgress = amdConfig.moduleProgress;
