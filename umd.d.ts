declare class Module {
    private handlers;
    onReady(h: () => void): void;
    finish(): any;
    name: string;
    url: string;
    exports: any;
    getExports(): any;
    require: (name: string) => any;
    code: () => Promise<any>;
    dependencies: Module[];
    type: "amd" | "global";
    factory: (r: any, e: any) => void;
    loader: Promise<any>;
    ready: boolean;
}
interface IModuleConfig {
    url: string;
    type: "amd" | "global";
}
declare class AmdLoader {
    static moduleLoader: (packageName: string, url: string, success: (r: any) => void, failed: (error: any) => void) => void;
    static instance: AmdLoader;
    static current: Module;
    modules: Module[];
    pathMap: {
        [key: string]: IModuleConfig;
    };
    map(packageName: string, packageUrl: string, type?: ("amd" | "global")): void;
    resolveSource(name: string, defExt?: string): string;
    resolveRelativePath(name: string, currentPackage: string): string;
    get(name: string): Module;
    import(name: string): Promise<any>;
    load(module: Module): Promise<any>;
}
declare function define(requires: string[], factory: (r: any, e: any) => void): void;
declare class UMDClass {
    viewPrefix: string;
    defaultApp: string;
    resolvePath(n: string): string;
    resolveViewPath(path: string): string;
    map(name: string, path: string, type?: ("amd" | "global")): void;
    resolveViewClassAsync(path: string): Promise<any>;
    load(path: string, designMode?: boolean): Promise<any>;
    loadView(path: string, designMode?: boolean, appPath?: string): Promise<any>;
}
declare const UMD: UMDClass;
