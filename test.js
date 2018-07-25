var fs = require("fs");
var vm = require("vm");

function loadScript(file){
    var s = fs.readFileSync(file,'utf-8');
    var script = new vm.Script(s, { 
        filename: file,
        displayErrors: true,
        lineOffset: 0,
        columnOffset: 0
    });
    script.runInThisContext();
}

loadScript("./umd.js");

var http = require("http");

var AmdLoader = global.AmdLoader;
var define = global.define;

AmdLoader.moduleLoader = function(name, url, success, error) {
    console.log("Loading '" + name + "': " + url);
    http.get(url, function(res) {
        res.setEncoding("utf8");
        var rawData = "";
        res.on("data", function(c) {
            rawData += c;
        });
        res.on("end", function(){
            if (res.statusCode === 200) {
                success(function() {
                    var s = new vm.Script(rawData);
                    s.runInThisContext();
                });
            } else {
                error("Failed for " + name + " \r\n" + rawData);
            }
        });
    });
};

AmdLoader.instance.map("web-atoms-core", "http://cdn.jsdelivr.net/npm/web-atoms-core@1.0.279");
AmdLoader.instance.map("web-atoms-samples", "http://cdn.jsdelivr.net/npm/web-atoms-samples@1.0.1");
AmdLoader.instance.map("reflect-metadata", "http://cdn.jsdelivr.net/npm/reflect-metadata@0.1.12/Reflect.js");

AmdLoader.instance.import("web-atoms-samples/dist/web/views/AppHost").then(function(a) {

    console.log("  ");
    console.log("  ");
    console.log("module loaded successfully");
    console.log("  ");
    console.log("  ");

}).catch(function(error) {
    console.error("Something went wrong" + error);
});

// let us test path resolution...

