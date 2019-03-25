var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
// @ts-ignore
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (factory());
}(this, (function () {
    'use strict';
    /**
     * @this {Promise}
     */
    function finallyConstructor(callback) {
        var constructor = this.constructor;
        return this.then(function (value) {
            return constructor.resolve(callback()).then(function () {
                return value;
            });
        }, function (reason) {
            return constructor.resolve(callback()).then(function () {
                return constructor.reject(reason);
            });
        });
    }
    // Store setTimeout reference so promise-polyfill will be unaffected by
    // other code modifying setTimeout (like sinon.useFakeTimers())
    var setTimeoutFunc = setTimeout;
    function noop() { }
    // Polyfill for Function.prototype.bind
    function bind(fn, thisArg) {
        return function () {
            fn.apply(thisArg, arguments);
        };
    }
    /**
     * @constructor
     * @param {Function} fn
     */
    function Promise(fn) {
        if (!(this instanceof Promise))
            throw new TypeError('Promises must be constructed via new');
        if (typeof fn !== 'function')
            throw new TypeError('not a function');
        /** @type {!number} */
        this._state = 0;
        /** @type {!boolean} */
        this._handled = false;
        /** @type {Promise|undefined} */
        this._value = undefined;
        /** @type {!Array<!Function>} */
        this._deferreds = [];
        doResolve(fn, this);
    }
    function handle(self, deferred) {
        while (self._state === 3) {
            self = self._value;
        }
        if (self._state === 0) {
            self._deferreds.push(deferred);
            return;
        }
        self._handled = true;
        // @ts-ignore
        Promise._immediateFn(function () {
            var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
            if (cb === null) {
                (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
                return;
            }
            var ret;
            try {
                ret = cb(self._value);
            }
            catch (e) {
                reject(deferred.promise, e);
                return;
            }
            resolve(deferred.promise, ret);
        });
    }
    function resolve(self, newValue) {
        try {
            // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
            if (newValue === self)
                throw new TypeError('A promise cannot be resolved with itself.');
            if (newValue &&
                (typeof newValue === 'object' || typeof newValue === 'function')) {
                var then = newValue.then;
                if (newValue instanceof Promise) {
                    self._state = 3;
                    self._value = newValue;
                    finale(self);
                    return;
                }
                else if (typeof then === 'function') {
                    doResolve(bind(then, newValue), self);
                    return;
                }
            }
            self._state = 1;
            self._value = newValue;
            finale(self);
        }
        catch (e) {
            reject(self, e);
        }
    }
    function reject(self, newValue) {
        self._state = 2;
        self._value = newValue;
        finale(self);
    }
    function finale(self) {
        if (self._state === 2 && self._deferreds.length === 0) {
            // @ts-ignore
            Promise._immediateFn(function () {
                if (!self._handled) {
                    // @ts-ignore
                    Promise._unhandledRejectionFn(self._value);
                }
            });
        }
        for (var i = 0, len = self._deferreds.length; i < len; i++) {
            handle(self, self._deferreds[i]);
        }
        self._deferreds = null;
    }
    /**
     * @constructor
     */
    function Handler(onFulfilled, onRejected, promise) {
        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.promise = promise;
    }
    /**
     * Take a potentially misbehaving resolver function and make sure
     * onFulfilled and onRejected are only called once.
     *
     * Makes no guarantees about asynchrony.
     */
    function doResolve(fn, self) {
        var done = false;
        try {
            fn(function (value) {
                if (done)
                    return;
                done = true;
                resolve(self, value);
            }, function (reason) {
                if (done)
                    return;
                done = true;
                reject(self, reason);
            });
        }
        catch (ex) {
            if (done)
                return;
            done = true;
            reject(self, ex);
        }
    }
    Promise.prototype['catch'] = function (onRejected) {
        return this.then(null, onRejected);
    };
    Promise.prototype.then = function (onFulfilled, onRejected) {
        // @ts-ignore
        var prom = new this.constructor(noop);
        handle(this, new Handler(onFulfilled, onRejected, prom));
        return prom;
    };
    Promise.prototype['finally'] = finallyConstructor;
    // @ts-ignore
    Promise.all = function (arr) {
        return new Promise(function (resolve, reject) {
            if (!arr || typeof arr.length === 'undefined')
                throw new TypeError('Promise.all accepts an array');
            var args = Array.prototype.slice.call(arr);
            if (args.length === 0)
                return resolve([]);
            var remaining = args.length;
            function res(i, val) {
                try {
                    if (val && (typeof val === 'object' || typeof val === 'function')) {
                        var then = val.then;
                        if (typeof then === 'function') {
                            then.call(val, function (val) {
                                res(i, val);
                            }, reject);
                            return;
                        }
                    }
                    args[i] = val;
                    if (--remaining === 0) {
                        resolve(args);
                    }
                }
                catch (ex) {
                    reject(ex);
                }
            }
            for (var i = 0; i < args.length; i++) {
                res(i, args[i]);
            }
        });
    };
    // @ts-ignore
    Promise.resolve = function (value) {
        if (value && typeof value === 'object' && value.constructor === Promise) {
            return value;
        }
        return new Promise(function (resolve) {
            resolve(value);
        });
    };
    // @ts-ignore
    Promise.reject = function (value) {
        return new Promise(function (resolve, reject) {
            reject(value);
        });
    };
    // @ts-ignore
    Promise.race = function (values) {
        return new Promise(function (resolve, reject) {
            for (var i = 0, len = values.length; i < len; i++) {
                values[i].then(resolve, reject);
            }
        });
    };
    // Use polyfill for setImmediate for performance gains
    // @ts-ignore
    Promise._immediateFn =
        // @ts-ignore
        (typeof setImmediate === 'function' &&
            function (fn) {
                // @ts-ignore
                setImmediate(fn);
            }) ||
            function (fn) {
                setTimeoutFunc(fn, 0);
            };
    // @ts-ignore
    Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
        if (typeof console !== 'undefined' && console) {
            console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
        }
    };
    /** @suppress {undefinedVars} */
    var globalNS = (function () {
        // the only reliable means to get the global object is
        // `Function('return this')()`
        // However, this causes CSP violations in Chrome apps.
        if (typeof self !== 'undefined') {
            return self;
        }
        if (typeof window !== 'undefined') {
            return window;
        }
        if (typeof global !== 'undefined') {
            return global;
        }
        throw new Error('unable to locate global object');
    })();
    if (!('Promise' in globalNS)) {
        globalNS['Promise'] = Promise;
    }
    else if (!globalNS.Promise.prototype['finally']) {
        globalNS.Promise.prototype['finally'] = finallyConstructor;
    }
})));
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
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, endPosition) {
        var index = this.indexOf(searchString, endPosition);
        return index !== -1;
    };
}
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchString, endPosition) {
        var index = this.lastIndexOf(searchString, endPosition);
        if (index === -1) {
            return false;
        }
        var l = this.length - index;
        return l === searchString.length;
    };
}
if (!Number.parseInt) {
    Number.parseInt = function (n) {
        return Math.floor(parseFloat(n));
    };
}
if (!Number.parseFloat) {
    Number.parseFloat = function (n) {
        return parseFloat(n);
    };
}
if (typeof Element !== "undefined") {
    if (!("remove" in Element.prototype)) {
        // tslint:disable-next-line
        Element.prototype["remove"] = function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }
}
var Module = /** @class */ (function () {
    function Module(name, folder) {
        this.name = name;
        this.folder = folder;
        this.ignoreModule = null;
        this.dependencies = [];
        var index = name.lastIndexOf("/");
        if (index === -1) {
            this.folder = "";
        }
        else {
            this.folder = name.substr(0, index);
        }
    }
    Module.prototype.resolve = function (resolve, reject) {
        var _this = this;
        if (this.dependencies && this.dependencies.length) {
            Promise.all(this.dependencies
                .map(function (x) { return AmdLoader.instance.import(x.name); }))
                .then(function () {
                resolve(_this.getExports());
            })
                .catch(reject);
        }
        else {
            resolve(this.getExports());
        }
    };
    Module.prototype.isDependentOn = function (d) {
        for (var _i = 0, _a = this.dependencies; _i < _a.length; _i++) {
            var iterator = _a[_i];
            if (iterator === d) {
                return true;
            }
            if (iterator.isDependentOn(d)) {
                return true;
            }
        }
        return false;
    };
    Module.prototype.addDependency = function (d) {
        // ignore module contains dependency resolution module
        if (d === this.ignoreModule) {
            return;
        }
        if (d.isDependentOn(this)) {
            return;
        }
        this.dependencies.push(d);
    };
    Module.prototype.getExports = function () {
        if (this.exports) {
            return this.exports;
        }
        if (this.factory) {
            AmdLoader.instance.currentStack.push(this);
            var result = this.factory(this.require, this.exports);
            this.exports = result;
            if (typeof result !== "object") {
                this.exports = { __esModule: true, default: result };
            }
            // if (result) {
            //     if (typeof result === "object") {
            //         for (const key in result) {
            //             if (result.hasOwnProperty(key)) {
            //                 const element: any = result[key];
            //                 this.exports[key] = element;
            //             }
            //         }
            //     } else if (!this.exports.default) {
            //         this.exports.default = result;
            //     }
            // }
            AmdLoader.instance.currentStack.pop();
            delete this.factory;
        }
        return this.exports;
    };
    return Module;
}());
/// <reference path="./Promise.ts"/>
/// <reference path="./ArrayHelper.ts"/>
/// <reference path="./Module.ts"/>
if (typeof require !== "undefined") {
    md = require("module").Module;
}
var AmdLoader = /** @class */ (function () {
    function AmdLoader() {
        this.mockTypes = [];
        this.root = null;
        this.currentStack = [];
        this.pendingModules = [];
        // only useful in node environment
        this.nodeModules = [];
        this.modules = {};
        this.pathMap = {};
    }
    AmdLoader.prototype.register = function (packages, modules) {
        for (var _i = 0, packages_1 = packages; _i < packages_1.length; _i++) {
            var iterator = packages_1[_i];
            if (!this.pathMap[iterator]) {
                this.map(iterator, "/");
            }
        }
        for (var _a = 0, modules_1 = modules; _a < modules_1.length; _a++) {
            var iterator = modules_1[_a];
            this.get(iterator);
        }
    };
    AmdLoader.prototype.registerModule = function (name, moduleExports) {
        var m = this.get(name);
        m.package.url = "/";
        m.exports = __assign({ __esModule: true }, moduleExports);
        m.loader = Promise.resolve(m.exports);
    };
    AmdLoader.prototype.setup = function (name) {
        var jsModule = this.get(name);
        var define = this.define;
        jsModule.loader = new Promise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    AmdLoader.current = jsModule;
                    if (define) {
                        define();
                    }
                    if (jsModule.exportVar) {
                        jsModule.exports = AmdLoader.globalVar[jsModule.exportVar];
                    }
                    jsModule.resolve(resolve, reject);
                }
                catch (e) {
                    reject(e);
                }
            }, 1);
        });
    };
    AmdLoader.prototype.replace = function (type, name, mock) {
        if (mock && !this.enableMock) {
            return;
        }
        var peek = this.currentStack.length ? this.currentStack[this.currentStack.length - 1] : undefined;
        var rt = new MockType(peek, type, name, mock);
        this.mockTypes.push(rt);
    };
    AmdLoader.prototype.resolveType = function (type) {
        var t = this.mockTypes.find(function (t) { return t.type === type; });
        return t ? t.replaced : type;
    };
    AmdLoader.prototype.map = function (packageName, packageUrl, type, exportVar) {
        if (type === void 0) { type = "amd"; }
        // ignore map if it exists already...
        var existing = this.pathMap[packageName];
        if (existing) {
            existing.url = packageUrl;
            existing.exportVar = exportVar;
            existing.type = type;
            return existing;
        }
        existing = {
            name: packageName,
            url: packageUrl,
            type: type,
            exportVar: exportVar,
            version: ""
        };
        if (packageName === "reflect-metadata") {
            type = "global";
        }
        this.pathMap[packageName] = existing;
        return existing;
    };
    AmdLoader.prototype.resolveSource = function (name, defExt) {
        if (defExt === void 0) { defExt = ".js"; }
        try {
            if (/^((\/)|((http|https)\:\/\/))/i.test(name)) {
                // console.log(`ResolveSource fail: ${name}`);
                return name;
            }
            var path = null;
            for (var key in this.pathMap) {
                if (this.pathMap.hasOwnProperty(key)) {
                    var packageName = key;
                    if (name.startsWith(packageName)) {
                        path = this.pathMap[key].url;
                        if (name.length !== packageName.length) {
                            if (name[packageName.length] !== "/") {
                                continue;
                            }
                            name = name.substr(packageName.length + 1);
                        }
                        else {
                            return path;
                        }
                        if (path.endsWith("/")) {
                            path = path.substr(0, path.length - 1);
                        }
                        path = path + "/" + name;
                        if (defExt && !path.endsWith(defExt)) {
                            path = path + defExt;
                        }
                        return path;
                    }
                }
            }
            return name;
        }
        catch (e) {
            console.error("Failed to resolve " + name + " with error " + JSON.stringify(e));
            console.error(e);
        }
    };
    AmdLoader.prototype.resolveRelativePath = function (name, currentPackage) {
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
    AmdLoader.prototype.getPackageVersion = function (name) {
        var _a = name.split("/", 3), scope = _a[0], packageName = _a[1], path = _a[2];
        var version = "";
        if (scope[0] !== "@") {
            packageName = scope;
            scope = "";
        }
        else {
            scope += "/";
        }
        var versionTokens = packageName.split("@");
        if (versionTokens.length > 1) {
            // remove version and map it..
            version = versionTokens[1];
            name = name.replace("@" + version, "");
        }
        packageName = scope + packageName;
        return { packageName: packageName, version: version, name: name };
    };
    AmdLoader.prototype.get = function (name1) {
        var _this = this;
        var module = this.modules[name1];
        if (!module) {
            // strip '@' version info
            var _a = this.getPackageVersion(name1), packageName = _a.packageName, version = _a.version, name_1 = _a.name;
            module = new Module(name_1);
            this.modules[name1] = module;
            module.package = this.pathMap[packageName] ||
                (this.pathMap[packageName] = {
                    type: "amd",
                    name: packageName,
                    version: version,
                    url: undefined
                });
            module.url = this.resolveSource(name_1);
            if (!module.url) {
                if (typeof require === "undefined") {
                    throw new Error("No url mapped for " + name_1);
                }
            }
            module.require = function (n) {
                var an = _this.resolveRelativePath(n, module.name);
                var resolvedModule = _this.get(an);
                return resolvedModule.getExports();
            };
            this.modules[name_1] = module;
        }
        return module;
    };
    AmdLoader.prototype.import = function (name) {
        if (typeof require !== "undefined") {
            return Promise.resolve(require(name));
        }
        var module = this.get(name);
        if (module.loader) {
            return module.loader;
        }
        return module.loader = this._import(module);
    };
    AmdLoader.prototype._import = function (module) {
        return __awaiter(this, void 0, void 0, function () {
            var exports, pendingList, _i, pendingList_1, iterator, _a, pendingList_2, iterator, containerModule, resolvedName, im, ex, type;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.pendingModules.push(module);
                        if (!this.root) {
                            this.root = module;
                        }
                        return [4 /*yield*/, this.load(module)];
                    case 1:
                        _b.sent();
                        exports = module.getExports();
                        pendingList = this.mockTypes.filter(function (t) { return !t.loaded; });
                        if (!pendingList.length) return [3 /*break*/, 5];
                        for (_i = 0, pendingList_1 = pendingList; _i < pendingList_1.length; _i++) {
                            iterator = pendingList_1[_i];
                            iterator.loaded = true;
                        }
                        _a = 0, pendingList_2 = pendingList;
                        _b.label = 2;
                    case 2:
                        if (!(_a < pendingList_2.length)) return [3 /*break*/, 5];
                        iterator = pendingList_2[_a];
                        containerModule = iterator.module;
                        resolvedName = this.resolveRelativePath(iterator.moduleName, containerModule.name);
                        im = this.get(resolvedName);
                        im.ignoreModule = module;
                        return [4 /*yield*/, this.import(resolvedName)];
                    case 3:
                        ex = _b.sent();
                        type = ex[iterator.exportName];
                        iterator.replaced = type;
                        _b.label = 4;
                    case 4:
                        _a++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (this.root === module) {
                            this.root = null;
                            AmdLoader.moduleProgress(null, this.modules, "done");
                        }
                        this.pendingModules = this.pendingModules.filter(function (x) { return x !== module; });
                        return [2 /*return*/, exports];
                }
            });
        });
    };
    AmdLoader.prototype.load = function (module) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            AmdLoader.moduleLoader(module.name, module.url, function () {
                try {
                    AmdLoader.current = module;
                    if (AmdLoader.instance.define) {
                        AmdLoader.instance.define();
                        AmdLoader.instance.define = null;
                    }
                    if (module.exportVar) {
                        module.exports = AmdLoader.globalVar[module.exportVar];
                    }
                    if (AmdLoader.moduleProgress) {
                        AmdLoader.moduleProgress(module.name, _this.modules, "loading");
                    }
                    module.resolve(resolve, reject);
                }
                catch (e) {
                    reject(e);
                }
            }, function (error) {
                reject(error);
            });
        });
    };
    AmdLoader.globalVar = {};
    AmdLoader.instance = new AmdLoader();
    AmdLoader.current = null;
    return AmdLoader;
}());
var a = AmdLoader.instance;
a.map("global", "/", "global");
a.registerModule("global/document", { default: document });
a.registerModule("global/window", { default: window });
AmdLoader.moduleLoader = function (name, url, success, error) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    var s = script;
    script.onload = s.onreadystatechange = function () {
        if ((s.readyState && s.readyState !== "complete" && s.readyState !== "loaded")) {
            return;
        }
        script.onload = s.onreadystatechange = null;
        success();
    };
    document.body.appendChild(script);
};
AmdLoader.moduleProgress = (function () {
    if (!document) {
        return function (name, p) {
            console.log(name + " " + p + "%");
        };
    }
    var progressDiv = document.createElement("div");
    var style = progressDiv.style;
    style.position = "absolute";
    style.margin = "auto";
    style.width = "200px";
    style.height = "100px";
    style.top = style.right = style.left = style.bottom = "5px";
    style.borderStyle = "solid";
    style.borderWidth = "1px";
    style.borderColor = "#A0A0A0";
    style.borderRadius = "5px";
    style.padding = "5px";
    style.textAlign = "left";
    style.verticalAlign = "bottom";
    var progressLabel = document.createElement("pre");
    progressDiv.appendChild(progressLabel);
    progressLabel.style.color = "#A0A0A0";
    var ps = progressLabel.style;
    ps.position = "absolute";
    ps.left = "5px";
    ps.bottom = "0";
    function ready() {
        document.body.appendChild(progressDiv);
    }
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed);
        window.removeEventListener("load", completed);
        ready();
    }
    if (document.readyState === "complete" ||
        // tslint:disable-next-line:no-string-literal
        (document.readyState !== "loading" && !document.documentElement["doScroll"])) {
        window.setTimeout(ready);
    }
    else {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
    }
    return function (name, n, status) {
        if (status === "done") {
            progressDiv.style.display = "none";
            return;
        }
        else {
            progressDiv.style.display = "block";
        }
        name = name.split("/").pop();
        progressLabel.textContent = name;
    };
})();
/// <reference path="./AmdLoader.ts"/>
var define = function (requiresOrFactory, factory) {
    AmdLoader.instance.define = function () {
        var current = AmdLoader.current;
        if (!current) {
            return;
        }
        if (current.factory) {
            return;
        }
        // console.log(`Define for ${current.name}`);
        current.dependencies = [];
        var loader = AmdLoader.instance;
        var requires = [];
        if (typeof requiresOrFactory === "function") {
            factory = requiresOrFactory;
        }
        else {
            requires = requiresOrFactory;
        }
        var args = [];
        var exports = {};
        for (var _i = 0, requires_1 = requires; _i < requires_1.length; _i++) {
            var s = requires_1[_i];
            if (s === "require") {
                args.push(current.require);
                continue;
            }
            if (s === "exports") {
                args.push(exports);
                continue;
            }
            if (/^global/.test(s)) {
                args.push(loader.get(s).exports);
            }
            // if(/^(require|exports)$/.test(s)) {
            //     continue;
            // }
            var name_2 = loader.resolveRelativePath(s, current.name);
            var child = loader.get(name_2);
            current.addDependency(child);
        }
        // const fx = factory.bind(current, ... args);
        current.factory = function () {
            return factory.apply(current, args) || exports;
        };
    };
};
define.amd = {};
var MockType = /** @class */ (function () {
    function MockType(module, type, name, mock, moduleName, exportName) {
        this.module = module;
        this.type = type;
        this.name = name;
        this.mock = mock;
        this.moduleName = moduleName;
        this.exportName = exportName;
        this.loaded = false;
        this.name = name = name
            .replace("{lang}", UMD.lang)
            .replace("{platform}", UMD.viewPrefix);
        if (name.indexOf("$") !== -1) {
            var tokens = name.split("$");
            this.moduleName = tokens[0];
            this.exportName = tokens[1] || tokens[0].split("/").pop();
        }
        else {
            this.moduleName = name;
            this.exportName = "default";
        }
    }
    return MockType;
}());
/// <reference path="./AmdLoader.ts"/>
var UMDClass = /** @class */ (function () {
    function UMDClass() {
        this.viewPrefix = "web";
        this.defaultApp = "web-atoms-core/dist/web/WebApp";
        this.lang = "en-US";
    }
    Object.defineProperty(UMDClass.prototype, "mock", {
        get: function () {
            return AmdLoader.instance.enableMock;
        },
        set: function (v) {
            AmdLoader.instance.enableMock = v;
        },
        enumerable: true,
        configurable: true
    });
    UMDClass.prototype.resolvePath = function (n) {
        return AmdLoader.instance.resolveSource(n, null);
    };
    UMDClass.prototype.resolveViewPath = function (path) {
        return path.replace("{platform}", this.viewPrefix);
    };
    UMDClass.prototype.resolveType = function (type) {
        return AmdLoader.instance.resolveType(type);
    };
    UMDClass.prototype.map = function (name, path, type, exportVar) {
        if (type === void 0) { type = "amd"; }
        AmdLoader.instance.map(name, path, type, exportVar);
    };
    UMDClass.prototype.mockType = function (type, name) {
        AmdLoader.instance.replace(type, name, true);
    };
    UMDClass.prototype.inject = function (type, name) {
        AmdLoader.instance.replace(type, name, false);
    };
    UMDClass.prototype.resolveViewClassAsync = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.resolveViewPath(path);
                        return [4 /*yield*/, AmdLoader.instance.import(path)];
                    case 1:
                        e = _a.sent();
                        return [2 /*return*/, e.default];
                }
            });
        });
    };
    UMDClass.prototype.import = function (path) {
        return AmdLoader.instance.import(path);
    };
    UMDClass.prototype.load = function (path, designMode) {
        return __awaiter(this, void 0, void 0, function () {
            var a, al;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.mock = designMode;
                        return [4 /*yield*/, AmdLoader.instance.import("web-atoms-core/dist/Atom")];
                    case 1:
                        a = _a.sent();
                        a.Atom.designMode = designMode;
                        return [4 /*yield*/, AmdLoader.instance.import("web-atoms-core/dist/core/AtomList")];
                    case 2:
                        al = _a.sent();
                        return [4 /*yield*/, AmdLoader.instance.import(path)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Host the view inside given element with given id
     * @param id id of element to host view in
     * @param path path of module
     * @param designMode true/false (default false)
     */
    UMDClass.prototype.hostView = function (id, path, designMode) {
        return __awaiter(this, void 0, void 0, function () {
            var m, app_1, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.mock = designMode;
                        AmdLoader.instance.get(path);
                        return [4 /*yield*/, this.load(this.defaultApp, designMode)];
                    case 1:
                        m = _a.sent();
                        app_1 = new (m.default)();
                        app_1.onReady(function () { return __awaiter(_this, void 0, void 0, function () {
                            var viewClass, view, element, e_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, AmdLoader.instance.import(path)];
                                    case 1:
                                        viewClass = _a.sent();
                                        view = new (viewClass.default)(app_1);
                                        element = document.getElementById(id);
                                        element.appendChild(view.element);
                                        return [3 /*break*/, 3];
                                    case 2:
                                        e_2 = _a.sent();
                                        console.error(e_2);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UMDClass.prototype.loadView = function (path, designMode, appPath) {
        return __awaiter(this, void 0, void 0, function () {
            var m, app;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.mock = designMode;
                        appPath = appPath || this.defaultApp;
                        AmdLoader.instance.get(path);
                        return [4 /*yield*/, this.load(appPath, designMode)];
                    case 1:
                        m = _a.sent();
                        app = new (m.default)();
                        app.onReady(function () { return __awaiter(_this, void 0, void 0, function () {
                            var viewClass, view, e_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, AmdLoader.instance.import(path)];
                                    case 1:
                                        viewClass = _a.sent();
                                        view = new (viewClass.default)(app);
                                        app.root = view;
                                        return [3 /*break*/, 3];
                                    case 2:
                                        e_3 = _a.sent();
                                        console.error(e_3);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    return UMDClass;
}());
var UMD = new UMDClass();
//# sourceMappingURL=umd.js.map