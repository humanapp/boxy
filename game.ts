namespace boxy {
    export const random = new Random();
    export enum GameState {
        Title,
        Playing,
        GameOver
    }
    export let state = GameState.Title;
    export let tick = 0;
    export let difficulty = 1;
    export let score = 0;

    export let _gameOverText: string = null;
    export let _gameTitleText: string = null;

    export function end(gameOverText: string = null) {
        _gameOverText = gameOverText || "GAME OVER";
        _gotoGameOver();
    }

    export function start(gameTitleText: string = null) {
        _gameTitleText = gameTitleText;
        if (_gameTitleText) {
            _gotoTitle();
        } else {
            _gotoGameplay();
        }
    }

    export function _gotoTitle() {
        tick = 0;
        score = 0;
        state = GameState.Title;
    }

    export function _gotoGameplay() {
        tick = 0;
        score = 0;
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

    function drawTitle() {
        if (_gameTitleText) {
            draw.text(_gameTitleText, view.width / 2, view.height / 4, {
                alignment: draw.TextAlignment.Center,
                scale: boxy.vec(2, 2)
            });
        }
    }

    function drawGameOver() {
        if (_gameOverText) {
            draw.text(_gameOverText, view.width / 2, view.height / 4, {
                alignment: draw.TextAlignment.Center,
                scale: boxy.vec(2, 2)
            });
        }
    }

    export function _update() {
        difficulty = tick / 3600 + 1;

        if (state === GameState.Title) {
            drawTitle();
        }
        if (state == GameState.GameOver) {
            drawGameOver();
        }

        if (state === GameState.Title && _input.justPressed) {
            _gotoGameplay();
        }
        if (state === GameState.GameOver && _input.justPressed) {
            start(_gameTitleText);
        }

        if (_updateHandler) {
            _updateHandler();
        }

        ++tick;

        collision.clear();
    }
}
