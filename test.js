var fs = require("fs");
var vm = require("vm");
var URL = require("url");

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

global.document = null;
loadScript("./umd.js");

var http = require("https");

var AmdLoader = global.AmdLoader;
var define = global.define;

var keepAlive = new http.Agent({ keepAlive: true});

AmdLoader.moduleProgress = function() {
    
};

AmdLoader.moduleLoader = function(name, url, success, error) {
    console.log("Loading '" + name + "': " + url);
    var options = new URL.URL(url);
    options.agent = keepAlive;
    http.get(options, function(res) {
        res.setEncoding("utf8");
        var rawData = "";
        res.on("data", function(c) {
            rawData += c;
        });
        res.on("end", function(){
            if (res.statusCode === 200) {
                success(function() {
                    var s = new vm.Script(rawData, {
                        filename: url,
                        displayErrors: true,
                        lineOffset: 0,
                        columnOffset: 0
                    });
                    s.runInThisContext();
                });
            } else {
                error("Failed for " + name + " \r\n" + rawData);
            }
        });
    });
};

AmdLoader.instance.map("web-atoms-core", "https://cdn.jsdelivr.net/npm/web-atoms-core@1.0.279");
AmdLoader.instance.map("web-atoms-samples", "https://cdn.jsdelivr.net/npm/web-atoms-samples@1.0.1");
AmdLoader.instance.map("reflect-metadata", "https://cdn.jsdelivr.net/npm/reflect-metadata@0.1.12/Reflect.js");

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

