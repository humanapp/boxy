namespace boxy {

    export interface VecLike {
        x: number;
        y: number;
    }

    export function isVecLike(v: any): boolean {
        return v.x !== null && v.y !== null;
    }

    export class Vec {
        x = 0;
        y = 0;
        
        constructor(x?: number | VecLike, y?: number) {
            this.set(x, y);
        }

        public set(x: number | VecLike, y: number = 0): this {
            if (isVecLike(x)) {
                this.x = (x as Vec).x;
                this.y = (x as Vec).y;
            } else {
                this.x = x as number;
                this.y = y;
            }
            return this;
        }

        public add(x: number | VecLike, y: number = 0): this {
            if (isVecLike(x)) {
                this.x += (x as Vec).x;
                this.y += (x as Vec).y;
            } else {
                this.x += x as number;
                this.y += y;
            }
            return this;
        }

        public sub(x: number | VecLike, y: number = 0): this {
            if (isVecLike(x)) {
                this.x -= (x as Vec).x;
                this.y -= (x as Vec).y;
            } else {
                this.x -= x as number;
                this.y -= y;
            }
            return this;
        }

        public mul(v: number): this {
            this.x *= v;
            this.y *= v;
            return this;
        }

        public div(v: number): this {
            this.x /= v;
            this.y /= v;
            return this;
        }

        clamp(xLow: number, xHigh: number, yLow: number, yHigh: number) {
            this.x = clamp(this.x, xLow, xHigh);
            this.y = clamp(this.y, yLow, yHigh);
            return this;
        }

        wrap(xLow: number, xHigh: number, yLow: number, yHigh: number) {
            this.x = wrap(this.x, xLow, xHigh);
            this.y = wrap(this.y, yLow, yHigh);
            return this;
        }

        addWithAngle(angle: number, length: number) {
            this.x += Math.cos(angle) * length;
            this.y += Math.sin(angle) * length;
            return this;
        }

        swapXy() {
            const t = this.x;
            this.x = this.y;
            this.y = t;
            return this;
        }

        normalize() {
            this.div(this.length);
            return this;
        }

        rotate(angle: number) {
            if (angle === 0) {
                return this;
            }
            const tx = this.x;
            this.x = tx * Math.cos(angle) - this.y * Math.sin(angle);
            this.y = tx * Math.sin(angle) + this.y * Math.cos(angle);
            return this;
        }

        angleTo(x: number | VecLike, y?: number) {
            if (isVecLike(x)) {
                return Math.atan2((x as Vec).y - this.y, (x as Vec).x - this.x);
            } else {
                return Math.atan2(y - this.y, (x as number) - this.x);
            }
        }

        distanceTo(x: number | VecLike, y?: number) {
            let ox: number;
            let oy: number;
            if (isVecLike(x)) {
                ox = (x as Vec).x - this.x;
                oy = (x as Vec).y - this.y;
            } else {
                ox = (x as number) - this.x;
                oy = y - this.y;
            }
            return Math.sqrt(ox * ox + oy * oy);
        }

        isInRect(x: number, y: number, width: number, height: number) {
            return isInRange(this.x, x, x + width) && isInRange(this.y, y, y + height);
        }

        equals(other: VecLike) {
            return this.x === other.x && this.y === other.y;
        }

        floor() {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            return this;
        }

        round() {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            return this;
        }

        ceil() {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            return this;
        }

        get length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        get angle() {
            return Math.atan2(this.y, this.x);
        }
    }
}
