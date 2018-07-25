class Module {

    private handlers: Array<() => void> = [];

    public onReady(h: () => void): void {
        // remove self after execution...
        const a: any = {
            handler: h
        };
        a.handler = () => {
            const index: number = this.handlers.indexOf(a.handler);
            this.handlers.splice(index, 1);
            h();
        };
        this.handlers.push(a.handler);
    }

    public finish(): any {

        for (const iterator of this.dependencies) {
            if (!iterator.ready) {
                return;
            }
        }
        for (const iterator of this.handlers.map((a) => a)) {
            iterator();
        }
    }

    public name: string;

    public url: string;

    public exports: any;

    public getExports(): any {
        if (this.exports) {
            return this.exports;
        }
        this.exports = {};
        if (this.factory) {
            this.factory(this.require, this.exports);
        }
        return this.exports;
    }

    public require: (name: string) => any;

    public code: () => Promise<any>;

    public dependencies: Module[] = [];

    public type: "amd" | "global";

    public factory: (r: any, e: any) => void;

    public loader: Promise<any>;

    public ready: boolean = false;

}