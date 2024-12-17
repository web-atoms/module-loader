var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function setupTSLib() {
    var __extends;
    var __assign;
    var __rest;
    var __decorate;
    var __param;
    var __esDecorate;
    var __runInitializers;
    var __propKey;
    var __setFunctionName;
    var __metadata;
    var __awaiter;
    var __generator;
    var __exportStar;
    var __values;
    var __read;
    var __spread;
    var __spreadArrays;
    var __spreadArray;
    var __await;
    var __asyncGenerator;
    var __asyncDelegator;
    var __asyncValues;
    var __makeTemplateObject;
    var __importStar;
    var __importDefault;
    var __classPrivateFieldGet;
    var __classPrivateFieldSet;
    var __classPrivateFieldIn;
    var __createBinding;
    var __addDisposableResource;
    var __disposeResources;
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p))
                d[p] = b[p]; };
    __extends = function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    __rest = function (s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    };
    __esDecorate = function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
        function accept(f) { if (f !== void 0 && typeof f !== "function")
            throw new TypeError("Function expected"); return f; }
        var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
        var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
        var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
        var _, done = false;
        for (var i = decorators.length - 1; i >= 0; i--) {
            var context = {};
            for (var p in contextIn)
                context[p] = p === "access" ? {} : contextIn[p];
            for (var p in contextIn.access)
                context.access[p] = contextIn.access[p];
            context.addInitializer = function (f) { if (done)
                throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
            var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
            if (kind === "accessor") {
                if (result === void 0)
                    continue;
                if (result === null || typeof result !== "object")
                    throw new TypeError("Object expected");
                if (_ = accept(result.get))
                    descriptor.get = _;
                if (_ = accept(result.set))
                    descriptor.set = _;
                if (_ = accept(result.init))
                    initializers.unshift(_);
            }
            else if (_ = accept(result)) {
                if (kind === "field")
                    initializers.unshift(_);
                else
                    descriptor[key] = _;
            }
        }
        if (target)
            Object.defineProperty(target, contextIn.name, descriptor);
        done = true;
    };
    __runInitializers = function (thisArg, initializers, value) {
        var useValue = arguments.length > 2;
        for (var i = 0; i < initializers.length; i++) {
            value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
        }
        return useValue ? value : void 0;
    };
    __propKey = function (x) {
        return typeof x === "symbol" ? x : "".concat(x);
    };
    __setFunctionName = function (f, name, prefix) {
        if (typeof name === "symbol")
            name = name.description ? "[".concat(name.description, "]") : "";
        return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
    };
    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    };
    __awaiter = function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    __exportStar = function (m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    };
    __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    __values = function (o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    };
    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    __spreadArrays = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    __spreadArray = function (to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };
    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
        function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
        function verb(n, f) { if (g[n]) {
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); };
            if (f)
                i[n] = f(i[n]);
        } }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    };
    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
    };
    __asyncValues = function (o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    };
    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    };
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    __importStar = function (mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
    __importDefault = function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    __classPrivateFieldGet = function (receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    __classPrivateFieldSet = function (receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    };
    __classPrivateFieldIn = function (state, receiver) {
        if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function"))
            throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
    };
    __addDisposableResource = function (env, value, async) {
        if (value !== null && value !== void 0) {
            if (typeof value !== "object" && typeof value !== "function")
                throw new TypeError("Object expected.");
            var dispose;
            if (async) {
                if (!Symbol.asyncDispose)
                    throw new TypeError("Symbol.asyncDispose is not defined.");
                dispose = value[Symbol.asyncDispose];
            }
            if (dispose === void 0) {
                if (!Symbol.dispose)
                    throw new TypeError("Symbol.dispose is not defined.");
                dispose = value[Symbol.dispose];
            }
            if (typeof dispose !== "function")
                throw new TypeError("Object not disposable.");
            env.stack.push({ value: value, dispose: dispose, async: async });
        }
        else if (async) {
            env.stack.push({ async: true });
        }
        return value;
    };
    var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };
    __disposeResources = function (env) {
        function fail(e) {
            env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        function next() {
            while (env.stack.length) {
                var rec = env.stack.pop();
                try {
                    var result = rec.dispose && rec.dispose.call(rec.value);
                    if (rec.async)
                        return Promise.resolve(result).then(next, function (e) { fail(e); return next(); });
                }
                catch (e) {
                    fail(e);
                }
            }
            if (env.hasError)
                throw env.error;
        }
        return next();
    };
    return {
        __extends,
        __assign,
        __rest,
        __decorate,
        __param,
        __esDecorate,
        __runInitializers,
        __propKey,
        __setFunctionName,
        __metadata,
        __awaiter,
        __generator,
        __exportStar,
        __values,
        __read,
        __spread,
        __spreadArrays,
        __spreadArray,
        __await,
        __asyncGenerator,
        __asyncDelegator,
        __asyncValues,
        __makeTemplateObject,
        __importStar,
        __importDefault,
        __classPrivateFieldGet,
        __classPrivateFieldSet,
        __classPrivateFieldIn,
        __createBinding,
        __addDisposableResource,
        __disposeResources,
    };
}
var Reflect;
(function (Reflect) {
    (function (factory) {
        const root = typeof global === "object" ? global :
            typeof self === "object" ? self :
                typeof this === "object" ? this :
                    Function("return this;")();
        let exporter = makeExporter(Reflect);
        if (typeof root.Reflect === "undefined") {
            root.Reflect = Reflect;
        }
        else {
            exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter);
        function makeExporter(target, previous) {
            return (key, value) => {
                if (typeof target[key] !== "function") {
                    Object.defineProperty(target, key, { configurable: true, writable: true, value });
                }
                if (previous)
                    previous(key, value);
            };
        }
    })(function (exporter) {
        const hasOwn = Object.prototype.hasOwnProperty;
        const supportsSymbol = typeof Symbol === "function";
        const toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        const iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        const supportsCreate = typeof Object.create === "function";
        const supportsProto = { __proto__: [] } instanceof Array;
        const downLevel = !supportsCreate && !supportsProto;
        const HashMap = {
            create: supportsCreate
                ? () => MakeDictionary(Object.create(null))
                : supportsProto
                    ? () => MakeDictionary({ __proto__: null })
                    : () => MakeDictionary({}),
            has: downLevel
                ? (map, key) => hasOwn.call(map, key)
                : (map, key) => key in map,
            get: downLevel
                ? (map, key) => hasOwn.call(map, key) ? map[key] : undefined
                : (map, key) => map[key],
        };
        const functionPrototype = Object.getPrototypeOf(Function);
        const usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
        const _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        const _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        const _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        const Metadata = new _WeakMap();
        function decorate(decorators, target, propertyKey, attributes) {
            if (!IsUndefined(propertyKey)) {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                    throw new TypeError();
                if (IsNull(attributes))
                    attributes = undefined;
                propertyKey = ToPropertyKey(propertyKey);
                return DecorateProperty(decorators, target, propertyKey, attributes);
            }
            else {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsConstructor(target))
                    throw new TypeError();
                return DecorateConstructor(decorators, target);
            }
        }
        exporter("decorate", decorate);
        function metadata(metadataKey, metadataValue) {
            function decorator(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                    throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            return decorator;
        }
        exporter("metadata", metadata);
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        function getOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        function getMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        function getOwnMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        function deleteMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            const metadataMap = GetOrCreateMetadataMap(target, propertyKey, false);
            if (IsUndefined(metadataMap))
                return false;
            if (!metadataMap.delete(metadataKey))
                return false;
            if (metadataMap.size > 0)
                return true;
            const targetMetadata = Metadata.get(target);
            targetMetadata.delete(propertyKey);
            if (targetMetadata.size > 0)
                return true;
            Metadata.delete(target);
            return true;
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
            for (let i = decorators.length - 1; i >= 0; --i) {
                const decorator = decorators[i];
                const decorated = decorator(target);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsConstructor(decorated))
                        throw new TypeError();
                    target = decorated;
                }
            }
            return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
            for (let i = decorators.length - 1; i >= 0; --i) {
                const decorator = decorators[i];
                const decorated = decorator(target, propertyKey, descriptor);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsObject(decorated))
                        throw new TypeError();
                    descriptor = decorated;
                }
            }
            return descriptor;
        }
        function GetOrCreateMetadataMap(O, P, Create) {
            let targetMetadata = Metadata.get(O);
            if (IsUndefined(targetMetadata)) {
                if (!Create)
                    return undefined;
                targetMetadata = new _Map();
                Metadata.set(O, targetMetadata);
            }
            let metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
                if (!Create)
                    return undefined;
                metadataMap = new _Map();
                targetMetadata.set(P, metadataMap);
            }
            return metadataMap;
        }
        function OrdinaryHasMetadata(MetadataKey, O, P) {
            const hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return true;
            const parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryHasMetadata(MetadataKey, parent, P);
            return false;
        }
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            const metadataMap = GetOrCreateMetadataMap(O, P, false);
            if (IsUndefined(metadataMap))
                return false;
            return ToBoolean(metadataMap.has(MetadataKey));
        }
        function OrdinaryGetMetadata(MetadataKey, O, P) {
            const hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return OrdinaryGetOwnMetadata(MetadataKey, O, P);
            const parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryGetMetadata(MetadataKey, parent, P);
            return undefined;
        }
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            const metadataMap = GetOrCreateMetadataMap(O, P, false);
            if (IsUndefined(metadataMap))
                return undefined;
            return metadataMap.get(MetadataKey);
        }
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            const metadataMap = GetOrCreateMetadataMap(O, P, true);
            metadataMap.set(MetadataKey, MetadataValue);
        }
        function OrdinaryMetadataKeys(O, P) {
            const ownKeys = OrdinaryOwnMetadataKeys(O, P);
            const parent = OrdinaryGetPrototypeOf(O);
            if (parent === null)
                return ownKeys;
            const parentKeys = OrdinaryMetadataKeys(parent, P);
            if (parentKeys.length <= 0)
                return ownKeys;
            if (ownKeys.length <= 0)
                return parentKeys;
            const set = new _Set();
            const keys = [];
            for (const key of ownKeys) {
                const hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            for (const key of parentKeys) {
                const hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            return keys;
        }
        function OrdinaryOwnMetadataKeys(O, P) {
            const keys = [];
            const metadataMap = GetOrCreateMetadataMap(O, P, false);
            if (IsUndefined(metadataMap))
                return keys;
            const keysObj = metadataMap.keys();
            const iterator = GetIterator(keysObj);
            let k = 0;
            while (true) {
                const next = IteratorStep(iterator);
                if (!next) {
                    keys.length = k;
                    return keys;
                }
                const nextValue = IteratorValue(next);
                try {
                    keys[k] = nextValue;
                }
                catch (e) {
                    try {
                        IteratorClose(iterator);
                    }
                    finally {
                        throw e;
                    }
                }
                k++;
            }
        }
        function Type(x) {
            if (x === null)
                return 1;
            switch (typeof x) {
                case "undefined": return 0;
                case "boolean": return 2;
                case "string": return 3;
                case "symbol": return 4;
                case "number": return 5;
                case "object": return x === null ? 1 : 6;
                default: return 6;
            }
        }
        function IsUndefined(x) {
            return x === undefined;
        }
        function IsNull(x) {
            return x === null;
        }
        function IsSymbol(x) {
            return typeof x === "symbol";
        }
        function IsObject(x) {
            return typeof x === "object" ? x !== null : typeof x === "function";
        }
        function ToPrimitive(input, PreferredType) {
            switch (Type(input)) {
                case 0: return input;
                case 1: return input;
                case 2: return input;
                case 3: return input;
                case 4: return input;
                case 5: return input;
            }
            const hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
            const exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (exoticToPrim !== undefined) {
                const result = exoticToPrim.call(input, hint);
                if (IsObject(result))
                    throw new TypeError();
                return result;
            }
            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        function OrdinaryToPrimitive(O, hint) {
            if (hint === "string") {
                const toString = O.toString;
                if (IsCallable(toString)) {
                    const result = toString.call(O);
                    if (!IsObject(result))
                        return result;
                }
                const valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    const result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            else {
                const valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    const result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
                const toString = O.toString;
                if (IsCallable(toString)) {
                    const result = toString.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            throw new TypeError();
        }
        function ToBoolean(argument) {
            return !!argument;
        }
        function ToString(argument) {
            return "" + argument;
        }
        function ToPropertyKey(argument) {
            const key = ToPrimitive(argument, 3);
            if (IsSymbol(key))
                return key;
            return ToString(key);
        }
        function IsArray(argument) {
            return Array.isArray
                ? Array.isArray(argument)
                : argument instanceof Object
                    ? argument instanceof Array
                    : Object.prototype.toString.call(argument) === "[object Array]";
        }
        function IsCallable(argument) {
            return typeof argument === "function";
        }
        function IsConstructor(argument) {
            return typeof argument === "function";
        }
        function IsPropertyKey(argument) {
            switch (Type(argument)) {
                case 3: return true;
                case 4: return true;
                default: return false;
            }
        }
        function GetMethod(V, P) {
            const func = V[P];
            if (func === undefined || func === null)
                return undefined;
            if (!IsCallable(func))
                throw new TypeError();
            return func;
        }
        function GetIterator(obj) {
            const method = GetMethod(obj, iteratorSymbol);
            if (!IsCallable(method))
                throw new TypeError();
            const iterator = method.call(obj);
            if (!IsObject(iterator))
                throw new TypeError();
            return iterator;
        }
        function IteratorValue(iterResult) {
            return iterResult.value;
        }
        function IteratorStep(iterator) {
            const result = iterator.next();
            return result.done ? false : result;
        }
        function IteratorClose(iterator) {
            const f = iterator["return"];
            if (f)
                f.call(iterator);
        }
        function OrdinaryGetPrototypeOf(O) {
            const proto = Object.getPrototypeOf(O);
            if (typeof O !== "function" || O === functionPrototype)
                return proto;
            if (proto !== functionPrototype)
                return proto;
            const prototype = O.prototype;
            const prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (prototypeProto == null || prototypeProto === Object.prototype)
                return proto;
            const constructor = prototypeProto.constructor;
            if (typeof constructor !== "function")
                return proto;
            if (constructor === O)
                return proto;
            return constructor;
        }
        function CreateMapPolyfill() {
            const cacheSentinel = {};
            const arraySentinel = [];
            class MapIterator {
                constructor(keys, values, selector) {
                    this._index = 0;
                    this._keys = keys;
                    this._values = values;
                    this._selector = selector;
                }
                "@@iterator"() { return this; }
                [iteratorSymbol]() { return this; }
                next() {
                    const index = this._index;
                    if (index >= 0 && index < this._keys.length) {
                        const result = this._selector(this._keys[index], this._values[index]);
                        if (index + 1 >= this._keys.length) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        else {
                            this._index++;
                        }
                        return { value: result, done: false };
                    }
                    return { value: undefined, done: true };
                }
                throw(error) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    throw error;
                }
                return(value) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    return { value: value, done: true };
                }
            }
            return class Map {
                constructor() {
                    this._keys = [];
                    this._values = [];
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                }
                get size() { return this._keys.length; }
                has(key) { return this._find(key, false) >= 0; }
                get(key) {
                    const index = this._find(key, false);
                    return index >= 0 ? this._values[index] : undefined;
                }
                set(key, value) {
                    const index = this._find(key, true);
                    this._values[index] = value;
                    return this;
                }
                delete(key) {
                    const index = this._find(key, false);
                    if (index >= 0) {
                        const size = this._keys.length;
                        for (let i = index + 1; i < size; i++) {
                            this._keys[i - 1] = this._keys[i];
                            this._values[i - 1] = this._values[i];
                        }
                        this._keys.length--;
                        this._values.length--;
                        if (key === this._cacheKey) {
                            this._cacheKey = cacheSentinel;
                            this._cacheIndex = -2;
                        }
                        return true;
                    }
                    return false;
                }
                clear() {
                    this._keys.length = 0;
                    this._values.length = 0;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                }
                keys() { return new MapIterator(this._keys, this._values, getKey); }
                values() { return new MapIterator(this._keys, this._values, getValue); }
                entries() { return new MapIterator(this._keys, this._values, getEntry); }
                "@@iterator"() { return this.entries(); }
                [iteratorSymbol]() { return this.entries(); }
                _find(key, insert) {
                    if (this._cacheKey !== key) {
                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                    }
                    if (this._cacheIndex < 0 && insert) {
                        this._cacheIndex = this._keys.length;
                        this._keys.push(key);
                        this._values.push(undefined);
                    }
                    return this._cacheIndex;
                }
            };
            function getKey(key, _) {
                return key;
            }
            function getValue(_, value) {
                return value;
            }
            function getEntry(key, value) {
                return [key, value];
            }
        }
        function CreateSetPolyfill() {
            return class Set {
                constructor() {
                    this._map = new _Map();
                }
                get size() { return this._map.size; }
                has(value) { return this._map.has(value); }
                add(value) { return this._map.set(value, value), this; }
                delete(value) { return this._map.delete(value); }
                clear() { this._map.clear(); }
                keys() { return this._map.keys(); }
                values() { return this._map.values(); }
                entries() { return this._map.entries(); }
                "@@iterator"() { return this.keys(); }
                [iteratorSymbol]() { return this.keys(); }
            };
        }
        function CreateWeakMapPolyfill() {
            const UUID_SIZE = 16;
            const keys = HashMap.create();
            const rootKey = CreateUniqueKey();
            return class WeakMap {
                constructor() {
                    this._key = CreateUniqueKey();
                }
                has(target) {
                    const table = GetOrCreateWeakMapTable(target, false);
                    return table !== undefined ? HashMap.has(table, this._key) : false;
                }
                get(target) {
                    const table = GetOrCreateWeakMapTable(target, false);
                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
                }
                set(target, value) {
                    const table = GetOrCreateWeakMapTable(target, true);
                    table[this._key] = value;
                    return this;
                }
                delete(target) {
                    const table = GetOrCreateWeakMapTable(target, false);
                    return table !== undefined ? delete table[this._key] : false;
                }
                clear() {
                    this._key = CreateUniqueKey();
                }
            };
            function CreateUniqueKey() {
                let key;
                do
                    key = "@@WeakMap@@" + CreateUUID();
                while (HashMap.has(keys, key));
                keys[key] = true;
                return key;
            }
            function GetOrCreateWeakMapTable(target, create) {
                if (!hasOwn.call(target, rootKey)) {
                    if (!create)
                        return undefined;
                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
                }
                return target[rootKey];
            }
            function FillRandomBytes(buffer, size) {
                for (let i = 0; i < size; ++i)
                    buffer[i] = Math.random() * 0xff | 0;
                return buffer;
            }
            function GenRandomBytes(size) {
                if (typeof Uint8Array === "function") {
                    if (typeof crypto !== "undefined")
                        return crypto.getRandomValues(new Uint8Array(size));
                    if (typeof msCrypto !== "undefined")
                        return msCrypto.getRandomValues(new Uint8Array(size));
                    return FillRandomBytes(new Uint8Array(size), size);
                }
                return FillRandomBytes(new Array(size), size);
            }
            function CreateUUID() {
                const data = GenRandomBytes(UUID_SIZE);
                data[6] = data[6] & 0x4f | 0x40;
                data[8] = data[8] & 0xbf | 0x80;
                let result = "";
                for (let offset = 0; offset < UUID_SIZE; ++offset) {
                    const byte = data[offset];
                    if (offset === 4 || offset === 6 || offset === 8)
                        result += "-";
                    if (byte < 16)
                        result += "0";
                    result += byte.toString(16).toLowerCase();
                }
                return result;
            }
        }
        function MakeDictionary(obj) {
            obj.__ = undefined;
            delete obj.__;
            return obj;
        }
    });
})(Reflect || (Reflect = {}));
if (!Array.prototype.find) {
    Array.prototype.find = function (predicate, thisArg) {
        for (let i = 0; i < this.length; i++) {
            const item = this[i];
            if (predicate(item, i, this)) {
                return item;
            }
        }
    };
}
if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function (predicate, thisArg) {
        for (let i = 0; i < this.length; i++) {
            const item = this[i];
            if (predicate(item, i, this)) {
                return i;
            }
        }
        return -1;
    };
}
if (!Array.prototype.map) {
    Array.prototype.map = function (callbackfn, thisArg) {
        const a = [];
        for (let i = 0; i < this.length; i++) {
            const r = callbackfn(this[i], i, this);
            if (r !== undefined) {
                a.push(r);
            }
        }
        return a;
    };
}
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, endPosition) {
        const index = this.indexOf(searchString, endPosition);
        return index === 0;
    };
}
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchString, endPosition) {
        const index = this.lastIndexOf(searchString, endPosition);
        if (index === -1) {
            return false;
        }
        const l = this.length - index;
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
        Element.prototype["remove"] = function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }
}
const currentModuleSymbol = Symbol("currentModule");
class Module {
    get url() {
        const u = AmdLoader.instance.resolveSource(this.name);
        Object.defineProperty(this, "url", { value: u, enumerable: true });
        return u;
    }
    get meta() {
        return {
            url: this.url,
            resolve: this.require.resolve
        };
    }
    get filename() {
        return this.name;
    }
    constructor(name, folder) {
        this.name = name;
        this.folder = folder;
        this.emptyExports = {};
        this.packed = false;
        this.isLoaded = false;
        this.isResolved = false;
        this.dependencies = [];
        this.rID = null;
        const index = name.lastIndexOf("/");
        if (index === -1) {
            this.folder = "";
        }
        else {
            this.folder = name.substring(0, index);
        }
        this.exports = this.emptyExports;
    }
    import(name) {
        const resolvedName = this.require.resolve(name);
        return AmdLoader.instance.import(resolvedName);
    }
    addDependency(d) {
        this.dependencies.push(d);
        if (UMD.debug) {
            if (d.isDependentOn(this)) {
                console.warn(`${d.name} already depends on ${this.name}`);
            }
        }
    }
    getExports() {
        if (this.factory) {
            try {
                const factory = this.factory;
                this.factory = null;
                delete this.factory;
                AmdLoader.instance.currentStack.push(this);
                const result = factory(this.require, this.exports);
                if (result) {
                    if (typeof result === "object" || typeof result === "function") {
                        this.exports = result;
                        if (typeof result.default === "undefined") {
                            result.default = result;
                        }
                    }
                    else if (!this.exports.default) {
                        this.exports.default = result;
                    }
                }
                AmdLoader.instance.currentStack.pop();
                delete this.factory;
                const def = this.exports.default;
                if (typeof def === "function" || typeof def === "object") {
                    def[UMD.nameSymbol] = this.name;
                }
            }
            catch (e) {
                const em = e.stack ? (`${e}\n${e.stack}`) : e;
                const s = [];
                console.error(e);
                for (const iterator of AmdLoader.instance.currentStack) {
                    s.push(iterator.name);
                    console.error(iterator.name);
                }
                const ne = new Error(`Failed loading module ${this.name} with error ${em}\nDependents: ${s.join("\n\t")}`);
                console.error(ne);
                throw ne;
            }
        }
        return this.exports;
    }
    isDependentOn(m, visited) {
        visited !== null && visited !== void 0 ? visited : (visited = new Set());
        visited.add(this);
        for (const iterator of this.dependencies) {
            if (iterator === m) {
                return true;
            }
            if (visited.has(iterator)) {
                continue;
            }
            if (iterator.isDependentOn(m, visited)) {
                return true;
            }
        }
        return false;
    }
}
Module.nextID = 1;
var _a;
if (typeof require !== "undefined") {
    md = require("module").Module;
}
const promiseDone = Promise.resolve(0);
class AmdLoader {
    constructor() {
        this.root = null;
        this.defaultUrl = null;
        this.currentStack = [];
        this.nodeModules = [];
        this.modules = new Map();
        this.pathMap = new Map();
        this.mockTypes = [];
    }
    register(packages, modules) {
        for (const iterator of packages) {
            if (!this.pathMap.has(iterator)) {
                this.map(iterator, "/");
            }
        }
        for (const iterator of modules) {
            this.get(iterator);
        }
    }
    setupRoot(root, url) {
        if (url.endsWith("/")) {
            url = url.substring(0, url.length - 1);
        }
        for (const key of this.pathMap.keys()) {
            const moduleUrl = key === root ? url : `${url}/node_modules/${key}`;
            this.map(key, moduleUrl);
        }
        this.defaultUrl = `${url}/node_modules/`;
    }
    registerModule(name, moduleExports) {
        const m = this.get(name);
        m.package.url = "/";
        m.exports = Object.assign({ __esModule: true }, moduleExports);
        m.loader = promiseDone;
        m.resolver = () => Promise.resolve(m.exports);
        m.isLoaded = true;
        m.isResolved = true;
    }
    setup(name) {
        const jsModule = this.get(name);
        jsModule.packed = true;
        AmdLoader.current = jsModule;
    }
    replace(type, name, mock) {
        if (mock && !this.enableMock) {
            return;
        }
        const peek = this.currentStack.length ? this.currentStack[this.currentStack.length - 1] : undefined;
        name = this.resolveRelativePath(name, peek.name);
        const rt = new MockType(peek, type, name, mock);
        rt.replacedModule = this.get(rt.moduleName);
        rt.replacedModule.postExports = () => {
            rt.replaced = rt.replacedModule.getExports()[rt.exportName];
        };
        (peek.dynamicImports = peek.dynamicImports || []).push(rt);
        this.mockTypes.push(rt);
    }
    resolveType(type) {
        const t = this.mockTypes.find((tx) => tx.type === type);
        return t ? t.replaced : type;
    }
    map(packageName, packageUrl, type = "amd", exportVar) {
        let existing = this.pathMap.get(packageName);
        if (existing) {
            existing.url = packageUrl;
            existing.exportVar = exportVar;
            existing.type = type;
            return existing;
        }
        existing = {
            name: packageName,
            url: packageUrl,
            type,
            exportVar,
            version: ""
        };
        if (packageName === "reflect-metadata") {
            type = "global";
        }
        this.pathMap.set(packageName, existing);
        return existing;
    }
    resolveSource(name, defExt = ".js") {
        try {
            if (/^((\/)|((http|https)\:\/\/))/i.test(name)) {
                return name;
            }
            let path = null;
            for (const key of this.pathMap.keys()) {
                const packageName = key;
                if (name.startsWith(packageName)) {
                    path = this.pathMap.get(key).url;
                    if (name.length !== packageName.length) {
                        if (name[packageName.length] !== "/") {
                            continue;
                        }
                        name = name.substring(packageName.length + 1);
                    }
                    else {
                        return path;
                    }
                    if (path.endsWith("/")) {
                        path = path.substring(0, path.length - 1);
                    }
                    path = path + "/" + name;
                    const i = name.lastIndexOf("/");
                    const fileName = name.substring(i + 1);
                    if (!/\.(js|mjs|jpg|jpeg|gif|png|mp4|mp3|css|less|scss|html|svg|webp|webm|json)$/i.test(fileName)) {
                        path = path + defExt;
                    }
                    return path;
                }
            }
            return name;
        }
        catch (e) {
            console.error(`Failed to resolve ${name} with error ${JSON.stringify(e)}`);
            console.error(e);
        }
    }
    resolveRelativePath(name, currentPackage) {
        if (name.charAt(0) !== ".") {
            return name;
        }
        const tokens = name.split("/");
        const currentTokens = currentPackage.split("/");
        currentTokens.pop();
        while (tokens.length) {
            const first = tokens[0];
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
        return `${currentTokens.join("/")}/${tokens.join("/")}`;
    }
    getPackageVersion(name) {
        let [scope, packageName] = name.split("/", 3);
        let version = "";
        if (scope[0] !== "@") {
            packageName = scope;
            scope = "";
        }
        else {
            scope += "/";
        }
        const versionTokens = packageName.split("@");
        if (versionTokens.length > 1) {
            version = versionTokens[1];
            name = name.replace("@" + version, "");
        }
        packageName = scope + packageName;
        return { packageName, version, name };
    }
    get(name1) {
        let module = this.modules.get(name1);
        if (!module) {
            const { packageName, version, name } = this.getPackageVersion(name1);
            module = new Module(name);
            this.modules.set(name1, module);
            let pp = this.pathMap.get(packageName);
            if (!pp) {
                pp = {
                    type: "amd",
                    name: packageName,
                    version,
                    url: this.defaultUrl ?
                        (this.defaultUrl + packageName) : undefined
                };
                this.pathMap.set(packageName, pp);
            }
            module.package = pp;
            module.require = (n, resolve, reject) => {
                let isAsync = false;
                if (typeof n !== "string") {
                    n = n[0];
                    isAsync = true;
                }
                const an = this.resolveRelativePath(n, module.name);
                const resolvedModule = this.get(an);
                if (isAsync) {
                    return this.import(resolvedModule).then(resolve, reject);
                }
                const m = resolvedModule.getExports();
                return m;
            };
            module.require.resolve = (n) => this.resolveRelativePath(n, module.name);
            this.modules.set(name, module);
        }
        return module;
    }
    import(name) {
        var _a;
        const module = typeof name === "object" ? name : this.get(name);
        if (module.importPromise) {
            return module.importPromise;
        }
        const m = this.importNodeModule(module);
        if (m) {
            return m;
        }
        return (_a = module.importPromise) !== null && _a !== void 0 ? _a : (module.importPromise = module.isResolved ? Promise.resolve(module.getExports()) : this.importAsync(module));
    }
    importNodeModule(module) {
        if (typeof require !== "undefined") {
            const name = module.url;
            const moduleCode = require("fs").readFileSync(require.resolve(name), "utf8").trim();
            if (!/^System\.Register/.test(moduleCode)) {
                return Promise.resolve(require(name));
            }
        }
    }
    importAsync(module) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.load(module);
            if (module.resolver) {
                return yield module.resolver();
            }
            return yield this.resolve(module);
        });
    }
    resolve(module) {
        return __awaiter(this, void 0, void 0, function* () {
            const ds = [];
            if (UMD.debug) {
                const waiting = module.waiting = [];
                for (const iterator of module.dependencies) {
                    if (iterator.isResolved
                        || (iterator.importPromise && iterator.isDependentOn(module))) {
                        continue;
                    }
                    waiting.push(iterator);
                    ds.push(this.import(iterator));
                }
            }
            else {
                for (const iterator of module.dependencies) {
                    if (iterator.isResolved
                        || (iterator.importPromise && iterator.isDependentOn(module))) {
                        continue;
                    }
                    ds.push(this.import(iterator));
                }
            }
            yield Promise.all(ds);
            const exports = module.getExports();
            module.isResolved = true;
            if (module.postExports) {
                module.postExports();
            }
            if (module.dynamicImports) {
                for (const iterator of module.dynamicImports) {
                    if (iterator.replacedModule.importPromise) {
                        continue;
                    }
                    yield this.import(iterator.replacedModule);
                }
            }
            return exports;
        });
    }
    load(module) {
        if (module.loader) {
            return module.loader;
        }
        if (AmdLoader.isJson.test(module.url)) {
            const mUrl = module.url.startsWith(module.package.url) ? module.url : module.package.url + module.url;
            module.loader = new Promise((resolve, reject) => {
                try {
                    AmdLoader.httpTextLoader(mUrl, (r) => {
                        try {
                            module.exports = JSON.parse(r);
                            module.emptyExports = module.exports;
                            module.isLoaded = true;
                            resolve();
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, reject);
                }
                catch (e1) {
                    reject(e1);
                }
            });
            return module.loader;
        }
        if (AmdLoader.isCss.test(module.url)) {
            const m = {
                get url() {
                    var _a;
                    let mUrl = !module.url.startsWith(module.package.url)
                        ? (module.package.url + module.url)
                        : module.url;
                    const [_, g1] = (_a = /\.((global|local)[^\.]{0,10})\.(css|less|scss)$/i.exec(mUrl)) !== null && _a !== void 0 ? _a : [];
                    let segment = g1 !== null && g1 !== void 0 ? g1 : "local-high";
                    if (!/^(global|local)/.test(segment)) {
                        segment = "local-high";
                    }
                    if (!/\.css$/i.test(mUrl)) {
                        mUrl += ".css";
                    }
                    if (!module.packed) {
                        window.installStyleSheet(mUrl);
                    }
                    return mUrl;
                },
                toString() {
                    return this.url;
                }
            };
            const e = {
                __esModule: true,
                default: m.url
            };
            module.exports = e;
            module.emptyExports = e;
            module.loader = promiseDone;
            module.isLoaded = true;
            return module.loader;
        }
        if (AmdLoader.isMedia.test(module.url)) {
            const m = {
                get url() {
                    const mUrl = !module.url.startsWith(module.package.url)
                        ? (module.package.url + module.url)
                        : module.url;
                    Object.defineProperty(m, "url", { value: mUrl, enumerable: true });
                    return mUrl;
                },
                toString() {
                    return this.url;
                }
            };
            const e = { __esModule: true, default: m };
            module.exports = e;
            module.emptyExports = e;
            module.loader = promiseDone;
            module.isLoaded = true;
            return module.loader;
        }
        module.loader = new Promise((resolve, reject) => {
            const script = AmdLoader.moduleLoader(module.name, module.url, () => {
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
                        AmdLoader.moduleProgress(module.name, this.modules, "loading");
                    }
                    module.isLoaded = true;
                    resolve();
                }
                catch (e) {
                    console.error(e);
                    reject(e);
                }
            }, (error) => {
                reject(error);
            });
            script[currentModuleSymbol] = module;
        });
        return module.loader;
    }
}
AmdLoader.isMedia = /\.(jpg|jpeg|gif|png|mp4|mp3|css|less|scss|html|svg|webp|webm)$/i;
AmdLoader.isCss = /\.(css|less|scss)$/i;
AmdLoader.isJson = /\.json$/i;
AmdLoader.globalVar = {};
AmdLoader.instance = new AmdLoader();
AmdLoader.current = null;
const a = AmdLoader.instance;
a.map("global", "/", "global");
a.registerModule("global/document", { default: document });
a.registerModule("global/window", { default: typeof window !== "undefined" ? window : global });
a.map("reflect-metadata", "/", "global");
a.registerModule("reflect-metadata", Reflect);
AmdLoader.moduleLoader = (name, url, success, error) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    const s = script;
    script.onload = s.onreadystatechange = () => {
        if ((s.readyState && s.readyState !== "complete" && s.readyState !== "loaded")) {
            return;
        }
        script.onload = s.onreadystatechange = null;
        success();
    };
    script.onerror = (e) => { error(e); };
    document.body.appendChild(script);
    return script;
};
AmdLoader.httpTextLoader = (url, success, error) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                success(xhr.responseText);
            }
            else {
                error(xhr.responseText);
            }
        }
    };
    xhr.open("GET", url);
    xhr.send();
};
var amdConfig;
amdConfig !== null && amdConfig !== void 0 ? amdConfig : (amdConfig = {});
(_a = amdConfig.moduleProgress) !== null && _a !== void 0 ? _a : (amdConfig.moduleProgress = (() => {
    if (!document) {
        return (name, p) => {
            console.log(`${name} ${p}%`);
        };
    }
    return (name, n, status) => {
    };
})());
AmdLoader.moduleProgress = amdConfig.moduleProgress;
var define = (requiresOrFactory, factory, nested) => {
    const loader = AmdLoader.instance;
    function bindFactory(module, requireList, fx) {
        if (module.factory) {
            return;
        }
        module.dependencies = [];
        let requires = requireList;
        requires = requireList;
        const args = [];
        for (const s of requires) {
            if (s === "require") {
                args.push(module.require);
                continue;
            }
            if (s === "exports") {
                args.push(module.emptyExports);
                continue;
            }
            if (/^global/.test(s)) {
                args.push(loader.get(s).exports);
            }
            const name = loader.resolveRelativePath(s, module.name);
            const child = loader.get(name);
            module.addDependency(child);
        }
        module.factory = () => {
            return fx.apply(module, args);
        };
    }
    if (nested) {
        const name = requiresOrFactory;
        const rList = factory;
        const f = nested;
        const module = AmdLoader.instance.get(name);
        bindFactory(module, rList, f);
        return;
    }
    AmdLoader.instance.define = () => {
        var _a;
        if (!AmdLoader.current) {
            const amdModule = (_a = document.currentScript) === null || _a === void 0 ? void 0 : _a[currentModuleSymbol];
            if (amdModule) {
                AmdLoader.current = amdModule;
            }
        }
        const current = AmdLoader.current;
        if (!current) {
            return;
        }
        if (current.factory) {
            return;
        }
        if (typeof requiresOrFactory === "function") {
            bindFactory(current, [], requiresOrFactory);
        }
        else {
            bindFactory(current, requiresOrFactory, factory);
        }
    };
};
define.amd = {};
class MockType {
    constructor(module, type, name, mock, moduleName, exportName) {
        this.module = module;
        this.type = type;
        this.name = name;
        this.mock = mock;
        this.moduleName = moduleName;
        this.exportName = exportName;
        this.name = name = name
            .replace("{lang}", UMD.lang)
            .replace("{platform}", UMD.viewPrefix);
        if (name.indexOf("$") !== -1) {
            const tokens = name.split("$");
            this.moduleName = tokens[0];
            this.exportName = tokens[1] || tokens[0].split("/").pop();
        }
        else {
            this.moduleName = name;
            this.exportName = "default";
        }
    }
}
const merge = (target, source) => {
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
        }
    }
};
const enumerable = true, configurable = true;
class System {
    static resolve(id) {
        return AmdLoader.instance.resolveSource(id);
    }
    static import(name) {
        return AmdLoader.instance.import(name);
    }
    static register(nameOrImports, importsOrSetup, setup) {
        var _a, _b;
        const instance = AmdLoader.instance;
        const currentModule = (_b = (_a = document.currentScript) === null || _a === void 0 ? void 0 : _a[currentModuleSymbol]) !== null && _b !== void 0 ? _b : AmdLoader.current;
        const name = typeof nameOrImports === "string"
            ? nameOrImports
            : void 0;
        let imports = importsOrSetup;
        if (arguments.length === 2) {
            imports = nameOrImports;
            setup = importsOrSetup;
        }
        const module = name ? instance.get(name) : currentModule;
        if (module.packed) {
            for (const d of imports) {
                const absolutePath = module.require.resolve(d);
                const dm = instance.get(absolutePath);
                if (/\.(css|less)$/i.test(absolutePath)) {
                    dm.packed = true;
                    continue;
                }
                module.dependencies.push(dm);
            }
        }
        else {
            for (const d of imports) {
                const absolutePath = module.require.resolve(d);
                const dm = instance.get(absolutePath);
                module.dependencies.push(dm);
            }
        }
        module.isLoaded = true;
        if (module.exportVar) {
            module.exports = AmdLoader.globalVar[module.exportVar];
        }
        module.setup = setup;
        module.loader = promiseDone;
        const r = module.setup((key, value) => {
            if (typeof key === "object") {
                merge(module.exports, key);
                return module.exports;
            }
            module.exports[key] = value;
            return value;
        }, module);
        module.resolver = () => __awaiter(this, void 0, void 0, function* () {
            const ds = [];
            let isCircularDependency;
            for (const iterator of module.dependencies) {
                if (iterator.isResolved) {
                    continue;
                }
                if (iterator.isDependentOn(module)) {
                    isCircularDependency = true;
                    continue;
                }
                ds.push(this.import(iterator));
            }
            yield Promise.all(ds);
            if (isCircularDependency) {
                yield new Promise((resolve) => setTimeout(resolve, 1));
            }
            const { setters } = r;
            var list = module.dependencies;
            for (let index = 0; index < list.length; index++) {
                const element = list[index];
                setters[index](element.getExports());
            }
            const rp = r.execute();
            module.isResolved = true;
            if (rp === null || rp === void 0 ? void 0 : rp.then) {
                yield rp;
            }
            module.getExports();
            if (module.postExports) {
                module.postExports();
            }
            if (module.dynamicImports) {
                for (const iterator of module.dynamicImports) {
                    if (iterator.replacedModule.importPromise) {
                        continue;
                    }
                    yield this.import(iterator.replacedModule);
                }
            }
            return module.exports;
        });
        return module;
    }
}
const globalNS = (typeof window !== "undefined" ? window : global);
class UMDClass {
    constructor() {
        this.debug = false;
        this.viewPrefix = "web";
        this.defaultApp = "@web-atoms/core/dist/web/WebApp";
        this.lang = "en-US";
        this.nameSymbol = typeof Symbol !== "undefined" ? Symbol() : "_$_nameSymbol";
    }
    get mock() {
        return AmdLoader.instance.enableMock;
    }
    set mock(v) {
        AmdLoader.instance.enableMock = v;
    }
    resolvePath(n) {
        return AmdLoader.instance.resolveSource(n, null);
    }
    resolveViewPath(path) {
        return path.replace("{platform}", this.viewPrefix);
    }
    resolveType(type) {
        return AmdLoader.instance.resolveType(type);
    }
    map(name, path, type = "amd", exportVar) {
        AmdLoader.instance.map(name, path, type, exportVar);
    }
    setupRoot(name, url) {
        AmdLoader.instance.setupRoot(name, url);
    }
    mockType(type, name) {
        AmdLoader.instance.replace(type, name, true);
    }
    inject(type, name) {
        AmdLoader.instance.replace(type, name, false);
    }
    resolveViewClassAsync(path) {
        return __awaiter(this, void 0, void 0, function* () {
            path = this.resolveViewPath(path);
            const e = yield AmdLoader.instance.import(path);
            return e.default;
        });
    }
    import(path) {
        return AmdLoader.instance.import(path);
    }
    load(path, designMode) {
        return __awaiter(this, void 0, void 0, function* () {
            this.mock = designMode;
            const t = yield AmdLoader.instance.import("@web-atoms/core/dist/core/types");
            const a = yield AmdLoader.instance.import("@web-atoms/core/dist/Atom");
            a.Atom.designMode = designMode;
            const al = yield AmdLoader.instance.import("@web-atoms/core/dist/core/AtomList");
            return yield AmdLoader.instance.import(path);
        });
    }
    hostView(id, path, designMode) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                this.mock = designMode;
                AmdLoader.instance.get(path);
                const m = yield this.load(this.defaultApp, designMode);
                const app = ((_a = globalNS.webApp) !== null && _a !== void 0 ? _a : (globalNS.webApp = new (m.default)()));
                yield app.initPromise;
                const viewClass = yield AmdLoader.instance.import(path);
                const view = new (viewClass.default)(app);
                const element = typeof id === "string" ? document.getElementById(id) : id;
                element.appendChild(view.element);
                return view;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    loadView(path, designMode, appPath) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                this.mock = designMode;
                appPath = appPath || this.defaultApp;
                AmdLoader.instance.get(path);
                const m = yield this.load(appPath, designMode);
                const app = ((_a = globalNS.webApp) !== null && _a !== void 0 ? _a : (globalNS.webApp = new (m.default)()));
                yield app.initPromise;
                const viewClass = yield AmdLoader.instance.import(path);
                const view = new (viewClass.default)(app);
                app.root = view;
                return view;
            }
            catch (er) {
                console.error(er);
                throw er;
            }
        });
    }
    installStyleSheet(path, imports = {}) {
    }
}
const UMD = new UMDClass();
((u) => {
    globalNS.UMD = u;
    globalNS.AmdLoader = AmdLoader;
    globalNS.System = System;
    AmdLoader.instance.registerModule("tslib", setupTSLib());
})(UMD);
if (window) {
    let first = document.head.firstElementChild;
    const markers = {};
    const addMarker = (name) => {
        const m = document.createElement("meta");
        m.name = name + "-marker";
        if (first) {
            first.insertAdjacentElement("afterend", m);
        }
        else {
            document.head.insertAdjacentElement("afterbegin", m);
        }
        first = m;
        markers[name] = m;
        return m;
    };
    addMarker("global-low");
    addMarker("global");
    addMarker("global-high");
    addMarker("local-low");
    addMarker("local");
    addMarker("local-high");
    window.installStyleSheet = UMD.installStyleSheet = (path, { imports } = {}) => {
        var _a, _b;
        const [_, g1] = (_a = /\.((global|local)[^\.]{0,10})\.(css|less|scss)$/i.exec(path)) !== null && _a !== void 0 ? _a : [];
        let segment = g1 !== null && g1 !== void 0 ? g1 : "local-high";
        if (!/^(global|local)/.test(segment)) {
            segment = "local-high";
        }
        const marker = ((_b = markers[segment]) !== null && _b !== void 0 ? _b : markers["local"]);
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = path;
        marker.insertAdjacentElement("beforebegin", link);
    };
}
//# sourceMappingURL=umd.js.map