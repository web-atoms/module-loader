/// <reference path="./AmdLoader.ts"/>

// tslint:disable-next-line
interface IDefine {
    (requiresOrFactory: string[] | (() => void ),
    factory?: (r: any, e: any) => void): void;
    amd?: object;
}

var define:IDefine = (
    requiresOrFactory: string[] | (() => void ),
    factory: (r: any, e: any) => void): void => {

    AmdLoader.instance.define = () => {
        const current: Module = AmdLoader.current;
        if (!current) {
            return;
        }
        if (current.factory) {
            return;
        }
        // console.log(`Define for ${current.name}`);
        current.dependencies = [];
        const loader: AmdLoader = AmdLoader.instance;

        let requires: string[] = [];
        if (typeof requiresOrFactory === "function") {
            factory = requiresOrFactory;
        } else {
            requires = requiresOrFactory;
        }

        for (const s of requires) {
            // if (s === "require") {
            //     args.push(current.require);
            //     continue;
            // }
            // if (s === "exports") {
            //     args.push(exports1);
            //     continue;
            // }
            // if (/^global/.test(s)) {
            //     args.push(loader.get(s).exports);
            // }
            if(/^(require|exports)$/.test(s)) {
                 continue;
            }
            if (/^global/.test(s)) {
                continue;
            }
            const name: string = loader.resolveRelativePath(s, current.name);
            const child: Module = loader.get(name);
            current.addDependency(child);
        }
        // const fx = factory.bind(current, ... args);
        current.factory = (r, es) => {
            const args: any[] = [];
            for(const a of requires) {
                if (a === "require") {
                    args.push(r);
                    continue;
                }
                if (a === "exports") {
                    args.push(es);
                    continue;
                }
                if (/^global/.test(a)) {
                    args.push(loader.get(a).exports);
                    continue;
                }
            }
            return factory.apply(current, args) || es;
        };
    };
};

define.amd = {};
