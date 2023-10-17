namespace boxy {

    let scoreId = 0;
    export let _activeScores: { id: number, str: string, pos: Vec, vy: number, deathTick: number }[] = [];

    export function addScore(value: number, x?: number | VecLike, y?: number) {
        score += value;
        if (x == null) {
            return;
        }
        const str = `${value >= 1 ? "+" : ""}${Math.floor(value)}`;
        let pos = new Vec();
        if (typeof x === "number") {
            pos.set(x, y);
        } else {
            pos.set(x);
        }
        pos.x -= (str.length * font6.charWidth * 2) / 2;
        pos.y -= font6.charHeight * 2 / 2;
        _activeScores.push({
            id: ++scoreId,
            str,
            pos,
            vy: -2,
            deathTick: tick + 30,
        });
    }
}

namespace boxy.scores {
    export function _update() {
        pushCurrentColor(Color.Black);
        remove(_activeScores, (s) => {
            draw.text(s.str, s.pos.x, s.pos.y, {
                scale: _gameOpts.scoreScale,
                color: _gameOpts.scoreColor
            });
            s.pos.y += s.vy;
            s.vy *= 0.9;
            return s.deathTick <= tick;
        });
        popCurrentColor();
    }
}