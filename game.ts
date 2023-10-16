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
    export let _gameOverOpts: draw.TextOptions = null;
    export let _gameTitleText: string = null;
    export let _gameTitleOpts: draw.TextOptions = null;

    export function end(gameOverText: string = null, opts?: draw.TextOptions) {
        _gameOverText = gameOverText || "GAME OVER";
        _gameOverOpts = opts || {};
        _gameOverOpts.alignment = _gameOverOpts.alignment || draw.TextAlignment.Center;
        _gameOverOpts.scale = _gameOverOpts.scale || boxy.vec(2, 2);
        _gotoGameOver();
    }

    export function start(gameTitleText: string = null, opts?: draw.TextOptions) {
        _gameTitleText = gameTitleText;
        _gameTitleOpts = opts || {};
        _gameTitleOpts.alignment = _gameTitleOpts.alignment || draw.TextAlignment.Center;
        _gameTitleOpts.scale = _gameTitleOpts.scale || boxy.vec(2, 2);
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
            draw.text(_gameTitleText, view.width / 2, view.height / 4, _gameTitleOpts);
        }
        if (tick % 80 < 40) {
            draw.text("press any key", view.width / 2, 5 * view.height / 6, {
                alignment: draw.TextAlignment.Center,
                scale: boxy.vec(1.5, 1.5),
                color: _gameTitleOpts.color,
                backgroundColor: _gameTitleOpts.backgroundColor
            });
        }
    }

    function drawGameOver() {
        if (_gameOverText) {
            draw.text(_gameOverText, view.width / 2, view.height / 4, _gameOverOpts);
        }
        if (tick % 80 < 40) {
            draw.text("press any key", view.width / 2, 5 * view.height / 6, {
                alignment: draw.TextAlignment.Center,
                scale: boxy.vec(1.5, 1.5),
                color: _gameOverOpts.color,
                backgroundColor: _gameOverOpts.backgroundColor
            });
        }
    }

    export function _update() {
        difficulty = tick / 3600 + 1;

        if (state === GameState.Title && _input.justPressed) {
            _gotoGameplay();
        }
        if (state === GameState.GameOver && _input.justPressed) {
            start(_gameTitleText, _gameTitleOpts);
        }

        if (_updateHandler) {
            _updateHandler();
        }

        ++tick;

        if (state === GameState.Title) {
            drawTitle();
        }
        if (state == GameState.GameOver) {
            drawGameOver();
        }

        collision.clear();
    }
}
