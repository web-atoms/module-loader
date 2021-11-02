interface IPackage {
    name: string;
    version: string;
    url: string;
    type: "amd" | "global";
    exportVar?: string;
}

interface IRequireFunction {
    (path: string): any;
    resolve?: (path: string) => string;
}

class Module {

    private static nextID: number = 1;

    public previous: Module;

    public next: Module;

    public package: IPackage;

    public emptyExports: any = {};

    public dependencyHooks: [(...a: any) => void, () => void];

    public resolveHooks: [(... a: any) => void, () => void];

    public dynamicImports: MockType[];

    public url: string;

    public exports: any;

    public ignoreModule: Module = null;

    public isLoaded: boolean = false;

    public isResolved: boolean = false;

    public require: IRequireFunction;

    public dependencies: Module[] = [];

    public type: "amd" | "global";

    public exportVar: string;

    public factory: (r: any, e: any) => void;

    public loader: Promise<any>;

    public postExports: () => void;

    public get filename(): string {
        return this.name;
    }

    public importPromise: Promise<any>;

    /**
     * This promise can be awaited by dependency resolver
     */
    public resolver: Promise<any>;

    private rID: number = null;

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
        this.exports = this.emptyExports;
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
        if (d.isDependentOn(this)) {
            // tslint:disable-next-line: no-console
            console.warn(`${d.name} already depends on ${this.name}`);
        }
    }

    public getExports(): any {
        if (this.factory) {
            try {
                const factory = this.factory;
                this.factory = null;
                delete this.factory;
                AmdLoader.instance.currentStack.push(this);
                const result: any = factory(this.require, this.exports);
                if (result) {
                    if (typeof result === "object" || typeof result === "function") {
                        // for (const key in result) {
                        //     if (result.hasOwnProperty(key)) {
                        //         const element: any = result[key];
                        //         this.exports[key] = element;
                        //     }
                        // }
                        this.exports = result;
                        if (typeof result.default === "undefined") {
                            result.default = result;
                        }
                    } else if (!this.exports.default) {
                        this.exports.default = result;
                    }
                }
                AmdLoader.instance.currentStack.pop();
                delete this.factory;

                const def = this.exports.default;
                if (typeof def === "function" || typeof def === "object") {
                    def[UMD.nameSymbol] = this.name;
                }
            } catch (e) {
                const em = e.stack ? (`${e}\n${e.stack}`) : e;
                const s = [];
                // tslint:disable-next-line: no-console
                console.error(e);
                // modules in the stack...
                for (const iterator of AmdLoader.instance.currentStack) {
                    s.push(iterator.name);
                    // tslint:disable-next-line: no-console
                    console.error(iterator.name);
                }

                const ne = new Error(`Failed loading module ${this.name
                } with error ${em}\nDependents: ${s.join("\n\t")}`);

                // tslint:disable-next-line: no-console
                console.error(ne);
                throw ne;
            }
        }
        return this.exports;
    }

    public isDependentOn(m: Module, visited?: any): boolean {
        if (this.ignoreModule === m) {
            return false;
        }
        visited = visited || {};
        visited[this.name] = true;
        for (const iterator of this.dependencies) {
            if (iterator === m) {
                return true;
            }
            if (visited[iterator.name]) {
                continue;
            }
            if (iterator.isDependentOn(m, visited)) {
                return true;
            }
        }
        return false;
    }

}
