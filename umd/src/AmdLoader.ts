/// <reference path="./ArrayHelper.ts"/>
/// <reference path="./Module.ts"/>

interface IModuleConfig {
    name: string;
    url: string;
    type: "amd" | "global";
    exportVar?: string;
}

class AmdLoader {


    private mockTypes: MockType[] = [];

    public static globalVar: any = {};

    public static moduleProgress: (name: string, progress: number) => void;

    public static moduleLoader: (packageName: string, url: string, success: (r: any) => void, failed: (error: any) => void) => void;

    public static ajaxGet: (packageName: string, url: string, success: (r: string) => void, failed: (error: any) => void) => void;

    public static instance: AmdLoader = new AmdLoader();

    public static current: Module = null;

    public currentStack: Module[] = [];

    public modules: { [key: string]: Module } = {};

    public pathMap: { [key: string]: IModuleConfig } = {};
    enableMock: boolean;

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

    public packageResolver: (name: string, version: string) => IModuleConfig
        = (name, version) => ({
            name,
            url: `/node_modules/${name}`,
            type: "amd"})

    public map(
        packageName: string,
        packageUrl: string,
        type: ("amd" | "global") = "amd",
        exportVar?: string
    ): void {

        // ignore map if it exists already...
        if (this.pathMap[packageName]) {
            return;
        }

        if (packageName === "reflect-metadata") {
            type = "global";
        }

        this.pathMap[packageName] = {
            name: packageName,
            url: packageUrl,
            type: type,
            exportVar
        };
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
                        if (defExt && !path.endsWith(".js")) {
                            path = path + ".js";
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

    public get(name: string): Module {
        let module: Module = this.modules[name];
        if (!module) {

            // strip '@' version info
            let [scope, packageName, path] = name.split("/",3);
            let version: string = "";
            if (scope[0] !== "@") {
                packageName = scope;
                scope = "";
            }

            const versionTokens: string[] = packageName.split("@");
            if (versionTokens.length>1) {
                // remove version and map it..
                version = versionTokens[1];
                name = name.replace("@" + version, "");
            }

            module = new Module(name);
            if (version)  {
                const info: IModuleConfig = this.packageResolver(module.name, version);
                module.url = info.url;
                module.type = info.type || "amd";
                module.exportVar = info.exportVar;
                // this is not needed, but useful for logging
                this.pathMap[name] = {
                    url: module.url,
                    type: module.type,
                    name: module.name,
                    exportVar: module.exportVar
                };
            } else {
                // module.url = this.resolvePath(name, AmdLoader.current.url);
                module.url = this.resolveSource(name);
                if (!module.url) {
                    throw new Error(`No url mapped for ${name}`);
                }
                const def: IModuleConfig = this.pathMap[name];
                if (def) {
                    module.type = def.type || "amd";
                    module.exportVar = def.exportVar;
                } else {
                    module.type = "amd";
                }
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

        return exports;
    }

    public async loadPackageManifest(module: Module): Promise<void> {
        if (module.manifestLoaded) {
            return;
        }

        return await new Promise((resolve, reject) => {
            const url: string = this.resolveSource(module.name + "/package", ".json");

            AmdLoader.ajaxGet(module.name, url, (r) => {
                const json: any = JSON.parse(r);

                const { dependencies } = json;
                if (dependencies) {
                    for (const key in dependencies) {
                        if (dependencies.hasOwnProperty(key)) {
                            const element: string = dependencies[key];
                            const existing: any = this.pathMap[key];
                            if (existing) {
                                continue;
                            }
                            const info: IModuleConfig = this.packageResolver(key, element);
                            this.map(key, info.url, info.type, info.exportVar);
                        }
                    }
                }

                module.manifestLoaded = true;

                resolve();

            }, reject);

        });
    }

    public async load(module: Module): Promise<any> {

        await this.loadPackageManifest(module);

        if (module.loader) {
            return await module.loader;
        }

        module.loader = new Promise((resolve, reject) => {

            AmdLoader.moduleLoader(module.name, module.url, (r) => {

                AmdLoader.current = module;
                r();

                module.ready = true;

                if (module.exportVar) {
                    module.exports = AmdLoader.globalVar[module.exportVar];
                }

                module.onReady(() => {
                    resolve(module.getExports());
                });

                module.finish();

                if (AmdLoader.moduleProgress) {
                    // lets calculate how much...
                    // const total: number = this.modules.length;
                    // const done: number = this.modules.filter( (m) => m.ready ).length;

                    let total: number = 0;
                    let done: number = 0;

                    for (const key in this.modules) {
                        if (this.modules.hasOwnProperty(key)) {
                            const mItem: any = this.modules[key];
                            if (mItem instanceof Module) {
                                if (mItem.ready) {
                                    done ++;
                                }
                                total ++;
                            }
                        }
                    }

                    AmdLoader.moduleProgress(module.name, Math.round( (done * 100)/total ));
                }

            }, (error) => {
                reject(error);
            });

        });

        return await module.loader;
    }

}

AmdLoader.ajaxGet = (name, url, success, error) => {

    AmdLoader.globalVar = window;

    const xhr: XMLHttpRequest = new XMLHttpRequest();
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

AmdLoader.moduleLoader = (name, url, success, error) => {

    AmdLoader.ajaxGet(name, url, (r) => {
                success(() => {

                    const errorCheck: string = `
} catch(e) { if(e.stack) { alert(e.message + '\\r\\n' + e.stack); } else { alert(e); } }`;

                    // tslint:disable-next-line:no-eval
                    eval(`"use strict"; try { ${r} ${errorCheck}
//# sourceURL=${url}`);
                });
            }, error);
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
    style.top = style.left = style.right = style.bottom = "0";

    style.borderStyle = "solid";
    style.borderWidth = "1px";
    style.borderColor = "#A0A0A0";
    style.borderRadius = "5px";
    style.padding = "5px";
    style.textAlign = "center";
    style.verticalAlign = "middle";

    const progressLabel: HTMLDivElement = document.createElement("div");
    progressDiv.appendChild(progressLabel);
    progressLabel.style.color = "#A0A0A0";

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
    return (name, n) => {
        if (n >= 99) {
            progressDiv.style.display = "none";
        } else {
            progressDiv.style.display = "block";
        }
        progressLabel.textContent = `Loading ... (${n}%)`;
    };
})();
