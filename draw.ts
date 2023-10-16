namespace boxy.draw {

    /**
     * Draw a rectangle.
     * @param x An x-coordinate or `Vector` position of the top left corner.
     * @param y A y-coordinate of the top left corner.
     * @param width
     * @param height
     * @returns Information about objects that collided during drawing.
     */
    export function rect(
        x: number | VecLike,
        y: number | VecLike,
        width: number | VecLike = 6,
        height: number = 6
    ): Collision {
        return drawRect(false, false, true, x, y, width, height);
    }

    /**
     * Draw a box.
     * @param x An x-coordinate or `Vector` position of the center of the box.
     * @param y A y-coordinate of center of the box.
     * @param width
     * @param height
     * @returns Information about objects that collided during drawing.
     */
    export function box(
        x: number | VecLike,
        y: number | VecLike,
        width: number | VecLike = 6,
        height: number = 6
    ): Collision {
        return drawRect(true, true, true, x, y, width, height);
    }

    /**
     * Draw a bar, which is a line specified by the center coordinates and length.
     * @param x An x-coordinate or `Vector` position of the center of the bar.
     * @param y A y-coordinate of center of the bar.
     * @param length
     * @param thickness
     * @param rotate Angle of the bar.
     * @param centerPosRatio A value from 0 to 1 that defines where the center coordinates are on the line, default: 0.5.
     * @returns Information about objects that collided during drawing.
     */
    export function bar(
        x: number | VecLike,
        y: number,
        length: number,
        thickness: number,
        rotate = 0.5,
        centerPosRatio = 0.5
    ): Collision {
        if (typeof x !== "number") {
            centerPosRatio = rotate;
            rotate = thickness;
            thickness = length;
            length = y;
            y = x.y;
            x = x.x;
        }
        const l = new Vec(length).rotate(rotate);
        const p = new Vec(x - l.x * centerPosRatio, y - l.y * centerPosRatio);
        return drawLine(p, l, thickness, true);
    }

    /**
     * Draw a line.
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param thickness
     * @returns Information about objects that collided during drawing.
     */
    export function line(
        x1: number | VecLike,
        y1: number | VecLike,
        x2: number | VecLike = 6,
        y2: number = 6,
        thickness: number = 6
    ): Collision {
        const p = new Vec();
        const p2 = new Vec();
        if (typeof x1 === "number") {
            if (typeof y1 === "number") {
                if (typeof x2 === "number") {
                    p.set(x1, y1);
                    p2.set(x2, y2);
                } else {
                    p.set(x1, y1);
                    p2.set(x2);
                    thickness = y2;
                }
            } else {
                throw "invalid params";
            }
        } else {
            if (typeof y1 === "number") {
                if (typeof x2 === "number") {
                    p.set(x1);
                    p2.set(y1, x2);
                    thickness = y2;
                } else {
                    throw "invalid params";
                }
            } else {
                if (typeof x2 === "number") {
                    p.set(x1);
                    p2.set(y1);
                    thickness = x2;
                } else {
                    throw "invalid params";
                }
            }
        }
        return drawLine(p, p2.sub(p), thickness, true);
    }

    /**
     * Draw an arc.
     * @param centerX
     * @param centerY
     * @param radius
     * @param thickness
     * @param angleFrom
     * @param angleTo
     * @returns Information about objects that collided during drawing.
     */
    export function arc(
        centerX: number | VecLike,
        centerY: number,
        radius?: number,
        thickness?: number,
        angleFrom?: number,
        angleTo?: number
    ): Collision {
        let centerPos = new Vec();
        if (typeof centerX === "number") {
            centerPos.set(centerX, centerY);
        } else {
            centerPos.set(centerX);
            angleTo = angleFrom;
            angleFrom = thickness;
            thickness = radius;
            radius = centerY;
        }
        if (thickness == null) {
            thickness = 3;
        }
        if (angleFrom == null) {
            angleFrom = 0;
        }
        if (angleTo == null) {
            angleTo = Math.PI * 2;
        }
        let af: number;
        let ao: number;
        if (angleFrom > angleTo) {
            af = angleTo;
            ao = angleFrom - angleTo;
        } else {
            af = angleFrom;
            ao = angleTo - angleFrom;
        }
        ao = clamp(ao, 0, Math.PI * 2);
        if (ao < 0.01) {
            return null;
        }
        const lc = clamp(Math.ceil(ao * Math.sqrt(radius * 0.25)), 1, 36);
        const ai = ao / lc;
        let a = af;
        let p1 = new Vec(radius).rotate(a).add(centerPos);
        let p2 = new Vec();
        let o = new Vec();
        let collision: Collision = boxy.collision.emptyCollision();
        for (let i = 0; i < lc; i++) {
            a += ai;
            p2.set(radius).rotate(a).add(centerPos);
            o.set(p2).sub(p1);
            const c = drawLine(p1, o, thickness, true);
            collision = boxy.collision.mergeCollisions(collision, c);
            p1.set(p2);
        }
        boxy.collision.importHitboxes();
        return collision;
    }

    export enum TextAlignment {
        Left,
        Center,
        Right
    }

    interface TextOptions {
        color?: Color;
        backgroundColor?: Color;
        collidable?: boolean;
        scale?: Vec;
        alignment?: TextAlignment;
    }

    export function text(str: string, x: number | VecLike, y: number, opts?: TextOptions): Collision {
        let collision = boxy.collision.emptyCollision();

        opts = opts || {};
        opts.color = opts.color != null ? opts.color : view.getCurrentColor();
        opts.backgroundColor = opts.backgroundColor || Color.Transparent;
        opts.collidable = false;
        opts.scale = opts.scale || vec(1, 1);
        opts.alignment = opts.alignment || TextAlignment.Left;

        const pos = vec(x, y);
        str.split('\n').forEach(line => {
            const c = _text(line, pos, opts);
            collision = boxy.collision.mergeCollisions(collision, c);
            pos.y += (font6.charHeight + 1) * opts.scale.y;
        });

        return collision;
    }

    function _text(line: string, pos: Vec, opts: TextOptions): Collision {
        const width = line.length * font6.charWidth * opts.scale.x;

        switch (opts.alignment) {
            case TextAlignment.Center: {
                pos.x -= width / 2;
                break;
            }
            case TextAlignment.Right: {
                pos.x -= width;
                break;
            }
        }

        for (let i = 0; i < line.length; ++i) {
            const char = line.charCodeAt(i);
            const glyph = font6.getGlyph(char);
            if (glyph) {
                for (let h = 0; h < font6.charHeight; ++h) {
                    const y = pos.y + h * opts.scale.y;
                    for (let w = 0; w < font6.charWidth; ++w) {
                        const index = w + h * (font6.charHeight + 1);
                        const elem = glyph.charAt(index);
                        if (elem !== '.') {
                            const x = pos.x + w * opts.scale.x;
                            addRect(false, true, false, x, y, opts.scale.x, opts.scale.y);
                        }
                    }
                }
            }
            pos.x += font6.charWidth * opts.scale.x;            
        }

        // TODO: Support collision with chars
        return collision.emptyCollision();
    }

    function drawRect(
        isAlignCenter: boolean,
        fill: boolean,
        collidable: boolean,
        x: number | VecLike,
        y: number | VecLike,
        width?: number | VecLike,
        height?: number
    ): Collision {
        if (typeof x === "number") {
            if (typeof y === "number") {
                if (typeof width === "number") {
                    if (height == null) {
                        return addRect(isAlignCenter, fill, collidable, x, y, width, width);
                    } else {
                        return addRect(isAlignCenter, fill, collidable, x, y, width, height);
                    }
                } else {
                    return addRect(isAlignCenter, fill, collidable, x, y, width.x, width.y);
                }
            } else {
                throw "invalid params";
            }
        } else {
            if (typeof y === "number") {
                if (width == null) {
                    return addRect(isAlignCenter, fill, collidable, x.x, x.y, y, y);
                } else if (typeof width === "number") {
                    return addRect(isAlignCenter, fill, collidable, x.x, x.y, y, width);
                } else {
                    throw "invalid params";
                }
            } else {
                return addRect(isAlignCenter, fill, collidable, x.x, x.y, y.x, y.y);
            }
        }
    }

    function drawLine(
        p: Vec,
        l: Vec,
        thickness: number,
        collidable: boolean,
        isAddingToTmp = false
    ): Collision {
        if (view.getCurrentColor() !== Color.Transparent) {
            render.line(p.x, p.y, p.x + l.x, p.y + l.y, thickness);
        }
        const t = Math.floor(clamp(thickness, 3, 10));
        const lx = Math.abs(l.x);
        const ly = Math.abs(l.y);
        const rn = clamp(Math.ceil(lx > ly ? lx / t : ly / t) + 1, 3, 99);
        l.div(rn - 1);
        let collision: Collision = boxy.collision.emptyCollision();
        for (let i = 0; i < rn; i++) {
            const c = addRect(true, true, collidable, p.x, p.y, thickness, thickness, true);
            if (collidable) {
                collision = boxy.collision.mergeCollisions(collision, c);
            }
            p.add(l);
        }
        if (!isAddingToTmp) {
            boxy.collision.importHitboxes();
        }
        return collision;
    }

    function addRect(
        isAlignCenter: boolean,
        fill: boolean,
        collidable: boolean,
        x: number,
        y: number,
        width: number,
        height: number,
        isAddingToTmp = false
    ): Collision {
        if (view.getCurrentColor() !== Color.Transparent) {
            if (isAlignCenter) {
                render.rect(x - width / 2, y - height / 2, width, height);
            } else {
                render.rect(x, y, width, height);
            }
        }
        let pos = isAlignCenter
            ? { x: Math.floor(x - width / 2), y: Math.floor(y - height / 2) }
            : { x: Math.floor(x), y: Math.floor(y) };
        const size = { x: Math.trunc(width), y: Math.trunc(height) };
        if (size.x === 0 || size.y === 0) {
            return boxy.collision.emptyCollision();
        }
        if (size.x < 0) {
            pos.x += size.x;
            size.x *= -1;
        }
        if (size.y < 0) {
            pos.y += size.y;
            size.y *= -1;
        }
        const box: HitBox = { pos, size, collision: boxy.collision.emptyCollision() };
        if (collidable) {
            box.collision.collidingWith.rect[view.getCurrentColor()] = true;
        }
        const collision = boxy.collision.checkHitboxes(box);
        if (view.getCurrentColor() !== Color.Transparent) {
            isAddingToTmp ? boxy.collision.queueHitbox(box) : boxy.collision.addHitbox(box);
            fill ? render.box(pos.x, pos.y, size.x, size.y) : render.rect(pos.x, pos.y, size.x, size.y);
        }
        return collision;
    }
}
