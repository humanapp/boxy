namespace boxy {

    export interface Collision {
        rect: { [color: number /*Color*/]: boolean };
    }

    export interface HitBox {
        pos: VecLike;
        size: VecLike;
        collision: Collision;
    }
}

namespace boxy.collision {
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
        let collision: Collision = {
            rect: {}
        };
        hitboxes.forEach((b) => {
            if (testCollision(box, b)) {
                collision = {
                    rect: merge(collision.rect, b.collision.rect, AllColors)
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
