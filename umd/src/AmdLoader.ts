/// <reference path="./Module.ts"/>

if(!Array.prototype.find) {
    Array.prototype.find = function(predicate: (value: any, index: number, obj: any[]) => boolean, thisArg?: any): any | undefined {
        for (let i: number = 0; i<this.length; i++) {
            const item: any = this[i];
            if (predicate(item, i, this)) {
                return item;
            }
        }
    };
}

if(!Array.prototype.map) {
    Array.prototype.map = function(callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any): any[] {
        const a: any[] = [];
        for (let i:number =0; i <this.length; i++) {
            const r: any = callbackfn(this[i], i, this);
            if (r !== undefined) {
                a.push(r);
            }
        }
        return a;
    };
}

interface IModuleConfig {
    url: string;
    type: "amd" | "global";
}

class Module {

    private handlers: Array<() => void> = [];

    public onLoad(f: () => void): void {
        this.handlers.push(f);
    }

    public finish(): any {

        for (const iterator of this.dependencies) {
            if (!iterator.exports) {
                return;
            }
        }

        if(!this.exports) {
            console.log(`finishing ${this.name}`);
            this.exports = {};
            if (this.factory) {
                this.factory(this.require, this.exports);
            }
            // this.handlers.length = 0;
        }
        for (const iterator of this.handlers) {
            iterator();
        }
    }

    public name: string;

    public url: string;

    public exports: any;

    public require: (name: string) => any;

    public code: () => Promise<any>;

    public dependencies: Module[] = [];

    public type: "amd" | "global";

    public factory: (r: any, e: any) => void;

    public loader: Promise<any>;

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
                return this.get(an).exports;
            };
            this.modules.push(module);
        }
        return module;
    }

    public async import(name: string): Promise<any> {

        let module: Module = this.get(name);

        return await this.load(module);
    }

    public load(module: Module): Promise<any> {

        if (module.exports) {
            return new Promise((r1,r2) => {
                r1(module.exports);
            });
        }

        if (module.code) {
            return module.code();
        }

        return module.loader = new Promise((resolve, reject) => {

            if (module.exports) {
                resolve(module.exports);
                return;
            }

            module.code = (): Promise<any> => {
                return new Promise((r1,r2) => {
                    module.onLoad(() => {
                        r1(module.exports);
                    });
                });
            };

            AmdLoader.moduleLoader(module.name, module.url, (r) => {

                AmdLoader.current = module;
                // tslint:disable-next-line:no-eval
                r();

                this.finish(() => {
                    resolve(module.exports);
                });

            }, (error) => {
                reject(error);
            });

        });
    }

    public finish(f: ()=> void): void  {
        for (const iterator of this.modules) {
            if (!iterator.exports) {
                iterator.finish();
            }
            if(!iterator.exports) {
                return;
            }
        }
        f();
    }



}

var UMD: any = {
    resolvePath: (n) => {
        return AmdLoader.instance.resolveSource(n, null);
    }
};


function define(
    requires: string[],
    factory: (r: any, e: any) => void): void {
    const current: Module = AmdLoader.current;
    if (current.factory) {
        return;
    }
    // console.log(`Define for ${current.name}`);
    current.dependencies = [];
    const loader: AmdLoader = AmdLoader.instance;
    for (const s of requires) {
        if(/^(require|exports)$/.test(s)) {
            continue;
        }

        // resolve full name...
        const name: string = loader.resolveRelativePath(s, current.name);
        // console.log(`dep: ${name} for ${s} in ${current.name}`);
        const child: Module = loader.get(name);
        current.dependencies.push(child);
        loader.load(child);
    }
    current.factory = factory;
}

(define as any).amd = true;