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

/* TEST */

interface Cord { angle: number, length: number, box: boxy.Vec };

let boxes: boxy.Vec[];
let nextBoxDist = 10;
let cord: Cord;
const cordLength = 10;

boxy.onUpdate(() => {
    // init
    if (!boxy.tick) {
        boxes = [boxy.vec(50, 5)];
        nextBoxDist = 5;
        boxy.view.setBackgroundColor(boxy.Color.White);
        boxy.view.setCurrentColor(boxy.Color.Black);
        cord = { angle: 0, length: cordLength, box: boxes[0] };
    }

    let scr = 0.06;

    if (boxy.state = boxy.GameState.Playing) {
        if (cord.box.y < 80) {
            scr += (80 - cord.box.y) * 0.1;
        }
        if (boxy.input.isPressed) {
            cord.length += 1;
        } else {
            cord.length += (cordLength - cord.length) * 0.1;
        }
        cord.angle += 0.05;
        boxy.draw.line(cord.box, boxy.vec(cord.box).addWithAngle(cord.angle, cord.length));
        if (cord.box.y > boxy.view.height + 3) {
            boxy.end();
        }
    }

    boxy.remove(boxes, b => {
        boxy.draw.box(b, 6);
        b.y += scr;
        return b.y > boxy.view.height + 3;
    });

    nextBoxDist -= scr;
    while (nextBoxDist < 0) {
        boxes.push(boxy.vec(boxy.rnd(10, 150), -2 - nextBoxDist));
        nextBoxDist += boxy.rnd(5, 15);
    }

});

boxy.start(true);

