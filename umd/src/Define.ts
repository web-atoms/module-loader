/// <reference path="./AmdLoader.ts"/>

// tslint:disable-next-line
interface IDefine {
    (requiresOrFactory: string[] | (() => void ),
    factory?: (r: any, e: any) => void): void;
    amd?: boolean;
}

var define:IDefine = (
    requiresOrFactory: string[] | (() => void ),
    factory: (r: any, e: any) => void): void => {
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

        // resolve full name...
        const name: string = loader.resolveRelativePath(s, current.name);
        // console.log(`dep: ${name} for ${s} in ${current.name}`);
        const child: Module = loader.get(name);
        current.dependencies.push(child);
        child.onReady(() => {
            current.finish();
        });
        loader.load(child);
    }
    current.factory = factory;
};

define.amd = true;

const _______define: Function = define;

define = function(... args: any[]):any {
    AmdLoader.instance.define = () => {
        _______define.call(this, args);
    };
};
