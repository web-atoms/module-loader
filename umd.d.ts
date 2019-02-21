declare var module: any, exports: any, amd: any, global: any;
interface IPackage {
    name: string;
    version: string;
    url: string;
    type: "amd" | "global";
    exportVar?: string;
}
declare class Module {
    readonly name: string;
    readonly folder: string;
    private handlers;
    package: IPackage;
    constructor(name: string, folder?: string);
    url: string;
    exports: any;
    resolve(resolve: (r: any) => void, reject: (e: any) => void): void;
    getExports(): any;
    require: (name: string) => any;
    code: () => Promise<any>;
    dependencies: Module[];
    type: "amd" | "global";
    exportVar: string;
    factory: (r: any, e: any) => void;
    loader: Promise<any>;
    ready: boolean;
}
declare var require: any;
declare var md: any;
declare class AmdLoader {
    private mockTypes;
    static globalVar: any;
    static moduleProgress: (name: string, modules: {
        [key: string]: Module;
    }, status: "done" | "loading") => void;
    static moduleLoader: (packageName: string, url: string, success: () => void, failed: (error: any) => void) => void;
    static instance: AmdLoader;
    static current: Module;
    root: Module;
    currentStack: Module[];
    nodeModules: Module[];
    modules: {
        [key: string]: Module;
    };
    pathMap: {
        [key: string]: IPackage;
    };
    enableMock: boolean;
    register(packages: string[], modules: string[]): void;
    setup(name: string): void;
    replace(type: any, name: string, mock: boolean): void;
    resolveType(type: any): any;
    map(packageName: string, packageUrl: string, type?: ("amd" | "global"), exportVar?: string): IPackage;
    resolveSource(name: string, defExt?: string): string;
    resolveRelativePath(name: string, currentPackage: string): string;
    getPackageVersion(name: string): ({
        packageName: string;
        version: string;
        name: string;
    });
    get(name1: string): Module;
    import(name: string): Promise<any>;
    load(module: Module): Promise<any>;
    define: any;
}
interface IDefine {
    (requiresOrFactory: string[] | (() => void), factory?: (r: any, e: any) => void): void;
    amd?: object;
}
declare var define: IDefine;
declare class MockType {
    readonly module: Module;
    type: any;
    name: string;
    mock: boolean;
    moduleName: string;
    readonly exportName: string;
    loaded: boolean;
    replaced: any;
    constructor(module: Module, type: any, name: string, mock: boolean, moduleName?: string, exportName?: string);
}
declare class UMDClass {
    viewPrefix: string;
    defaultApp: string;
    lang: string;
    mock: boolean;
    resolvePath(n: string): string;
    resolveViewPath(path: string): string;
    resolveType(type: any): any;
    map(name: string, path: string, type?: ("amd" | "global"), exportVar?: string): void;
    mockType(type: any, name: string): void;
    inject(type: any, name: string): void;
    resolveViewClassAsync(path: string): Promise<any>;
    import(path: string): Promise<any>;
    load(path: string, designMode?: boolean): Promise<any>;
    /**
     * Host the view inside given element with given id
     * @param id id of element to host view in
     * @param path path of module
     * @param designMode true/false (default false)
     */
    hostView(id: string, path: string, designMode?: boolean): Promise<any>;
    loadView(path: string, designMode?: boolean, appPath?: string): Promise<any>;
}
declare const UMD: UMDClass;
