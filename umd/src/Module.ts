interface IPackage {
    name: string;
    version: string;
    url: string;
    type: "amd" | "global";
    exportVar?: string;
}

class Module {

    public package: IPackage;

    public awaitedModules: Module[] = [];

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

    private static populateDependencies(
        root: Module,
        list: Module[]): void {
        if (!root.dependencies) {
            return;
        }
        for (const iterator of root.dependencies) {
            if (!iterator.ready) {
                if (list.indexOf(iterator) === -1) {
                    list.push(iterator);
                }
            }
            Module.populateDependencies(iterator, list);
        }
    }

    private pendingResolver: [any, any] = null;

    public resolve(resolve?: (r: any) => void, reject?: (e: any) => void): void {

        if (resolve && reject) {
            this.pendingResolver = [resolve, reject];
        }

        const d: Module[] = this.dependencies ? this.dependencies  : [];
        if (d.filter(x => !x.exports).length) {
            return;
        }

        this.pendingResolver[0](this.getExports());

        for (const iterator of this.awaitedModules) {
            iterator.resolve();
        }

    }

    public getExports(): any {
        if (this.exports) {
            return this.exports;
        }
        this.exports = {};
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
            // we no longer need all these ...
            delete this.factory;
            // delete this.handlers;
            // delete this.dependencies;
        }
        return this.exports;
    }

    public require: (name: string) => any;

    public code: () => Promise<any>;

    public dependencies: Module[] = [];

    public type: "amd" | "global";

    public exportVar: string;

    public factory: (r: any, e: any) => void;

    public loader: Promise<any>;

    public ready: boolean = false;

}