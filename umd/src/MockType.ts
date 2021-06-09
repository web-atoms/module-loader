class MockType {

    public get loaded() {
        return this.replacedModule.ignoreModule;
    }
    public replaced: any;
    public replacedModule: Module;

    constructor(
        public readonly module: Module,
        public type: any,
        public name: string,
        public mock: boolean,
        public moduleName?: string,
        public readonly exportName?: string) {

            this.name = name = name
                .replace("{lang}", UMD.lang)
                .replace("{platform}", UMD.viewPrefix);

            if (name.indexOf("$") !== -1) {
                const tokens: string[] = name.split("$");
                this.moduleName = tokens[0];
                this.exportName = tokens[1] || tokens[0].split("/").pop();
            } else {
                this.moduleName = name;
                this.exportName = "default";
            }
        }

}
