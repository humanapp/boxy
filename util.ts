namespace boxy {

    export function clamp(v: number, low = 0, high = 1) {
        return Math.max(low, Math.min(v, high));
    }

    export function wrap(v: number, low: number, high: number) {
        const w = high - low;
        const o = v - low;
        if (o >= 0) {
            return (o % w) + low;
        } else {
            let wv = w + (o % w) + low;
            if (wv >= high) {
                wv -= w;
            }
            return wv;
        }
    }

    export function isInRange(v: number, low: number, high: number) {
        return low <= v && v < high;
    }

    export function merge(dst: any, src: any, fields: any[]): any {
        dst = dst || {};
        fields.forEach(field => {
            if (src[field]) dst[field] = src[field];
        });

    }

    export function remove<T>(
        array: T[],
        func: (v: T, index?: number) => any
    ): T[] {
        let removed = [];
        for (let i = 0, index = 0; i < array.length; index++) {
            if (func(array[i], index)) {
                removed.push(array[i]);
                array.splice(i, 1);
            } else {
                i++;
            }
        }
        return removed;
    }

    export function rnd(lowOrHigh: number = 1, high?: number) {
        return random.get(lowOrHigh, high);
    }
}
