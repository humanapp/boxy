namespace boxy.input {

    interface Key {
        isPressed: boolean;
        justPressed: boolean;
        justReleased: boolean;
    }

    export let isPressed: boolean;
    export let justPressed: boolean;
    export let justReleased: boolean;

    function makeKey(): Key {
        return {
            isPressed: false,
            justPressed: false,
            justReleased: false
        };
    }

    export const A = makeKey();
    export const B = makeKey();
    export const Up = makeKey();
    export const Down = makeKey();
    export const Left = makeKey();
    export const Right = makeKey();

    function updateKey(key: Key, src: controller.Button) {
        const wasPressed = key.isPressed;
        key.isPressed = src.isPressed();
        key.justPressed = !wasPressed && key.isPressed;
        key.justReleased = wasPressed && !key.isPressed;
    }

    export function _update() {
        updateKey(A, controller.A);
        updateKey(B, controller.B);
        updateKey(Up, controller.up);
        updateKey(Down, controller.down);
        updateKey(Left, controller.left);
        updateKey(Right, controller.right);
        isPressed = A.isPressed || B.isPressed || Up.isPressed || Down.isPressed || Left.isPressed || Right.isPressed;
        justPressed = A.justPressed || B.justPressed || Up.justPressed || Down.justPressed || Left.justPressed || Right.justPressed;
        justReleased = A.justReleased || B.justReleased || Up.justReleased || Down.justReleased || Left.justReleased || Right.justReleased;
    }
}
