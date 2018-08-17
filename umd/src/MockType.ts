class MockType {

    public loaded: boolean = false;
    public mock: any;

    constructor(
        public type: any,
        public name: string,
        public readonly moduleName?: string,
        public readonly exportName?: string) {
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
