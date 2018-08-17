declare class Module {
    readonly name: string;
    readonly folder: string;
    private handlers;
    constructor(name: string, folder?: string);
    onReady(h: () => void): void;
    isReady(visited?: Module[]): boolean;
    finish(): any;
    url: string;
    exports: any;
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
interface IModuleConfig {
    name: string;
    url: string;
    type: "amd" | "global";
    exportVar?: string;
}
declare class AmdLoader {
    private mockTypes;
    static globalVar: any;
    static moduleProgress: (name: string, progress: number) => void;
    static moduleLoader: (packageName: string, url: string, success: (r: any) => void, failed: (error: any) => void) => void;
    static instance: AmdLoader;
    static current: Module;
    modules: Module[];
    pathMap: {
        [key: string]: IModuleConfig;
    };
    enableMock: boolean;
    replace(type: any, name: string, mock: boolean): void;
    map(packageName: string, packageUrl: string, type?: ("amd" | "global"), exportVar?: string): void;
    resolveSource(name: string, defExt?: string): string;
    resolveRelativePath(name: string, currentPackage: string): string;
    get(name: string): Module;
    import(name: string): Promise<any>;
    load(module: Module): Promise<any>;
}
declare function define(requires: string[], factory: (r: any, e: any) => void): void;
declare class MockType {
    type: any;
    name: string;
    mock: boolean;
    readonly moduleName: string;
    readonly exportName: string;
    loaded: boolean;
    replaced: any;
    constructor(type: any, name: string, mock: boolean, moduleName?: string, exportName?: string);
}
declare class UMDClass {
    viewPrefix: string;
    defaultApp: string;
    lang: string;
    resolvePath(n: string): string;
    resolveViewPath(path: string): string;
    map(name: string, path: string, type?: ("amd" | "global"), exportVar?: string): void;
    mockType(type: any, name: string): void;
    inject(type: any, name: string): void;
    mock(): void;
    resolveViewClassAsync(path: string): Promise<any>;
    load(path: string, designMode?: boolean): Promise<any>;
    loadView(path: string, designMode?: boolean, appPath?: string): Promise<any>;
}
declare const UMD: UMDClass;
