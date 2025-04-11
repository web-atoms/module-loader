/// <reference path="./AmdLoader.ts"/>

type IAnyFunction = (... a: any[]) => any;

// tslint:disable-next-line
interface IDefine {
    (requiresOrFactory: string[] | IAnyFunction,
     factory?: IAnyFunction);
    amd?: object;
}

// tslint:disable-next-line:no-var-keyword
var define: IDefine = (
    requiresOrFactory: string[] | IAnyFunction,
    factory: IAnyFunction,
    nested?: boolean): void => {

    const loader = AmdLoader.instance;

    const { currentScript } = document;

    let module: Module;

    if (currentScript) {

        module = currentScript[currentModuleSymbol];
        if (module) {
            AmdLoader.current = module;
        }
    }

    module ??= AmdLoader.current;

    let requires = [];

    if (typeof requiresOrFactory !== "function") {
        requires = requiresOrFactory;
    } else {
        factory = requiresOrFactory;
    }

    if (!module) {
        factory();
        return;
    }

    if (module.factory) {
        return;
    }
    module.dependencies = [];

    const args: any[] = [];
    for (const s of requires) {
        if (s === "require") {
            args.push(module.require);
            continue;
        }
        if (s === "exports") {
            args.push(module.emptyExports);
            continue;
        }
        if (/^global/.test(s)) {
            args.push(loader.get(s).exports);
        }
        const name: string = loader.resolveRelativePath(s, module.name);
        const child: Module = loader.get(name);
        module.addDependency(child);
    }
    module.factory = () => {
        return factory.apply(module, args);
    };

    // if (nested) {
    //     // this means this was executed as packed modules..
    //     // first parameter is name, second is array and third is factory...

    //     const name = requiresOrFactory as unknown as string;
    //     const rList = factory as unknown as string[];
    //     const f = nested as unknown as () => void;

    //     const module = AmdLoader.instance.get(name);

    //     bindFactory(module, rList, f);
    //     return;
    // }

    // AmdLoader.instance.define = () => {

    //     if (!AmdLoader.current) {
    //         // dynamic loader
    //         const amdModule = document.currentScript?.[currentModuleSymbol];

    //         if (amdModule) {
    //             AmdLoader.current = amdModule;
    //         }
    //     }

    //     const current: Module = AmdLoader.current;
    //     if (!current) {
    //         return;
    //     }
    //     if (current.factory) {
    //         return;
    //     }
    //     if (typeof requiresOrFactory === "function") {
    //         bindFactory(current, [], requiresOrFactory);
    //     } else {
    //         bindFactory(current, requiresOrFactory, factory);
    //     }
    // };
};

define.amd = {};
