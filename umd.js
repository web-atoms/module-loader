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
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
// tslint:disable
// @ts-ignore
var Reflect;
!function (o) { !function (t) { var e = "object" == typeof global ? global : "object" == typeof self ? self : "object" == typeof this ? this : Function("return this;")(), r = n(o); function n(r, n) { return function (t, e) { "function" != typeof r[t] && Object.defineProperty(r, t, { configurable: !0, writable: !0, value: e }), n && n(t, e); }; } void 0 === e.Reflect ? e.Reflect = o : r = n(e.Reflect, r), function (t) { var f = Object.prototype.hasOwnProperty, e = "function" == typeof Symbol, i = e && void 0 !== Symbol.toPrimitive ? Symbol.toPrimitive : "@@toPrimitive", s = e && void 0 !== Symbol.iterator ? Symbol.iterator : "@@iterator", r = "function" == typeof Object.create, n = { __proto__: [] } instanceof Array, o = !r && !n, c = { create: r ? function () { return S(Object.create(null)); } : n ? function () { return S({ __proto__: null }); } : function () { return S({}); }, has: o ? function (t, e) { return f.call(t, e); } : function (t, e) { return e in t; }, get: o ? function (t, e) { return f.call(t, e) ? t[e] : void 0; } : function (t, e) { return t[e]; } }, u = Object.getPrototypeOf(Function), a = "object" == typeof process && process.env && "true" === process.env.REFLECT_METADATA_USE_MAP_POLYFILL, h = a || "function" != typeof Map || "function" != typeof Map.prototype.entries ? function () { var o = {}, r = [], e = function () { function t(t, e, r) { this._index = 0, this._keys = t, this._values = e, this._selector = r; } return t.prototype["@@iterator"] = function () { return this; }, t.prototype[s] = function () { return this; }, t.prototype.next = function () { var t = this._index; if (0 <= t && t < this._keys.length) {
    var e = this._selector(this._keys[t], this._values[t]);
    return t + 1 >= this._keys.length ? (this._index = -1, this._keys = r, this._values = r) : this._index++, { value: e, done: !1 };
} return { value: void 0, done: !0 }; }, t.prototype.throw = function (t) { throw 0 <= this._index && (this._index = -1, this._keys = r, this._values = r), t; }, t.prototype.return = function (t) { return 0 <= this._index && (this._index = -1, this._keys = r, this._values = r), { value: t, done: !0 }; }, t; }(); return function () { function t() { this._keys = [], this._values = [], this._cacheKey = o, this._cacheIndex = -2; } return Object.defineProperty(t.prototype, "size", { get: function () { return this._keys.length; }, enumerable: !0, configurable: !0 }), t.prototype.has = function (t) { return 0 <= this._find(t, !1); }, t.prototype.get = function (t) { var e = this._find(t, !1); return 0 <= e ? this._values[e] : void 0; }, t.prototype.set = function (t, e) { var r = this._find(t, !0); return this._values[r] = e, this; }, t.prototype.delete = function (t) { var e = this._find(t, !1); if (0 <= e) {
    for (var r = this._keys.length, n = e + 1; n < r; n++)
        this._keys[n - 1] = this._keys[n], this._values[n - 1] = this._values[n];
    return this._keys.length--, this._values.length--, t === this._cacheKey && (this._cacheKey = o, this._cacheIndex = -2), !0;
} return !1; }, t.prototype.clear = function () { this._keys.length = 0, this._values.length = 0, this._cacheKey = o, this._cacheIndex = -2; }, t.prototype.keys = function () { return new e(this._keys, this._values, n); }, t.prototype.values = function () { return new e(this._keys, this._values, i); }, t.prototype.entries = function () { return new e(this._keys, this._values, u); }, t.prototype["@@iterator"] = function () { return this.entries(); }, t.prototype[s] = function () { return this.entries(); }, t.prototype._find = function (t, e) { return this._cacheKey !== t && (this._cacheIndex = this._keys.indexOf(this._cacheKey = t)), this._cacheIndex < 0 && e && (this._cacheIndex = this._keys.length, this._keys.push(t), this._values.push(void 0)), this._cacheIndex; }, t; }(); function n(t, e) { return t; } function i(t, e) { return e; } function u(t, e) { return [t, e]; } }() : Map, l = a || "function" != typeof Set || "function" != typeof Set.prototype.entries ? function () { function t() { this._map = new h; } return Object.defineProperty(t.prototype, "size", { get: function () { return this._map.size; }, enumerable: !0, configurable: !0 }), t.prototype.has = function (t) { return this._map.has(t); }, t.prototype.add = function (t) { return this._map.set(t, t), this; }, t.prototype.delete = function (t) { return this._map.delete(t); }, t.prototype.clear = function () { this._map.clear(); }, t.prototype.keys = function () { return this._map.keys(); }, t.prototype.values = function () { return this._map.values(); }, t.prototype.entries = function () { return this._map.entries(); }, t.prototype["@@iterator"] = function () { return this.keys(); }, t.prototype[s] = function () { return this.keys(); }, t; }() : Set, p = new (a || "function" != typeof WeakMap ? function () { var o = 16, e = c.create(), r = n(); return function () { function t() { this._key = n(); } return t.prototype.has = function (t) { var e = i(t, !1); return void 0 !== e && c.has(e, this._key); }, t.prototype.get = function (t) { var e = i(t, !1); return void 0 !== e ? c.get(e, this._key) : void 0; }, t.prototype.set = function (t, e) { var r = i(t, !0); return r[this._key] = e, this; }, t.prototype.delete = function (t) { var e = i(t, !1); return void 0 !== e && delete e[this._key]; }, t.prototype.clear = function () { this._key = n(); }, t; }(); function n() { for (var t; t = "@@WeakMap@@" + a(), c.has(e, t);)
    ; return e[t] = !0, t; } function i(t, e) { if (!f.call(t, r)) {
    if (!e)
        return;
    Object.defineProperty(t, r, { value: c.create() });
} return t[r]; } function u(t, e) { for (var r = 0; r < e; ++r)
    t[r] = 255 * Math.random() | 0; return t; } function a() { var t = function (t) { if ("function" == typeof Uint8Array)
    return "undefined" != typeof crypto ? crypto.getRandomValues(new Uint8Array(t)) : "undefined" != typeof msCrypto ? msCrypto.getRandomValues(new Uint8Array(t)) : u(new Uint8Array(t), t); return u(new Array(t), t); }(o); t[6] = 79 & t[6] | 64, t[8] = 191 & t[8] | 128; for (var e = "", r = 0; r < o; ++r) {
    var n = t[r];
    4 !== r && 6 !== r && 8 !== r || (e += "-"), n < 16 && (e += "0"), e += n.toString(16).toLowerCase();
} return e; } }() : WeakMap); function y(t, e, r) { var n = p.get(t); if (b(n)) {
    if (!r)
        return;
    n = new h, p.set(t, n);
} var o = n.get(e); if (b(o)) {
    if (!r)
        return;
    o = new h, n.set(e, o);
} return o; } function v(t, e, r) { var n = y(e, r, !1); return !b(n) && !!n.has(t); } function _(t, e, r) { var n = y(e, r, !1); if (!b(n))
    return n.get(t); } function d(t, e, r, n) { var o = y(r, n, !0); o.set(t, e); } function w(t, e) { var r = [], n = y(t, e, !1); if (b(n))
    return r; for (var o, i = n.keys(), u = function (t) { var e = M(t, s); if (!j(e))
    throw new TypeError; var r = e.call(t); if (!m(r))
    throw new TypeError; return r; }(i), a = 0;;) {
    var f = (void 0, !(o = u.next()).done && o);
    if (!f)
        return r.length = a, r;
    var c = f.value;
    try {
        r[a] = c;
    }
    catch (t) {
        try {
            A(u);
        }
        finally {
            throw t;
        }
    }
    a++;
} } function g(t) { if (null === t)
    return 1; switch (typeof t) {
    case "undefined": return 0;
    case "boolean": return 2;
    case "string": return 3;
    case "symbol": return 4;
    case "number": return 5;
    case "object": return null === t ? 1 : 6;
    default: return 6;
} } function b(t) { return void 0 === t; } function k(t) { return null === t; } function m(t) { return "object" == typeof t ? null !== t : "function" == typeof t; } function E(t, e) { switch (g(t)) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5: return t;
} var r = 3 === e ? "string" : 5 === e ? "number" : "default", n = M(t, i); if (void 0 !== n) {
    var o = n.call(t, r);
    if (m(o))
        throw new TypeError;
    return o;
} return function (t, e) { if ("string" === e) {
    var r = t.toString;
    if (j(r)) {
        var n = r.call(t);
        if (!m(n))
            return n;
    }
    var o = t.valueOf;
    if (j(o)) {
        var n = o.call(t);
        if (!m(n))
            return n;
    }
}
else {
    var o = t.valueOf;
    if (j(o)) {
        var n = o.call(t);
        if (!m(n))
            return n;
    }
    var i = t.toString;
    if (j(i)) {
        var n = i.call(t);
        if (!m(n))
            return n;
    }
} throw new TypeError; }(t, "default" === r ? "number" : r); } function T(t) { var e = E(t, 3); return "symbol" == typeof e ? e : "" + e; } function O(t) { return Array.isArray ? Array.isArray(t) : t instanceof Object ? t instanceof Array : "[object Array]" === Object.prototype.toString.call(t); } function j(t) { return "function" == typeof t; } function x(t) { return "function" == typeof t; } function M(t, e) { var r = t[e]; if (null != r) {
    if (!j(r))
        throw new TypeError;
    return r;
} } function A(t) { var e = t.return; e && e.call(t); } function P(t) { var e = Object.getPrototypeOf(t); if ("function" != typeof t || t === u)
    return e; if (e !== u)
    return e; var r = t.prototype, n = r && Object.getPrototypeOf(r); if (null == n || n === Object.prototype)
    return e; var o = n.constructor; return "function" != typeof o ? e : o === t ? e : o; } function S(t) { return t.__ = void 0, delete t.__, t; } t("decorate", function (t, e, r, n) { {
    if (b(r)) {
        if (!O(t))
            throw new TypeError;
        if (!x(e))
            throw new TypeError;
        return function (t, e) { for (var r = t.length - 1; 0 <= r; --r) {
            var n = t[r], o = n(e);
            if (!b(o) && !k(o)) {
                if (!x(o))
                    throw new TypeError;
                e = o;
            }
        } return e; }(t, e);
    }
    if (!O(t))
        throw new TypeError;
    if (!m(e))
        throw new TypeError;
    if (!m(n) && !b(n) && !k(n))
        throw new TypeError;
    return k(n) && (n = void 0), r = T(r), function (t, e, r, n) { for (var o = t.length - 1; 0 <= o; --o) {
        var i = t[o], u = i(e, r, n);
        if (!b(u) && !k(u)) {
            if (!m(u))
                throw new TypeError;
            n = u;
        }
    } return n; }(t, e, r, n);
} }), t("metadata", function (r, n) { return function (t, e) { if (!m(t))
    throw new TypeError; if (!b(e) && !function (t) { switch (g(t)) {
    case 3:
    case 4: return !0;
    default: return !1;
} }(e))
    throw new TypeError; d(r, n, t, e); }; }), t("defineMetadata", function (t, e, r, n) { if (!m(r))
    throw new TypeError; b(n) || (n = T(n)); return d(t, e, r, n); }), t("hasMetadata", function (t, e, r) { if (!m(e))
    throw new TypeError; b(r) || (r = T(r)); return function t(e, r, n) { var o = v(e, r, n); if (o)
    return !0; var i = P(r); if (!k(i))
    return t(e, i, n); return !1; }(t, e, r); }), t("hasOwnMetadata", function (t, e, r) { if (!m(e))
    throw new TypeError; b(r) || (r = T(r)); return v(t, e, r); }), t("getMetadata", function (t, e, r) { if (!m(e))
    throw new TypeError; b(r) || (r = T(r)); return function t(e, r, n) { var o = v(e, r, n); if (o)
    return _(e, r, n); var i = P(r); if (!k(i))
    return t(e, i, n); return; }(t, e, r); }), t("getOwnMetadata", function (t, e, r) { if (!m(e))
    throw new TypeError; b(r) || (r = T(r)); return _(t, e, r); }), t("getMetadataKeys", function (t, e) { if (!m(t))
    throw new TypeError; b(e) || (e = T(e)); return function t(e, r) { var n = w(e, r); var o = P(e); if (null === o)
    return n; var i = t(o, r); if (i.length <= 0)
    return n; if (n.length <= 0)
    return i; var u = new l; var a = []; for (var f = 0, c = n; f < c.length; f++) {
    var s = c[f], h = u.has(s);
    h || (u.add(s), a.push(s));
} for (var p = 0, y = i; p < y.length; p++) {
    var s = y[p], h = u.has(s);
    h || (u.add(s), a.push(s));
} return a; }(t, e); }), t("getOwnMetadataKeys", function (t, e) { if (!m(t))
    throw new TypeError; b(e) || (e = T(e)); return w(t, e); }), t("deleteMetadata", function (t, e, r) { if (!m(e))
    throw new TypeError; b(r) || (r = T(r)); var n = y(e, r, !1); if (b(n))
    return !1; if (!n.delete(t))
    return !1; if (0 < n.size)
    return !0; var o = p.get(e); return o.delete(r), 0 < o.size || p.delete(e), !0; }); }(r); }(); }(Reflect || (Reflect = {}));
