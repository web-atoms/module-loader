/// <reference path="./ArrayHelper.ts"/>
/// <reference path="./Module.ts"/>

interface IModuleConfig {
    url: string;
    type: "amd" | "global";
}

class AmdLoader {

    public static moduleLoader: (packageName: string, url: string, success: (r: any) => void, failed: (error: any) => void) => void;

    public static instance: AmdLoader = new AmdLoader();

    public static current: Module = null;

    public modules: Module[] = [];

    public pathMap: { [key: string]: IModuleConfig } = {};

    public map(
        packageName: string,
        packageUrl: string,
        type: ("amd" | "global") = "amd"): void {

        if (/^(reflect\-metadata|systemjs)$/.test(packageName)) {
            type = "global";
        }

        this.pathMap[packageName] = {
            url: packageUrl,
            type: type
        };
    }

    public resolveSource(name: string, defExt: string = ".js"): string {
        try {
            const tokens: string[] = name.split("/");
            const packageName: string = tokens[0];
            const path: string = this.pathMap[packageName].url;
            tokens[0] = path;
            let url: string = tokens.join("/");
            if (defExt && !url.endsWith(".js")) {
                url = url + ".js";
            }
            return url;
        } catch(e) {
            console.error(`Failed to resolve ${name}`);
            console.error(e);
        }
    }

    public resolveRelativePath(name: string, currentPackage: string): string {

        // const absolutePath: string = this.pathMap[currentPackage].url;

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
        let module: Module = this.modules.find( (x) => x.name === name);
        if (!module) {
            module = new Module();
            module.name = name;
            // module.url = this.resolvePath(name, AmdLoader.current.url);
            module.url = this.resolveSource(name);
            module.type = (this.pathMap[name] || { type: "amd" }) .type || "amd";
            module.require = (n: string) => {
                const an: string = this.resolveRelativePath(n, module.name);
                const resolvedModule: Module = this.get(an);
                return resolvedModule.getExports();
            };
            this.modules.push(module);
        }
        return module;
    }

    public async import(name: string): Promise<any> {

        let module: Module = this.get(name);

        await this.load(module);

        return module.getExports();
    }

    public load(module: Module): Promise<any> {

        // if (module.exports) {
        //     return new Promise((r1,r2) => {
        //         r1(module.exports);
        //     });
        // }

        if (module.loader) {
            return module.loader;
        }

        return module.loader = new Promise((resolve, reject) => {

            // if (module.exports) {
            //     resolve(module.exports);
            //     return;
            // }

            AmdLoader.moduleLoader(module.name, module.url, (r) => {

                AmdLoader.current = module;
                r();

                module.ready = true;

                module.onReady(() => {
                    resolve(module.getExports());
                });

                module.finish();

            }, (error) => {
                reject(error);
            });

        });
    }

}

AmdLoader.moduleLoader = (name, url, success, error) => {

    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                success(() => {
                    // tslint:disable-next-line:no-eval
                    eval(`
                    "use strict";${xhr.responseText}
//# sourceURL=${url}`);
                });
            } else {
                error(xhr.responseText);
            }
        }
    };

    xhr.open("GET", url);
    xhr.send();

};