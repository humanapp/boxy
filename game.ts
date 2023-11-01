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

    export interface GameOptions {
        wantTitleState?: boolean; // default: false
        titleText?: string;
        titleTextOpts?: TextOptions;
        titlePos?: Vec;
        titleBlinkText?: string;
        titleBlinkTextOpts?: TextOptions;
        titleBlinkPos?: Vec;
        gameOverText?: string;
        gameOverOpts?: TextOptions;
        gameOverPos?: Vec;
        wantDifficulty?: boolean; // default: true
        wantScore?: boolean; // default: true
        scoreOpts?: TextOptions;
    }

    export let _gameOpts: GameOptions;

    //% block="end"
    //% blockid=boxy_end
    export function end() {
        _gotoGameOver();
    }

    //% block="start"
    //% blockid=boxy_start
    export function start(gameOpts?: GameOptions) {
        _gameOpts = gameOpts = gameOpts || {};
        _gameOpts.wantTitleState = gameOpts.wantTitleState != null || !!gameOpts.titleText;
        _gameOpts.gameOverOpts = _gameOpts.gameOverOpts || {};
        _gameOpts.gameOverOpts.alignment = _gameOpts.gameOverOpts.alignment || TextAlignment.Center;
        _gameOpts.gameOverOpts.font = _gameOpts.gameOverOpts.font || image.scaledFont(image.font8, 2);
        _gameOpts.gameOverPos = _gameOpts.gameOverPos || vec(width / 2 - 5, height / 2 - 5);
        _gameOpts.titleTextOpts = _gameOpts.titleTextOpts || {};
        _gameOpts.titleTextOpts.alignment = _gameOpts.titleTextOpts.alignment || TextAlignment.Center;
        _gameOpts.titleTextOpts.font = _gameOpts.titleTextOpts.font || image.scaledFont(image.font8, 2);
        _gameOpts.titlePos = _gameOpts.titlePos || vec(width / 2, height / 4);
        _gameOpts.titleBlinkTextOpts = _gameOpts.titleBlinkTextOpts || {};
        _gameOpts.titleBlinkTextOpts.alignment = _gameOpts.titleBlinkTextOpts.alignment || TextAlignment.Center;
        _gameOpts.titleBlinkTextOpts.font = _gameOpts.titleBlinkTextOpts.font || image.font8;
        _gameOpts.titleBlinkPos = _gameOpts.titleBlinkPos || vec(width / 2, 5 * height / 6);
        _gameOpts.scoreOpts = _gameOpts.scoreOpts || {};
        _gameOpts.scoreOpts.alignment = _gameOpts.scoreOpts.alignment || TextAlignment.Center;
        _gameOpts.scoreOpts.font = _gameOpts.scoreOpts.font || image.font5;

        if (_gameOpts.wantTitleState) {
            _gotoTitle();
        } else {
            _gotoGameplay();
        }
    }

    export function _gotoTitle() {
        tick = 0;
        score = 0;
        _activeScores = [];
        state = GameState.Title;
    }

    export function _gotoGameplay() {
        tick = 0;
        score = 0;
        _activeScores = [];
        state = GameState.Playing;
    }

    export function _gotoGameOver() {
        state = GameState.GameOver;
    }
}

namespace boxy._game {
    export let _updateHandler: () => void;

    export function setUpdateHandler(handler: () => void) {
        _updateHandler = handler;
    }

    function drawTitle() {
        if (_gameOpts.titleText) {
            draw.text(_gameOpts.titleText, _gameOpts.titlePos.x, _gameOpts.titlePos.y, _gameOpts.titleTextOpts);
        }
        if (_gameOpts.titleBlinkText && tick % 80 < 40) {
            draw.text(_gameOpts.titleBlinkText, _gameOpts.titleBlinkPos.x, _gameOpts.titleBlinkPos.y, _gameOpts.titleBlinkTextOpts);
        }
    }

    function drawGameOver() {
        if (_gameOpts.gameOverText) {
            draw.text(_gameOpts.gameOverText, _gameOpts.gameOverPos.x, _gameOpts.gameOverPos.y, _gameOpts.gameOverOpts);
        }
    }

    export function _update() {
        if (!_gameOpts) return;

        difficulty = tick / 3600 + 1;

        if (state === GameState.Title && _input.justPressed) {
            _gotoGameplay();
        }
        if (state === GameState.GameOver && _input.justPressed) {
            start(_gameOpts);
        }

        if (_updateHandler) {
            _updateHandler();
        }

        _scores._update();

        ++tick;

        if (state === GameState.Title) {
            drawTitle();
        }
        if (state == GameState.GameOver) {
            drawGameOver();
        }

        _collision.clear();
    }
}
