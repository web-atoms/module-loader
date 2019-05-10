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
    public hooks: [(... a: any) => void, () => void];
    public url: string;

    public exports: any;

    public ignoreModule: Module = null;

    public isLoaded: boolean = false;

    public isResolved: boolean = false;

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

    public async loadDependencies(tree?: Module[]): Promise<void> {
        const i = AmdLoader.instance;
        const loader = this.dependencies.map(async (m) => {
            if (!m.isLoaded) {
                await i.load(m);
            }
        });

        if (loader.length) {
            await Promise.all(loader);
        }
        const resolvers = this.dependencies.map(async (iterator) => {
            const index = i.pendingModules.indexOf(this);
            const itIndex = i.pendingModules.indexOf(iterator);
            if (itIndex === -1 || itIndex > index) {
                await i.resolveModule(iterator);
            } else {
                if (!iterator.isDependentOn(this, [])) {
                    await i.resolveModule(iterator);
                }
            }
        });

        if (resolvers.length) {
            await Promise.all(resolvers);
        }

    }

    public resolve(tree?: Module[]): boolean {

        const a = tree ? tree : [];
        a.push(this);

        let allResolved = true;

        for (const iterator of this.dependencies) {
            if (tree && tree.indexOf(iterator) !== -1) {
                continue;
            }
            if (!iterator.resolve(a)) {
                allResolved = false;
            }
        }

        if (!allResolved) {
            return false;
        }
        if (this.isResolved) {
            return true;
        }
        if (this.isLoaded) {
            const i = AmdLoader.instance;
            if (this.hooks) {
                this.hooks[0](this.getExports());
                this.hooks = null;

                const index = i.pendingModules.indexOf(this);
                if (index !== -1) {
                    i.pendingModules.splice(index, 1);
                }
                return true;
            }
        }

        return false;

    }

    // public dependenciesLoaded(list: Module[] = []): boolean {
    //     if(list.indexOf(this) === -1) {
    //         list.push(this);
    //         for (const iterator of this.dependencies) {
    //             if (!iterator.isLoaded) {
    //                 return false;
    //             }
    //             if (iterator.isDependentOn(this, [])) {
    //                 continue;
    //             }
    //             if (!iterator.dependenciesLoaded(list)) {
    //                 return false;
    //             }
    //         }
    //     }
    //     return true;
    // }

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

}
