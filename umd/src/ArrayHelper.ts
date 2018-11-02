// tslint:disable-next-line:typedef
window.onerror = function(msg, url, line, col) {
    alert(`${msg}\r\n${url}:${line}:${col}`);
};

if(!Array.prototype.find) {
    Array.prototype.find = function(predicate: (value: any, index: number, obj: any[]) => boolean, thisArg?: any): any | undefined {
        for (let i: number = 0; i<this.length; i++) {
            const item: any = this[i];
            if (predicate(item, i, this)) {
                return item;
            }
        }
    };
}

if(!Array.prototype.map) {
    Array.prototype.map = function(callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any): any[] {
        const a: any[] = [];
        for (let i:number =0; i <this.length; i++) {
            const r: any = callbackfn(this[i], i, this);
            if (r !== undefined) {
                a.push(r);
            }
        }
        return a;
    };
}

if(!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString: string, endPosition?: number): boolean {
        const index: number = (this as string).lastIndexOf(searchString, endPosition);
        if (index === -1) {
            return false;
        }
        const l: number = (this as string).length - index;
        return l === searchString.length;
    };
}


if(!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString: string, endPosition?: number): boolean {
        const index: number = (this as string).lastIndexOf(searchString, endPosition);
        if (index === -1) {
            return false;
        }
        const l: number = (this as string).length - index;
        return l === searchString.length;
    };
}