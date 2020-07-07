
// tslint:disable-next-line: interface-name
interface Array<T> {
    find: any;
    findIndex: any;
}

// tslint:disable-next-line: interface-name
interface String {
    startsWith: any;
    endsWith: any;
}

// tslint:disable-next-line: interface-name
interface NumberConstructor {
    parseInt: any;
    parseFloat: any;
}

if (!Array.prototype.find) {
    Array.prototype.find = function(
        predicate: (value: any, index: number, obj: any[]) => boolean, thisArg?: any): any | undefined {
        for (let i: number = 0; i < this.length; i++) {
            const item: any = this[i];
            if (predicate(item, i, this)) {
                return item;
            }
        }
    };
}

if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function(
        predicate: (value: any, index: number, obj: any[]) => unknown, thisArg?: any): number {
        for (let i: number = 0; i < this.length; i++) {
            const item: any = this[i];
            if (predicate(item, i, this)) {
                return i;
            }
        }
        return -1;
    };
}

if (!Array.prototype.map) {
    Array.prototype.map = function(callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any): any[] {
        const a: any[] = [];
        for (let i: number = 0; i < this.length; i++) {
            const r: any = callbackfn(this[i], i, this);
            if (r !== undefined) {
                a.push(r);
            }
        }
        return a;
    };
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString: string, endPosition?: number): boolean {
        const index: number = (this as string).indexOf(searchString, endPosition);
        return index === 0;
    };
}

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString: string, endPosition?: number): boolean {
        const index: number = (this as string).lastIndexOf(searchString, endPosition);
        if (index === -1) {
            return false;
        }
        const l: number = (this as string).length - index;
        return l === searchString.length;
    };
}

if (!Number.parseInt) {
    // tslint:disable-next-line:only-arrow-functions
    Number.parseInt = function(n: string): number {
        return Math.floor(parseFloat(n));
    };
}

if (!Number.parseFloat) {
    // tslint:disable-next-line:only-arrow-functions
    Number.parseFloat = function(n: string): number {
        return parseFloat(n);
    };
}

if (typeof Element !== "undefined") {
    if (!("remove" in Element.prototype)) {
        // tslint:disable-next-line
        (Element as any).prototype["remove"] = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
        };
    }
}
