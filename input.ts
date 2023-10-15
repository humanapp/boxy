namespace boxy {

    class Button {
        _isPressed = false;
        _justPressed = false;
        _justReleased = false;
        
        constructor(private condition: () => boolean, private src: controller.Button) {}
        
        get isPressed(): boolean {
            return this.condition() && this._isPressed;
        }
        get justPressed(): boolean {
            return this.condition() && this._justPressed;
        }
        get justReleased(): boolean {
            return this.condition() && this._justReleased;
        }

        _update() {
            const wasPressed = this._isPressed;
            this._isPressed = this.src.isPressed();
            this._justPressed = !wasPressed && this._isPressed;
            this._justReleased = wasPressed && !this._isPressed;
        }
    }

    class Input {
        _isPressed = false;
        _justPressed = false;
        _justReleased = false;

        get isPressed(): boolean {
            return this.condition() && this._isPressed;
        }
        get justPressed(): boolean {
            return this.condition() && this._justPressed;
        }
        get justReleased(): boolean {
            return this.condition() && this._justReleased;
        }

        _A: Button;
        _B: Button;
        _Up: Button;
        _Down: Button;
        _Left: Button;
        _Right: Button;

        get A(): Button {
            return this._A;
        }
        get B(): Button {
            return this._B;
        }
        get Up(): Button {
            return this._Up;
        }
        get Down(): Button {
            return this._Down;
        }
        get Left(): Button {
            return this._Left;
        }
        get Right(): Button {
            return this._Right;
        }

        constructor(private condition: () => boolean) {
            this._A = new Button(condition, controller.A);
            this._B = new Button(condition, controller.B);
            this._Up = new Button(condition, controller.up);
            this._Down = new Button(condition, controller.down);
            this._Left = new Button(condition, controller.left);
            this._Right = new Button(condition, controller.right);
        }

        _update() {
            this._A._update();
            this._B._update();
            this._Up._update();
            this._Down._update();
            this._Left._update();
            this._Right._update();
            this._isPressed = this._A._isPressed || this._B._isPressed || this._Up._isPressed || this._Down._isPressed || this._Left._isPressed || this._Right._isPressed;
            this._justPressed = this._A._justPressed || this._B._justPressed || this._Up._justPressed || this._Down._justPressed || this._Left._justPressed || this._Right._justPressed;
            this._justReleased = this._A._justReleased || this._B._justReleased || this._Up._justReleased || this._Down._justReleased || this._Left._justReleased || this._Right._justReleased;
        }
    }

    // Input for public consumption. Only works during gameplay.
    export const input = new Input(() => state === GameState.Playing);
    // Input for private consumption. Works in all game states.
    export const _input = new Input(() => true);
}
