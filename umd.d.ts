declare var Reflect: any;
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
declare class Module {
    readonly name: string;
    readonly folder?: string;
    private static nextID;
    previous: Module;
    next: Module;
    package: IPackage;
    emptyExports: any;
    dependencyHooks: [(...a: any) => void, () => void];
    resolveHooks: [(...a: any) => void, () => void];
    url: string;
    exports: any;
    ignoreModule: Module;
    isLoaded: boolean;
    isResolved: boolean;
    require: IRequireFunction;
    dependencies: Module[];
    type: "amd" | "global";
    exportVar: string;
    factory: (r: any, e: any) => void;
    loader: Promise<any>;
    get filename(): string;
    /**
     * This promise can be awaited by dependency resolver
     */
    resolver: Promise<any>;
    private rID;
    constructor(name: string, folder?: string);
    resolve(id?: number): boolean;
    addDependency(d: Module): void;
    getExports(): any;
}
declare var require: any;
declare var md: any;
declare class AmdLoader {
    static isMedia: RegExp;
    static globalVar: any;
    static moduleProgress: (name: string, modules: {
        [key: string]: Module;
    }, status: "done" | "loading") => void;
    static moduleLoader: (packageName: string, url: string, success: () => void, failed: (error: any) => void) => void;
    static instance: AmdLoader;
    static current: Module;
    root: Module;
    defaultUrl: string;
    currentStack: Module[];
    nodeModules: Module[];
    modules: {
        [key: string]: Module;
    };
    pathMap: {
        [key: string]: IPackage;
    };
    enableMock: boolean;
    define: any;
    private mockTypes;
    private lastTimeout;
    private tail;
    private dirty;
    register(packages: string[], modules: string[]): void;
    setupRoot(root: string, url: string): void;
    registerModule(name: string, moduleExports: {
        [key: string]: any;
    }): void;
    setup(name: string): void;
    loadDependencies(m: Module): void;
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
    import(name: string | Module): Promise<any>;
    load(module: Module): Promise<any>;
    resolveModule(module: Module): Promise<any>;
    remove(m: Module): void;
    queueResolveModules(n?: number): void;
    private resolvePendingModules;
    private push;
    private _resolveModule;
}
declare const a: AmdLoader;
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
    moduleName?: string;
    readonly exportName?: string;
    loaded: boolean;
    replaced: any;
    constructor(module: Module, type: any, name: string, mock: boolean, moduleName?: string, exportName?: string);
}
declare class UMDClass {
    viewPrefix: string;
    defaultApp: string;
    lang: string;
    nameSymbol: any;
    get mock(): boolean;
    set mock(v: boolean);
    resolvePath(n: string): string;
    resolveViewPath(path: string): string;
    resolveType(type: any): any;
    map(name: string, path: string, type?: ("amd" | "global"), exportVar?: string): void;
    setupRoot(name: string, url: string): void;
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
