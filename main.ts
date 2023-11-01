game.stats = true;

//% weight=1000 icon="\u259E" color=#484041
namespace boxy {

    //% block
    export function onUpdate(handler: () => void) {
        game.setUpdateHandler(handler);
    }

    control.eventContext().registerFrameHandler(scene.UPDATE_CONTROLLER_PRIORITY, () => {
        input._update();
        _input._update();
    });
    control.eventContext().registerFrameHandler(scene.UPDATE_PRIORITY, game._update);
    control.eventContext().registerFrameHandler(scene.RENDER_SPRITES_PRIORITY, render._update);
}



/* BOX CLIMB */

const opts: boxy.GameOptions = {
    titleText: "BOX CLIMB",
    titleTextOpts: {
        color: boxy.Color.DarkBlue
    },
    titleBlinkText: "press any key",
    titleBlinkTextOpts: {
        color: boxy.Color.DarkBlue
    },
    gameOverText: "GAME OVER",
    gameOverOpts: {
        color: boxy.Color.Red
    },
    scoreOpts: {
        color: boxy.Color.DarkBlue
    }
}

interface Cord { angle: number, length: number, box: boxy.Vec };

let boxes: boxy.Vec[];
let nextBoxDist = 10;
let cord: Cord;
const cordLength = 10;

boxy.onUpdate(() => {
    // init
    if (!boxy.tick) {
        boxes = [boxy.vec(50, 8)];
        nextBoxDist = 5;
        boxy.setBackgroundColor(boxy.Color.White);
        boxy.setCurrentColor(boxy.Color.Black);
        cord = { angle: 0, length: cordLength, box: boxes[0] };
    }

    let scr = boxy.difficulty * 0.08;

    if (boxy.state === boxy.GameState.Playing) {
        if (cord.box.y < 80) {
            scr += (80 - cord.box.y) * 0.1;
        }
        if (boxy.input.isPressed) {
            cord.length += boxy.difficulty;
        } else {
            cord.length += (cordLength - cord.length) * 0.1;
        }
        cord.angle += boxy.difficulty * 0.05;
        boxy.draw.line(cord.box, boxy.vec(cord.box).addWithAngle(cord.angle, cord.length));
        if (cord.box.y > boxy.height + 3) {
            boxy.end();
        }
    }

    let nextBox: boxy.Vec;
    boxy.remove(boxes, b => {
        if (boxy.draw.box(b, 6).collidingWith.rect[boxy.Color.Black] && b !== cord.box) {
            nextBox = b;
            const score = cord.box.y - b.y;
            if (score > 0) {
                boxy.addScore(score, b);
            }
        }
        b.y += scr;
        return b.y > boxy.height + 3;
    });

    if (nextBox != null) {
        cord.box = nextBox;
        cord.length = cordLength;
    }

    nextBoxDist -= scr;
    while (nextBoxDist < 0) {
        boxes.push(boxy.vec(boxy.rnd(10, 150), -4 - nextBoxDist));
        nextBoxDist += boxy.rnd(8, 20);
    }
});

boxy.start(opts);
