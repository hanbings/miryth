import {HookEndpoint, Hooking, HookType} from "../api/hooks";

export class Render {
    constructor() {
        Hooking.hook(
            HookEndpoint.FOOTER_RIGHT,
            HookType.ON_LOAD,
            (config, footer, route) => {
                console.log('Render footer right');
            });
    }
}