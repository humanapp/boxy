namespace boxy.view {

    export const width = screen.width;
    export const height = screen.height;

    const colorStack: Color[] = [Color.Red];

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

    export function setBackgroundColor(color: Color) {
        scene.setBackgroundColor(color);
    }

}
