namespace boxy {

    export interface Collision {
        collidingWith: {
            rect: { [color: number /*Color*/]: boolean };
        }
    }

    export interface HitBox {
        pos: VecLike;
        size: VecLike;
        collision: Collision;
    }
}

namespace boxy._collision {
    interface CollisionSet { [color: number /*Color*/]: boolean };
    function emptySet(): CollisionSet {
        return {
            [Color.Transparent]: false,
            [Color.White]: false,
            [Color.Red]: false,
            [Color.Pink]: false,
            [Color.Orange]: false,
            [Color.Yellow]: false,
            [Color.Teal]: false,
            [Color.Green]: false,
            [Color.Blue]: false,
            [Color.LightBlue]: false,
            [Color.Purple]: false,
            [Color.LightPurple]: false,
            [Color.DarkPurple]: false,
            [Color.Tan]: false,
            [Color.Brown]: false,
            [Color.Black]: false
        }
    }
    
    export function mergeSets(dst: CollisionSet, src: CollisionSet): CollisionSet {
        dst[Color.Transparent] = dst[Color.Transparent] || src[Color.Transparent];
        dst[Color.White] = dst[Color.White] || src[Color.White];
        dst[Color.Red] = dst[Color.Red] || src[Color.Red];
        dst[Color.Pink] = dst[Color.Pink] || src[Color.Pink];
        dst[Color.Orange] = dst[Color.Orange] || src[Color.Orange];
        dst[Color.Yellow] = dst[Color.Yellow] || src[Color.Yellow];
        dst[Color.Teal] = dst[Color.Teal] || src[Color.Teal];
        dst[Color.Green] = dst[Color.Green] || src[Color.Green];
        dst[Color.Blue] = dst[Color.Blue] || src[Color.Blue];
        dst[Color.LightBlue] = dst[Color.LightBlue] || src[Color.LightBlue];
        dst[Color.Purple] = dst[Color.Purple] || src[Color.Purple];
        dst[Color.LightPurple] = dst[Color.LightPurple] || src[Color.LightPurple];
        dst[Color.DarkPurple] = dst[Color.DarkPurple] || src[Color.DarkPurple];
        dst[Color.Tan] = dst[Color.Tan] || src[Color.Tan];
        dst[Color.Brown] = dst[Color.Brown] || src[Color.Brown];
        dst[Color.Black] = dst[Color.Black] || src[Color.Black];
        return dst;
    }

    export function emptyCollision(): Collision {
        return {
            collidingWith: {
                rect: emptySet()
            }
        };
    }
    export function mergeCollisions(dst: Collision, src: Collision): Collision {
        dst.collidingWith.rect = mergeSets(dst.collidingWith.rect, src.collidingWith.rect);
        return dst;
    }

    export let hitboxes: HitBox[] = [];
    export let tmpHitboxes: HitBox[] = [];

    export function clear() {
        hitboxes = [];
        tmpHitboxes = [];
    }

    export function importHitboxes() {
        hitboxes = hitboxes.concat(tmpHitboxes);
        tmpHitboxes = [];
    }

    export function queueHitbox(box: HitBox) {
        tmpHitboxes.push(box);
    }

    export function addHitbox(box: HitBox) {
        hitboxes.push(box);
    }

    export function checkHitboxes(box: HitBox): Collision {
        let collision = emptyCollision();
        hitboxes.forEach((b) => {
            if (testCollision(box, b)) {
                collision = {
                    collidingWith: {
                        rect: mergeSets(collision.collidingWith.rect, b.collision.collidingWith.rect)
                    }
                }
            }
        });
        return collision;
    }

    function testCollision(r1: HitBox, r2: HitBox) {
        const ox = r2.pos.x - r1.pos.x;
        const oy = r2.pos.y - r1.pos.y;
        return -r2.size.x < ox && ox < r1.size.x && -r2.size.y < oy && oy < r1.size.y;
    }
}
