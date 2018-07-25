var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/// <reference path="./Module.ts"/>
if (!Array.prototype.find) {
    Array.prototype.find = function (predicate, thisArg) {
        for (var i = 0; i < this.length; i++) {
            var item = this[i];
            if (predicate(item, i, this)) {
                return item;
            }
        }
    };
}
if (!Array.prototype.map) {
    Array.prototype.map = function (callbackfn, thisArg) {
        var a = [];
        for (var i = 0; i < this.length; i++) {
            var r = callbackfn(this[i], i, this);
            if (r !== undefined) {
                a.push(r);
            }
        }
        return a;
    };
}
var Module = /** @class */ (function () {
    function Module() {
        this.handlers = [];
        this.dependencies = [];
    }
    Module.prototype.onLoad = function (f) {
        this.handlers.push(f);
    };
    Module.prototype.finish = function () {
        for (var _i = 0, _a = this.dependencies; _i < _a.length; _i++) {
            var iterator = _a[_i];
            if (!iterator.exports) {
                return;
            }
        }
        if (!this.exports) {
            console.log("finishing " + this.name);
            this.exports = {};
            if (this.factory) {
                this.factory(this.require, this.exports);
            }
            // this.handlers.length = 0;
        }
        for (var _b = 0, _c = this.handlers; _b < _c.length; _b++) {
            var iterator = _c[_b];
            iterator();
        }
    };
    return Module;
}());
var AmdLoader = /** @class */ (function () {
    function AmdLoader() {
        this.modules = [];
        this.pathMap = {};
    }
    AmdLoader.prototype.map = function (packageName, packageUrl, type) {
        if (type === void 0) { type = "amd"; }
        if (/^(reflect\-metadata|systemjs)$/.test(packageName)) {
            type = "global";
        }
        this.pathMap[packageName] = {
            url: packageUrl,
            type: type
        };
    };
    AmdLoader.prototype.resolveSource = function (name, defExt) {
        if (defExt === void 0) { defExt = ".js"; }
        try {
            var tokens = name.split("/");
            var packageName = tokens[0];
            var path = this.pathMap[packageName].url;
            tokens[0] = path;
            var url = tokens.join("/");
            if (defExt && !url.endsWith(".js")) {
                url = url + ".js";
            }
            return url;
        }
        catch (e) {
            console.error("Failed to resolve " + name);
            console.error(e);
        }
    };
    AmdLoader.prototype.resolveRelativePath = function (name, currentPackage) {
        // const absolutePath: string = this.pathMap[currentPackage].url;
        if (name.charAt(0) !== ".") {
            return name;
        }
        var tokens = name.split("/");
        var currentTokens = currentPackage.split("/");
        currentTokens.pop();
        while (tokens.length) {
            var first = tokens[0];
            if (first === "..") {
                currentTokens.pop();
                tokens.splice(0, 1);
                continue;
            }
            if (first === ".") {
                tokens.splice(0, 1);
            }
            break;
        }
        return currentTokens.join("/") + "/" + tokens.join("/");
    };
    AmdLoader.prototype.get = function (name) {
        var _this = this;
        var module = this.modules.find(function (x) { return x.name === name; });
        if (!module) {
            module = new Module();
            module.name = name;
            // module.url = this.resolvePath(name, AmdLoader.current.url);
            module.url = this.resolveSource(name);
            module.type = (this.pathMap[name] || { type: "amd" }).type || "amd";
            module.require = function (n) {
                var an = _this.resolveRelativePath(n, module.name);
                return _this.get(an).exports;
            };
            this.modules.push(module);
        }
        return module;
    };
    AmdLoader.prototype.import = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var module;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        module = this.get(name);
                        return [4 /*yield*/, this.load(module)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AmdLoader.prototype.load = function (module) {
        var _this = this;
        if (module.exports) {
            return new Promise(function (r1, r2) {
                r1(module.exports);
            });
        }
        if (module.code) {
            return module.code();
        }
        return module.loader = new Promise(function (resolve, reject) {
            if (module.exports) {
                resolve(module.exports);
                return;
            }
            module.code = function () {
                return new Promise(function (r1, r2) {
                    module.onLoad(function () {
                        r1(module.exports);
                    });
                });
            };
            AmdLoader.moduleLoader(module.name, module.url, function (r) {
                AmdLoader.current = module;
                // tslint:disable-next-line:no-eval
                r();
                _this.finish(function () {
                    resolve(module.exports);
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    AmdLoader.prototype.finish = function (f) {
        for (var _i = 0, _a = this.modules; _i < _a.length; _i++) {
            var iterator = _a[_i];
            if (!iterator.exports) {
                iterator.finish();
            }
            if (!iterator.exports) {
                return;
            }
        }
        f();
    };
    AmdLoader.instance = new AmdLoader();
    AmdLoader.current = null;
    return AmdLoader;
}());
var UMD = {
    resolvePath: function (n) {
        return AmdLoader.instance.resolveSource(n, null);
    }
};
function define(requires, factory) {
    var current = AmdLoader.current;
    if (current.factory) {
        return;
    }
    // console.log(`Define for ${current.name}`);
    current.dependencies = [];
    var loader = AmdLoader.instance;
    for (var _i = 0, requires_1 = requires; _i < requires_1.length; _i++) {
        var s = requires_1[_i];
        if (/^(require|exports)$/.test(s)) {
            continue;
        }
        // resolve full name...
        var name_1 = loader.resolveRelativePath(s, current.name);
        // console.log(`dep: ${name} for ${s} in ${current.name}`);
        var child = loader.get(name_1);
        current.dependencies.push(child);
        loader.load(child);
    }
    current.factory = factory;
}
define.amd = true;
//# sourceMappingURL=umd.js.map