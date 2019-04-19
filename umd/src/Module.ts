interface IPackage {
    name: string;
    version: string;
    url: string;
    type: "amd" | "global";
    exportVar?: string;
}

class Module {

    public package: IPackage;

    public emptyExports: any = {};

    constructor(
        public readonly name: string,
        public readonly folder?: string
    ) {
        const index: number = name.lastIndexOf("/");
        if (index === -1) {
            this.folder = "";
        } else {
            this.folder = name.substr(0, index);
        }
    }

    public url: string;

    public exports: any;

    public ignoreModule: Module = null;

    private isLoaded: boolean = false;

    public resolve(resolve?: (r: any) => void, reject?: (e: any) => void): void {

        if (this.dependencies && this.dependencies.length) {
            Promise.all(this.dependencies
                .map(async x => {
                    if (!x.isDependentOn(this, [x])) {
                        await AmdLoader.instance.import(x.name);
                    } else {
                        await AmdLoader.instance.load(x);
                    }
                }))
                .then(() => {
                    setTimeout(() => {
                        resolve(this.getExports());
                    }, 1);
                })
                .catch(reject);
        } else {
            resolve(this.getExports());
        }

    }

    public isDependentOn(d: Module, r: Module[]): boolean {
        for (const iterator of this.dependencies) {
            if (r.find((x) => x === iterator)) {
                return true;
            }
            r.push(iterator);
            if (iterator === d) {
                return true;
            }
            if (iterator.isDependentOn(d, r)) {
                return true;
            }
        }
        return false;
    }

    public addDependency(d: Module): void {
        // ignore module contains dependency resolution module
        if (d === this.ignoreModule) {
            return;
        }
        // if (d.isDependentOn(this)) {
        //     return;
        // }
        this.dependencies.push(d);
    }

    public getExports(): any {
        if (this.exports) {
            return this.exports;
        }
        this.exports = this.emptyExports;
        if (this.factory) {
            AmdLoader.instance.currentStack.push(this);
            const result: any = this.factory(this.require, this.exports);
            if (result) {
                if (typeof result === "object") {
                    for (const key in result) {
                        if (result.hasOwnProperty(key)) {
                            const element: any = result[key];
                            this.exports[key] = element;
                        }
                    }
                } else if (!this.exports.default) {
                    this.exports.default = result;
                }
            }
            AmdLoader.instance.currentStack.pop();
            delete this.factory;
        }
        return this.exports;
    }

    public require: (name: string) => any;

    public dependencies: Module[] = [];

    public type: "amd" | "global";

    public exportVar: string;

    public factory: (r: any, e: any) => void;

    public loader: Promise<any>;

    /**
     * This promise can be awaited by dependency resolver
     */
    public resolver: Promise<any>;

}