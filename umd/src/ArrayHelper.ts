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