namespace boxy.view {

    let colorStack: Color[] = [Color.Red];

    export function pushCurrentColor(color: Color) {
        colorStack.push(color);
    }

    export function popCurrentColor(): Color {
        if (colorStack.length > 1) {
            colorStack.pop();
        }
        return getCurrentColor();
    }

    export function setCurrentColor(color: Color) {
        colorStack[colorStack.length - 1] = color;
    }

    export function getCurrentColor(): Color {
        return colorStack[colorStack.length - 1];
    }

    export function fillRect(x: number, y: number, width: number, height: number) {
        screen.drawRect(x, y, width, height, getCurrentColor());
    }

    export function drawLine(x1: number, y1: number, x2: number, y2: number, thickness: number) {
        screen.drawLine(x1, y1, x2, y2, getCurrentColor() /*, thickness */);
    }

    export function _update() {
        screen.drawLine(
            game.random.getInt(0, 180),
            game.random.getInt(0, 160),
            game.random.getInt(0, 180),
            game.random.getInt(0, 160),
            getCurrentColor());

    }
}
