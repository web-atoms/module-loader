/// <reference path="./Promise.ts"/>
/// <reference path="./ArrayHelper.ts"/>
/// <reference path="./Module.ts"/>

class AmdLoader {


    private mockTypes: MockType[] = [];

    public static globalVar: any = {};

    public static moduleProgress: (name: string, modules: {[key: string]: Module}, status: "done" | "loading") => void;

    public static moduleLoader: (packageName: string, url: string, success: () => void, failed: (error: any) => void) => void;

    public static ajaxGet: (packageName: string, url: string, success: (r: string) => void, failed: (error: any) => void) => void;

    public static instance: AmdLoader = new AmdLoader();

    public static current: Module = null;

    public root: Module = null;

    public currentStack: Module[] = [];

    public modules: { [key: string]: Module } = {};

    public pathMap: { [key: string]: IPackage } = {};
    enableMock: boolean;

    public register( ... names: string[]): void {
        for (const iterator of names) {
            const { packageName } = this.getPackageVersion(iterator);
            this.map(packageName, "/");
            this.get(iterator);
        }
    }
    public setup(name: string): void {
        const jsModule: Module = this.get(name);
        jsModule.loader = new Promise((resolve, reject) => {
            AmdLoader.current = jsModule;
            const define: Function = this.define;
            if (define) {
                define();
            }
            jsModule.ready = true;
            if (jsModule.exportVar) {
                jsModule.exports = AmdLoader.globalVar[jsModule.exportVar];
            }
            jsModule.onReady(() => {
                resolve(jsModule.getExports());
            });
            jsModule.finish();
        });
    }

    public replace(type: any, name: string, mock: boolean): void {
        if (mock && !this.enableMock) {
            return;
        }
        const peek: Module = this.currentStack[this.currentStack.length-1];
        this.mockTypes.push(new MockType(peek, type, name, mock));
    }

    public resolveType(type: any): any {
        const t: MockType = this.mockTypes.find((t) => t.type === type);
        return t ? t.replaced : type;
    }

    public packageResolver: (p1: IPackage) => IPackage = undefined;
        // = (p) => ({
        //     ... p,
        //     url: `/node_modules/${p.name}`,
        //     type: "amd"})

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
            type: type,
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
                            path = path.substr(0, path.length-1);
                        }
                        path = path + "/" + name;
                        if (defExt && !path.endsWith(defExt)) {
                            path = path + defExt;
                        }
                        return path;
                    }
                }
            }
            return name;
        } catch(e) {
            console.error(`Failed to resolve ${name} with error ${JSON.stringify(e)}`);
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

        while(tokens.length) {
            const first:string = tokens[0];
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
        let [scope, packageName, path] = name.split("/",3);
        let version: string = "";
        if (scope[0] !== "@") {
            packageName = scope;
            scope = "";
        } else {
            scope += "/";
        }

        const versionTokens: string[] = packageName.split("@");
        if (versionTokens.length>1) {
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
                        url: undefined
                    });

            module.url = this.resolveSource(name);
            if (!module.url) {
                throw new Error(`No url mapped for ${name}`);
            }
            module.require = (n: string) => {
                const an: string = this.resolveRelativePath(n, module.name);
                const resolvedModule: Module = this.get(an);
                return resolvedModule.getExports();
            };
            this.modules[name] = module;
        }
        return module;
    }

    public async import(name: string): Promise<any> {

        let module: Module = this.get(name);

        if (!this.root) {
            this.root = module;
        }

        await this.load(module);

        // tslint:disable-next-line:typedef
        const exports = module.getExports();

        // load requested dependencies for mock or abstract injects
        const pendingList: MockType[] = this.mockTypes.filter((t) => !t.loaded );
        if (pendingList.length) {
            for (const iterator of pendingList) {
                iterator.loaded = true;
            }
            for (const iterator of pendingList) {
                const containerModule: Module = iterator.module;
                const resolvedName: string = this.resolveRelativePath(iterator.moduleName, containerModule.name);
                const ex: any = await this.import(resolvedName);
                const type: any = ex[iterator.exportName];
                iterator.replaced = type;
            }
        }

        if (this.root === module) {
            this.root = null;
            AmdLoader.moduleProgress(null, this.modules, "done");
        }

        return exports;
    }

    public async load(module: Module): Promise<any> {

        if (module.loader) {
            return await module.loader;
        }

        module.loader = new Promise((resolve, reject) => {

            AmdLoader.moduleLoader(module.name, module.url, () => {

                AmdLoader.current = module;
                AmdLoader.instance.define();

                module.ready = true;

                if (module.exportVar) {
                    module.exports = AmdLoader.globalVar[module.exportVar];
                }

                module.onReady(() => {
                    resolve(module.getExports());
                });

                module.finish();

                if (AmdLoader.moduleProgress) {
                    AmdLoader.moduleProgress(module.name, this.modules , "loading");
                }

            }, (error) => {
                reject(error);
            });

        });

        return await module.loader;
    }

    define: any;

}

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
    document.body.appendChild(script);
};

AmdLoader.moduleProgress = (() => {

    if (!document) {
        return (name, p) => {
            console.log(`${name} ${p}%`);
        };
    }

    const progressDiv: HTMLDivElement = document.createElement("div");
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
