namespace boxy {
    export const random = new Random();
    export enum GameState {
        Title,
        Playing,
        GameOver
    }
    export let state = GameState.Title;
    export let tick: number = -1;

    const _gameOverText = "GAME OVER";

    export function end(gameOverText: string = null) {
        gameOverText = gameOverText || _gameOverText;
        _gotoGameOver();
    }

    let didShowTitle = false;

    export function start(showTitle = false) {
        didShowTitle = showTitle;
        if (showTitle) {
            _gotoTitle();
        }
        else {
            _gotoGameplay();
        }
    }

    export function _gotoTitle() {
        tick = 0;
        state = GameState.Title;
    }

    export function _gotoGameplay() {
        tick = 0;
        state = GameState.Playing;
    }

    export function _gotoGameOver() {
        state = GameState.GameOver;
    }
}

namespace boxy.game {

    export let _updateHandler: () => void;

    export function setUpdateHandler(handler: () => void) {
        _updateHandler = handler;
    }

    export function _update() {

        if (state === GameState.Title && _input.justPressed) {
            _gotoGameplay();
        }

        if (_updateHandler) {
            _updateHandler();
        }

        ++tick;

        collision.clear();
    }
}
