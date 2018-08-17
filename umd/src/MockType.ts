class MockType {

    public loaded: boolean = false;
    public replaced: any;

    constructor(
        public type: any,
        public name: string,
        public mock: boolean,
        public readonly moduleName?: string,
        public readonly exportName?: string) {

            this.name = name = name.replace("{lang}", UMD.lang);

            if(name.indexOf("$") !== -1) {
                const tokens: string[] = name.split("$");
                this.moduleName = tokens[0];
                this.exportName = tokens[1];
            } else {
                this.moduleName = name;
                this.exportName = "default";
            }
        }

}
