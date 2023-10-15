namespace boxy {
    export let tick: number = 0;
    export const random = new Random();
}

namespace boxy.game {

    export let _updateHandler: () => void;

    export function setUpdateHandler(handler: () => void) {
        _updateHandler = handler;
    }

    export function _update() {

        if (_updateHandler) {
            _updateHandler();
        }

        ++tick;

        collision.clear();
    }
}