//# sourceMappingURL=/sm/d3ba45b98814b993d6aab5ce31c491c459ff57773960f74725c98a635912413a.map
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
if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function (predicate, thisArg) {
        for (var i = 0; i < this.length; i++) {
            var item = this[i];
            if (predicate(item, i, this)) {
                return i;
            }
        }
        return -1;
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
    // tslint:disable-next-line:only-arrow-functions
    Number.parseInt = function (n) {
        return Math.floor(parseFloat(n));
    };
}
if (!Number.parseFloat) {
    // tslint:disable-next-line:only-arrow-functions
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
        this.emptyExports = {};
        this.ignoreModule = null;
        this.isLoaded = false;
        this.isResolved = false;
        this.dependencies = [];
        this.rID = null;
        var index = name.lastIndexOf("/");
        if (index === -1) {
            this.folder = "";
        }
        else {
            this.folder = name.substr(0, index);
        }
    }
    Object.defineProperty(Module.prototype, "filename", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Module.prototype.resolve = function (id) {
        if (!this.isLoaded) {
            return false;
        }
        if (this.isResolved) {
            return true;
        }
        if (!id) {
            id = Module.nextID++;
        }
        if (this.rID === id) {
            // circular dependency found...
            var childrenResolved = true;
            for (var _i = 0, _a = this.dependencies; _i < _a.length; _i++) {
                var iterator = _a[_i];
                if (iterator === this.ignoreModule) {
                    continue;
                }
                if (iterator.rID === id) {
                    continue;
                }
                if (!iterator.resolve(id)) {
                    childrenResolved = false;
                    break;
                }
            }
            return childrenResolved;
        }
        this.rID = id;
        var allResolved = true;
        for (var _b = 0, _c = this.dependencies; _b < _c.length; _b++) {
            var iterator = _c[_b];
            if (iterator === this.ignoreModule) {
                continue;
            }
            if (!iterator.resolve(id)) {
                allResolved = false;
                break;
            }
        }
        if (!allResolved) {
            this.rID = 0;
            return false;
        }
        var i = AmdLoader.instance;
        if (this.dependencyHooks) {
            this.dependencyHooks[0]();
            this.dependencyHooks = null;
        }
        if (this.resolveHooks) {
            this.resolveHooks[0](this.getExports());
            this.resolveHooks = null;
            i.remove(this);
            this.rID = 0;
            return true;
        }
        this.rID = 0;
        return false;
    };
    Module.prototype.addDependency = function (d) {
        // ignore module contains dependency resolution module
        if (d === this.ignoreModule) {
            return;
        }
        // if (d.isDependentOn(this)) {
        //     return;
        // }
        this.dependencies.push(d);
    };
    Module.prototype.getExports = function () {
        this.exports = this.emptyExports;
        if (this.factory) {
            var factory = this.factory;
            this.factory = null;
            delete this.factory;
            AmdLoader.instance.currentStack.push(this);
            var result = factory(this.require, this.exports);
            if (result) {
                if (typeof result === "object") {
                    for (var key in result) {
                        if (result.hasOwnProperty(key)) {
                            var element = result[key];
                            this.exports[key] = element;
                        }
                    }
                }
                else if (!this.exports.default) {
                    this.exports.default = result;
                }
            }
            AmdLoader.instance.currentStack.pop();
            delete this.factory;
            if (this.exports.default) {
                this.exports.default[UMD.nameSymbol] = this.name;
            }
        }
        return this.exports;
    };
    Module.nextID = 1;
    return Module;
}());
/// <reference path="./Promise.js"/>
/// <reference path="./ReflectMetadata.ts"/>
/// <reference path="./ArrayHelper.ts"/>
/// <reference path="./Module.ts"/>
if (typeof require !== "undefined") {
    md = require("module").Module;
}
var AmdLoader = /** @class */ (function () {
    function AmdLoader() {
        this.root = null;
        this.defaultUrl = null;
        this.currentStack = [];
        // public pendingModules: Module[] = [];
        // public resolverStack: Module[] = [];
        // only useful in node environment
        this.nodeModules = [];
        this.modules = {};
        this.pathMap = {};
        this.mockTypes = [];
        this.lastTimeout = null;
        this.dirty = false;
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
    AmdLoader.prototype.setupRoot = function (root, url) {
        for (var key in this.pathMap) {
            if (this.pathMap.hasOwnProperty(key)) {
                var moduleUrl = key === root ? url : url + "/node_modules/" + key;
                this.map(key, moduleUrl);
            }
        }
        this.defaultUrl = url + "/node_modules/";
    };
    AmdLoader.prototype.registerModule = function (name, moduleExports) {
        var m = this.get(name);
        m.package.url = "/";
        m.exports = __assign({ __esModule: true }, moduleExports);
        m.loader = Promise.resolve();
        m.resolver = Promise.resolve(m.exports);
        m.isLoaded = true;
        m.isResolved = true;
    };
    AmdLoader.prototype.setup = function (name) {
        var _this = this;
        var jsModule = this.get(name);
        // tslint:disable-next-line:ban-types
        var define = this.define;
        jsModule.loader = Promise.resolve();
        AmdLoader.current = jsModule;
        if (define) {
            define();
        }
        if (jsModule.exportVar) {
            jsModule.exports = AmdLoader.globalVar[jsModule.exportVar];
        }
        this.push(jsModule);
        jsModule.isLoaded = true;
        setTimeout(function () {
            _this.loadDependencies(jsModule);
        }, 1);
    };
    AmdLoader.prototype.loadDependencies = function (m) {
        var _this = this;
        this.resolveModule(m).catch(function (e) {
            // tslint:disable-next-line:no-console
            console.error(e);
        });
        if (m.dependencies.length) {
            var all = m.dependencies.map(function (m1) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (m1.isResolved) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.import(m1)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            Promise.all(all).catch(function (e) {
                // tslint:disable-next-line:no-console
                console.error(e);
            }).then(function () {
                m.resolve();
            });
        }
        else {
            m.resolve();
        }
        this.queueResolveModules(1);
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
        var t = this.mockTypes.find(function (tx) { return tx.type === type; });
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
                        var i = path.lastIndexOf("/");
                        var fname = path.substr(i + 1);
                        if (fname.indexOf(".") === -1) {
                            path = path + defExt;
                        }
                        // if (defExt && !path.endsWith(defExt)) {
                        //     path = path + defExt;
                        // }
                        return path;
                    }
                }
            }
            return name;
        }
        catch (e) {
            // tslint:disable-next-line:no-console
            console.error("Failed to resolve " + name + " with error " + JSON.stringify(e));
            // tslint:disable-next-line:no-console
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
        var _a = name.split("/", 3), scope = _a[0], packageName = _a[1];
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
                    url: this.defaultUrl ?
                        (this.defaultUrl + packageName) : undefined
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
                var m = resolvedModule.getExports();
                return m;
            };
            module.require.resolve = function (n) { return _this.resolveRelativePath(n, module.name); };
            this.modules[name_1] = module;
        }
        return module;
    };
    AmdLoader.prototype.import = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var module, e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof require !== "undefined") {
                            return [2 /*return*/, Promise.resolve(require(name))];
                        }
                        module = typeof name === "object" ? name : this.get(name);
                        return [4 /*yield*/, this.load(module)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.resolveModule(module)];
                    case 2:
                        e = _a.sent();
                        return [2 /*return*/, e];
                }
            });
        });
    };
    AmdLoader.prototype.load = function (module) {
        var _this = this;
        if (module.loader) {
            return module.loader;
        }
        this.push(module);
        if (AmdLoader.isMedia.test(module.url)) {
            var m = {
                url: module.url,
                toString: function () { return module.url; }
            };
            var e = { __esModule: true, default: m };
            module.exports = e;
            module.emptyExports = e;
            module.loader = Promise.resolve();
            module.isLoaded = true;
            return module.loader;
        }
        module.loader = new Promise(function (resolve, reject) {
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
                    module.isLoaded = true;
                    setTimeout(function () {
                        _this.loadDependencies(module);
                    }, 1);
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            }, function (error) {
                reject(error);
            });
        });
        return module.loader;
    };
    AmdLoader.prototype.resolveModule = function (module) {
        if (module.resolver) {
            return module.resolver;
        }
        module.resolver = this._resolveModule(module);
        return module.resolver;
    };
    AmdLoader.prototype.remove = function (m) {
        if (this.tail === m) {
            this.tail = m.previous;
        }
        if (m.next) {
            m.next.previous = m.previous;
        }
        if (m.previous) {
            m.previous.next = m.next;
        }
        m.next = null;
        m.previous = null;
        this.dirty = true;
        this.queueResolveModules();
    };
    AmdLoader.prototype.queueResolveModules = function (n) {
        var _this = this;
        if (n === void 0) { n = 1; }
        if (this.lastTimeout) {
            // clearTimeout(this.lastTimeout);
            // this.lastTimeout = null;
            return;
        }
        this.lastTimeout = setTimeout(function () {
            _this.lastTimeout = 0;
            _this.resolvePendingModules();
        }, n);
    };
    AmdLoader.prototype.resolvePendingModules = function () {
        if (!this.tail) {
            return;
        }
        this.dirty = false;
        // first resolve modules without any
        // dependencies
        var pending = [];
        var m = this.tail;
        while (m) {
            if (!m.dependencies.length) {
                m.resolve();
            }
            else {
                pending.push(m);
            }
            m = m.previous;
        }
        if (this.dirty) {
            this.dirty = false;
            return;
        }
        for (var _i = 0, pending_1 = pending; _i < pending_1.length; _i++) {
            var iterator = pending_1[_i];
            iterator.resolve();
        }
        if (this.dirty) {
            this.dirty = false;
            return;
        }
        if (this.tail) {
            this.queueResolveModules();
        }
    };
    AmdLoader.prototype.push = function (m) {
        if (this.tail) {
            m.previous = this.tail;
            this.tail.next = m;
        }
        this.tail = m;
    };
    AmdLoader.prototype._resolveModule = function (module) {
        return __awaiter(this, void 0, void 0, function () {
            var exports, pendingList, _i, pendingList_1, iterator, tasks, setHooks;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.root) {
                            this.root = module;
                        }
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                module.dependencyHooks = [resolve, reject];
                            })];
                    case 1:
                        _a.sent();
                        exports = module.getExports();
                        pendingList = this.mockTypes.filter(function (t) { return !t.loaded; });
                        if (!pendingList.length) return [3 /*break*/, 3];
                        for (_i = 0, pendingList_1 = pendingList; _i < pendingList_1.length; _i++) {
                            iterator = pendingList_1[_i];
                            iterator.loaded = true;
                        }
                        tasks = pendingList.map(function (iterator) { return __awaiter(_this, void 0, void 0, function () {
                            var containerModule, resolvedName, im, ex, type;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        containerModule = iterator.module;
                                        resolvedName = this.resolveRelativePath(iterator.moduleName, containerModule.name);
                                        im = this.get(resolvedName);
                                        im.ignoreModule = module;
                                        return [4 /*yield*/, this.import(im)];
                                    case 1:
                                        ex = _a.sent();
                                        type = ex[iterator.exportName];
                                        iterator.replaced = type;
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(tasks)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        setHooks = new Promise(function (resolve, reject) {
                            module.resolveHooks = [resolve, reject];
                        });
                        return [4 /*yield*/, setHooks];
                    case 4:
                        _a.sent();
                        if (this.root === module) {
                            this.root = null;
                            AmdLoader.moduleProgress(null, this.modules, "done");
                        }
                        module.isResolved = true;
                        return [2 /*return*/, exports];
                }
            });
        });
    };
    AmdLoader.isMedia = /\.(jpg|jpeg|gif|png|mp4|mp3|css|html|svg|json)$/i;
    AmdLoader.globalVar = {};
    AmdLoader.instance = new AmdLoader();
    AmdLoader.current = null;
    return AmdLoader;
}());
var a = AmdLoader.instance;
a.map("global", "/", "global");
a.registerModule("global/document", { default: document });
a.registerModule("global/window", { default: typeof window !== "undefined" ? window : global });
a.registerModule("reflect-metadata", Reflect);
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
    script.onerror = function (e) { error(e); };
    document.body.appendChild(script);
};
AmdLoader.moduleProgress = (function () {
    if (!document) {
        return function (name, p) {
            // tslint:disable-next-line:no-console
            console.log(name + " " + p + "%");
        };
    }
    var progressDiv = document.createElement("div");
    progressDiv.className = "web-atoms-progress-div";
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
// tslint:disable-next-line:no-var-keyword
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
        for (var _i = 0, requires_1 = requires; _i < requires_1.length; _i++) {
            var s = requires_1[_i];
            if (s === "require") {
                args.push(current.require);
                continue;
            }
            if (s === "exports") {
                args.push(current.emptyExports);
                continue;
            }
            if (/^global/.test(s)) {
                args.push(loader.get(s).exports);
            }
            var name_2 = loader.resolveRelativePath(s, current.name);
            var child = loader.get(name_2);
            current.addDependency(child);
        }
        // const fx = factory.bind(current, ... args);
        current.factory = function () {
            return factory.apply(current, args);
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
        this.defaultApp = "@web-atoms/core/dist/web/WebApp";
        this.lang = "en-US";
        this.nameSymbol = typeof Symbol !== "undefined" ? Symbol() : "_$_nameSymbol";
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
    UMDClass.prototype.setupRoot = function (name, url) {
        AmdLoader.instance.setupRoot(name, url);
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
                        return [4 /*yield*/, AmdLoader.instance.import("@web-atoms/core/dist/Atom")];
                    case 1:
                        a = _a.sent();
                        a.Atom.designMode = designMode;
                        return [4 /*yield*/, AmdLoader.instance.import("@web-atoms/core/dist/core/AtomList")];
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
                                        // tslint:disable-next-line:no-console
                                        console.error(e_2);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        // tslint:disable-next-line:no-console
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
                                        // tslint:disable-next-line:no-console
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