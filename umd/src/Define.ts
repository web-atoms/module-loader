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
            if(/^(require|exports)$/.test(s)) {
                continue;
            }
            const name: string = loader.resolveRelativePath(s, current.name);
            const child: Module = loader.get(name);
            if (!child.loader) {
                current.dependencies.push(child);
            }
            child.awaitedModules.push(current);

            if (!child.loader) {
                child.loader = AmdLoader.instance._import(child).catch((e) => {
                    console.error(e);
                });
            }
        }
        current.factory = factory;
    };
};

define.amd = {};
