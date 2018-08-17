class MockType {

    public loaded: boolean = false;
    public replaced: any;

    constructor(
        public type: any,
        public name: string,
        public mock: boolean,
        public readonly moduleName?: string,
        public readonly exportName?: string) {

            name = name.replace("{lang}", UMD.lang);

            if(name.indexOf(".") !== -1) {
                const tokens: string[] = name.split(".");
                moduleName = tokens[0];
                exportName = tokens[1];
            } else {
                moduleName = name;
                exportName = "default";
            }
        }

}
