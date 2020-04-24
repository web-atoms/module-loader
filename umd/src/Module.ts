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

    public get filename(): string {
        return this.name;
    }

    /**
     * Displays list of all dependents (including nested)
     */
    public get dependents() {
        const modules = AmdLoader.instance.modules;
        const dependents = [];
        for (const m in modules) {
            if (modules.hasOwnProperty(m)) {
                const element = modules[m];
                if (element.dependencies.find((mi) => mi === this)) {
                    if (!dependents.find((mi) => mi === element)) {
                        dependents.push(element);

                        // add its own dependents
                        for (const iterator of element.dependents) {
                            if (!dependents.find((mid) => mid === iterator)) {
                                dependents.push(iterator);
                            }
                        }
                    }
                }
            }
        }
        return dependents;
    }

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

    }

    public resolve(id?: number): boolean {

        if (!this.isLoaded) {
            return false;
        }

        if (this.isResolved) {
            return true;
        }

        if (!id) {
            id = Module.nextID++;
        }

        if (this.rID === id) {
            // circular dependency found...
            let childrenResolved = true;
            for (const iterator of this.dependencies) {
                if (iterator === this.ignoreModule) {
                    continue;
                }
                if (iterator.rID === id) {
                    continue;
                }
                if (!iterator.resolve(id)) {
                    childrenResolved = false;
                    break;
                }
            }
            return childrenResolved;
        }

        this.rID = id;

        let allResolved = true;

        for (const iterator of this.dependencies) {
            if (iterator === this.ignoreModule) {
                continue;
            }
            if (!iterator.resolve(id)) {
                allResolved = false;
                break;
            }
        }

        if (!allResolved) {
            this.rID = 0;
            return false;
        }
        const i = AmdLoader.instance;

        if (this.dependencyHooks) {
            this.dependencyHooks[0]();
            this.dependencyHooks = null;
        }

        if (this.resolveHooks) {
            this.resolveHooks[0](this.getExports());
            this.resolveHooks = null;

            i.remove(this);
            this.rID = 0;
            return true;
        }

        this.rID = 0;
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
        this.exports = this.emptyExports;
        if (this.factory) {
            try {
                const factory = this.factory;
                this.factory = null;
                delete this.factory;
                AmdLoader.instance.currentStack.push(this);
                const result: any = factory(this.require, this.exports);
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

                if (this.exports.default) {
                    this.exports.default[UMD.nameSymbol] = this.name;
                }
            } catch (e) {
                const em = e.stack ? (`${e}\n${e.stack}`) : e;
                const ne = new Error(`Failed loading module ${this.name} with error ${em}`);
                // tslint:disable-next-line: no-console
                console.error(ne);
                throw ne;
            }
        }
        return this.exports;
    }

}
