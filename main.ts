game.stats = true;

//% weight=1000 icon="\u259E" color=#484041
namespace boxy {

    //% block="on update"
    //% blockId=boxy_on_update
    export function onUpdate(handler: () => void) {
        _game.setUpdateHandler(handler);
    }

    control.eventContext().registerFrameHandler(scene.UPDATE_CONTROLLER_PRIORITY, () => {
        input._update();
        _input._update();
    });
    control.eventContext().registerFrameHandler(scene.UPDATE_PRIORITY, _game._update);
    control.eventContext().registerFrameHandler(scene.RENDER_SPRITES_PRIORITY, _render._update);
}
