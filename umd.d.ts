declare var module: any, exports: any, amd: any, global: any;
declare namespace Reflect {
    function decorate(decorators: ClassDecorator[], target: Function): Function;
    function decorate(decorators: (PropertyDecorator | MethodDecorator)[], target: any, propertyKey: string | symbol, attributes?: PropertyDescriptor | null): PropertyDescriptor | undefined;
    function decorate(decorators: (PropertyDecorator | MethodDecorator)[], target: any, propertyKey: string | symbol, attributes: PropertyDescriptor): PropertyDescriptor;
    function metadata(metadataKey: any, metadataValue: any): {
        (target: Function): void;
        (target: any, propertyKey: string | symbol): void;
    };
    function defineMetadata(metadataKey: any, metadataValue: any, target: any): void;
    function defineMetadata(metadataKey: any, metadataValue: any, target: any, propertyKey: string | symbol): void;
    function hasMetadata(metadataKey: any, target: any): boolean;
    function hasMetadata(metadataKey: any, target: any, propertyKey: string | symbol): boolean;
    function hasOwnMetadata(metadataKey: any, target: any): boolean;
    function hasOwnMetadata(metadataKey: any, target: any, propertyKey: string | symbol): boolean;
    function getMetadata(metadataKey: any, target: any): any;
    function getMetadata(metadataKey: any, target: any, propertyKey: string | symbol): any;
    function getOwnMetadata(metadataKey: any, target: any): any;
    function getOwnMetadata(metadataKey: any, target: any, propertyKey: string | symbol): any;
    function getMetadataKeys(target: any): any[];
    function getMetadataKeys(target: any, propertyKey: string | symbol): any[];
    function getOwnMetadataKeys(target: any): any[];
    function getOwnMetadataKeys(target: any, propertyKey: string | symbol): any[];
    function deleteMetadata(metadataKey: any, target: any): boolean;
    function deleteMetadata(metadataKey: any, target: any, propertyKey: string | symbol): boolean;
}
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
    get dependents(): any[];
    resolver: Promise<any>;
    private rID;
    constructor(name: string, folder?: string);
    resolve(id?: number): boolean;
    addDependency(d: Module): void;
    getExports(): any;
    private isDependentOn;
}
declare var require: any;
declare var md: any;
declare const promiseDone: Promise<number>;
declare class AmdLoader {
    static isMedia: RegExp;
    static isJson: RegExp;
    static globalVar: any;
    static moduleProgress: (name: string, modules: {
        [key: string]: Module;
    }, status: "done" | "loading") => void;
    static moduleLoader: (packageName: string, url: string, success: () => void, failed: (error: any) => void) => void;
    static httpTextLoader: (url: string, resolve: (r: any) => void, failed: (error: any) => void) => void;
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
    watch(): void;
    private resolvePendingModules;
    private push;
    private _resolveModule;
}
declare var global: any;
declare const a: AmdLoader;
declare type IAnyFunction = (...a: any[]) => any;
interface IDefine {
    (requiresOrFactory: string[] | IAnyFunction, factory?: IAnyFunction): any;
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
    nameSymbol: string | symbol;
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
    hostView(id: string, path: string, designMode?: boolean): Promise<any>;
    loadView(path: string, designMode?: boolean, appPath?: string): Promise<any>;
}
declare const UMD: UMDClass;
