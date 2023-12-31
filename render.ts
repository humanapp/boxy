namespace boxy._render {

    enum DrawCommandType {
        DrawRect,
        DrawBox,
        DrawLine,
        DrawIcon
    }

    interface DrawCommand {
        type: DrawCommandType;
        color: Color;
    }

    let commands: DrawCommand[] = [];

    interface DrawRectCommand extends DrawCommand {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    interface DrawBoxCommand extends DrawCommand {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    interface DrawLineCommand extends DrawCommand {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        thickness: number;
    }

    interface DrawIconCommand extends DrawCommand {
        x: number;
        y: number;
        buf: Buffer;
    }

    function makeDrawRect(x: number, y: number, width: number, height: number): DrawRectCommand {
        return {
            type: DrawCommandType.DrawRect,
            color: getCurrentColor(),
            x, y, width, height,
        };
    }

    function makeDrawBox(x: number, y: number, width: number, height: number): DrawBoxCommand {
        return {
            type: DrawCommandType.DrawBox,
            color: getCurrentColor(),
            x, y, width, height,
        };
    }

    function makeDrawLine(x1: number, y1: number, x2: number, y2: number, thickness: number): DrawLineCommand {
        return {
            type: DrawCommandType.DrawLine,
            color: getCurrentColor(),
            x1, y1, x2, y2,
            thickness,
        };
    }

    function makeDrawIcon(x: number, y: number, buf: Buffer): DrawIconCommand {
        return {
            type: DrawCommandType.DrawIcon,
            color: getCurrentColor(),
            x, y, buf
        };
    }

    export function rect(x: number, y: number, width: number, height: number) {
        commands.push(makeDrawRect(x, y, width, height));
    }

    export function box(x: number, y: number, width: number, height: number) {
        commands.push(makeDrawBox(x, y, width, height));
    }

    export function line(x1: number, y1: number, x2: number, y2: number, thickness: number) {
        commands.push(makeDrawLine(x1, y1, x2, y2, thickness));
    }

    export function icon(x: number, y: number, buf: Buffer) {
        commands.push(makeDrawIcon(x, y, buf));
    }

    export function _update() {
        commands.forEach(cmd => {
            switch (cmd.type) {
                case DrawCommandType.DrawRect: {
                    const _cmd = cmd as DrawRectCommand;
                    _drawRect(_cmd.x, _cmd.y, _cmd.width, _cmd.height, _cmd.color);
                    break;
                }
                case DrawCommandType.DrawBox: {
                    const _cmd = cmd as DrawBoxCommand;
                    _drawBox(_cmd.x, _cmd.y, _cmd.width, _cmd.height, _cmd.color);
                    break;
                }
                case DrawCommandType.DrawLine: {
                    const _cmd = cmd as DrawLineCommand;
                    _drawLine(_cmd.x1, _cmd.y1, _cmd.x2, _cmd.y2, _cmd.thickness, _cmd.color);
                    break;
                }
                case DrawCommandType.DrawIcon: {
                    const _cmd = cmd as DrawIconCommand;
                    _drawIcon(_cmd.x, _cmd.y, _cmd.buf, _cmd.color);
                    break;
                }
            }

        });
        commands = [];
    }

    function _drawRect(x: number, y: number, width: number, height: number, color: Color) {
        screen.drawRect(x, y, width, height, color);
    }

    function _drawBox(x: number, y: number, width: number, height: number, color: Color) {
        screen.fillRect(x, y, width, height, color);
    }

    function _drawLine(x1: number, y1: number, x2: number, y2: number, thickness: number, color: Color) {
        // TODO
    }

    function _drawIcon(x: number, y: number, buf: Buffer, color: Color) {
        screen.drawIcon(buf, x, y, color);
    }
}
