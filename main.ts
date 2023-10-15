
//% weight=1000 icon="\u259E" color=#484041
namespace boxy {

    export let _updateHandler: () => void;

    //% block
    export function onUpdate(handler: () => void) {
        _updateHandler = handler;
    }

    export const CONTROLLER_PRIORITY = 8;
    export const UPDATE_CONTROLLER_PRIORITY = 13;
    export const FOLLOW_SPRITE_PRIORITY = 14;
    export const PHYSICS_PRIORITY = 15;
    export const ANIMATION_UPDATE_PRIORITY = 15;
    export const CONTROLLER_SPRITES_PRIORITY = 13;
    export const UPDATE_INTERVAL_PRIORITY = 19;
    export const UPDATE_PRIORITY = 20;
    export const PRE_RENDER_UPDATE_PRIORITY = 55;
    export const RENDER_BACKGROUND_PRIORITY = 60;
    export const RENDER_SPRITES_PRIORITY = 90;
    export const RENDER_DIAGNOSTICS_PRIORITY = 150;
    export const MULTIPLAYER_SCREEN_PRIORITY = 190;
    export const UPDATE_SCREEN_PRIORITY = 200;
    export const MULTIPLAYER_POST_SCREEN_PRIORITY = 210;

    function startup() {
        control.eventContext().registerFrameHandler(scene.UPDATE_CONTROLLER_PRIORITY, input._update);
        control.eventContext().registerFrameHandler(scene.UPDATE_PRIORITY, game._update);
        control.eventContext().registerFrameHandler(scene.RENDER_SPRITES_PRIORITY, view._update);
    }

    startup();
}

//% weight=999 icon="\u0000" color=#484041
namespace ____ {
    //% block
    export function BoxyDoesNotWorkWithSprites() {

    }
}
