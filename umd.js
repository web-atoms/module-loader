var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
class Module {
    constructor(name, folder) {
        this.name = name;
        this.folder = folder;
        this.emptyExports = {};
        this.ignoreModule = null;
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
    get filename() {
        return this.name;
    }
    addDependency(d) {
        if (d === this.ignoreModule) {
            return;
        }
        this.dependencies.push(d);
        if (d.isDependentOn(this)) {
            console.warn(`${d.name} already depends on ${this.name}`);
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
                        for (const key in result) {
                            if (result.hasOwnProperty(key)) {
                                const element = result[key];
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
        if (this.ignoreModule === m) {
            return false;
        }
        visited = visited || {};
        visited[this.name] = true;
        for (const iterator of this.dependencies) {
            if (iterator === m) {
                return true;
            }
            if (visited[iterator.name]) {
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
        this.modules = {};
        this.pathMap = {};
        this.mockTypes = [];
    }
    register(packages, modules) {
        for (const iterator of packages) {
            if (!this.pathMap[iterator]) {
                this.map(iterator, "/");
            }
        }
        for (const iterator of modules) {
            this.get(iterator);
        }
    }
    setupRoot(root, url) {
        if (url.endsWith("/")) {
            url = url.substr(0, url.length - 1);
        }
        for (const key in this.pathMap) {
            if (this.pathMap.hasOwnProperty(key)) {
                const moduleUrl = key === root ? url : `${url}/node_modules/${key}`;
                this.map(key, moduleUrl);
            }
        }
        this.defaultUrl = `${url}/node_modules/`;
    }
    registerModule(name, moduleExports) {
        const m = this.get(name);
        m.package.url = "/";
        m.exports = Object.assign({ __esModule: true }, moduleExports);
        m.loader = promiseDone;
        m.resolver = Promise.resolve(m.exports);
        m.isLoaded = true;
        m.isResolved = true;
    }
    setup(name) {
        const jsModule = this.get(name);
        const define = this.define;
        jsModule.loader = promiseDone;
        AmdLoader.current = jsModule;
        if (define) {
            define();
        }
        if (jsModule.exportVar) {
            jsModule.exports = AmdLoader.globalVar[jsModule.exportVar];
        }
        jsModule.isLoaded = true;
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
        let existing = this.pathMap[packageName];
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
        this.pathMap[packageName] = existing;
        return existing;
    }
    resolveSource(name, defExt = ".js") {
        try {
            if (/^((\/)|((http|https)\:\/\/))/i.test(name)) {
                return name;
            }
            let path = null;
            for (const key in this.pathMap) {
                if (this.pathMap.hasOwnProperty(key)) {
                    const packageName = key;
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
                        const i = name.lastIndexOf("/");
                        const fileName = name.substr(i + 1);
                        if (fileName.indexOf(".") === -1) {
                            path = path + defExt;
                        }
                        return path;
                    }
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
        let module = this.modules[name1];
        if (!module) {
            const { packageName, version, name } = this.getPackageVersion(name1);
            module = new Module(name);
            this.modules[name1] = module;
            module.package = this.pathMap[packageName] ||
                (this.pathMap[packageName] = {
                    type: "amd",
                    name: packageName,
                    version,
                    url: this.defaultUrl ?
                        (this.defaultUrl + packageName) : undefined
                });
            module.url = this.resolveSource(name);
            if (!module.url) {
                if (typeof require === "undefined") {
                    throw new Error(`No url mapped for ${name}`);
                }
            }
            module.require = (n) => {
                const an = this.resolveRelativePath(n, module.name);
                const resolvedModule = this.get(an);
                const m = resolvedModule.getExports();
                return m;
            };
            module.require.resolve = (n) => this.resolveRelativePath(n, module.name);
            this.modules[name] = module;
        }
        return module;
    }
    import(name) {
        if (typeof require !== "undefined") {
            return Promise.resolve(require(name));
        }
        const module = typeof name === "object" ? name : this.get(name);
        if (module.importPromise) {
            return module.importPromise;
        }
        if (module.isResolved) {
            module.importPromise = Promise.resolve(module.getExports());
            return module.importPromise;
        }
        module.importPromise = this.importAsync(module);
        return module.importPromise;
    }
    importAsync(module) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.load(module);
            return yield this.resolve(module);
        });
    }
    resolve(module) {
        return __awaiter(this, void 0, void 0, function* () {
            const ds = [];
            const waiting = module.waiting = [];
            for (const iterator of module.dependencies) {
                if (iterator.isResolved
                    || iterator.ignoreModule === module
                    || iterator === module.ignoreModule
                    || (iterator.importPromise && iterator.isDependentOn(module))) {
                    continue;
                }
                waiting.push(iterator);
                ds.push(this.import(iterator));
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
            const mUrl = module.package.url + module.url;
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
        }
        if (AmdLoader.isMedia.test(module.url)) {
            const mUrl = !module.url.startsWith(module.package.url)
                ? (module.package.url + module.url)
                : module.url;
            const m = {
                url: mUrl,
                toString: () => mUrl
            };
            const e = { __esModule: true, default: m };
            module.exports = e;
            module.emptyExports = e;
            module.loader = promiseDone;
            module.isLoaded = true;
            return module.loader;
        }
        module.loader = new Promise((resolve, reject) => {
            AmdLoader.moduleLoader(module.name, module.url, () => {
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
        });
        return module.loader;
    }
}
AmdLoader.isMedia = /\.(jpg|jpeg|gif|png|mp4|mp3|css|html|svg)$/i;
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
AmdLoader.moduleProgress = (() => {
    if (!document) {
        return (name, p) => {
            console.log(`${name} ${p}%`);
        };
    }
    const progressDiv = document.createElement("div");
    progressDiv.className = "web-atoms-progress-div";
    const style = progressDiv.style;
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
    const progressLabel = document.createElement("pre");
    progressDiv.appendChild(progressLabel);
    progressLabel.style.color = "#A0A0A0";
    const ps = progressLabel.style;
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
        (document.readyState !== "loading" && !document.documentElement["doScroll"])) {
        window.setTimeout(ready);
    }
    else {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
    }
    return (name, n, status) => {
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
    get loaded() {
        return this.replacedModule.ignoreModule;
    }
}
;
class System {
    static import(name) {
        return AmdLoader.instance.import(name);
    }
    static register(nameOrImports, importsOrSetup, setup) {
        const loader = () => __awaiter(this, arguments, void 0, function* () {
            let name = Array.isArray(nameOrImports)
                ? AmdLoader.current.name
                : nameOrImports;
            let imports = importsOrSetup;
            if (arguments.length === 2) {
                imports = nameOrImports;
                setup = importsOrSetup;
            }
            const module = AmdLoader.instance.get(name);
            const all = yield Promise.all(imports.map((x) => AmdLoader.instance.import(module.require.resolve(x))));
            const r = setup((name, value) => {
                module.exports[name] = value;
            }, AmdLoader.instance);
            const { setters } = r;
            for (let index = 0; index < all.length; index++) {
                const element = all[index];
                setters[index](element);
            }
            const rp = r.execute();
            if (rp && rp.then) {
                yield rp;
            }
        });
        AmdLoader.instance.define = () => {
            loader().catch((error) => console.error(error));
        };
    }
}
;
class UMDClass {
    constructor() {
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
            try {
                this.mock = designMode;
                AmdLoader.instance.get(path);
                const m = yield this.load(this.defaultApp, designMode);
                const app = new (m.default)();
                app.onReady(() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const viewClass = yield AmdLoader.instance.import(path);
                        const view = new (viewClass.default)(app);
                        const element = document.getElementById(id);
                        element.appendChild(view.element);
                    }
                    catch (e) {
                        console.error(e);
                    }
                }));
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    loadView(path, designMode, appPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.mock = designMode;
                appPath = appPath || this.defaultApp;
                AmdLoader.instance.get(path);
                const m = yield this.load(appPath, designMode);
                const app = new (m.default)();
                return yield new Promise((resolve, reject) => {
                    app.onReady(() => __awaiter(this, void 0, void 0, function* () {
                        try {
                            const viewClass = yield AmdLoader.instance.import(path);
                            const view = new (viewClass.default)(app);
                            app.root = view;
                            resolve(view);
                        }
                        catch (e) {
                            console.error(e);
                            reject(e);
                        }
                    }));
                });
            }
            catch (er) {
                console.error(er);
                throw er;
            }
        });
    }
}
const UMD = new UMDClass();
((u) => {
    const globalNS = (typeof window !== "undefined" ? window : global);
    globalNS.UMD = u;
    globalNS.AmdLoader = AmdLoader;
})(UMD);
//# sourceMappingURL=umd.js.map