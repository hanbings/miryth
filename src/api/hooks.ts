import {Config} from "../config/config";
import Route from "../router/route";

export class Hooking {
    public static hooks: Map<HookEndpoint, Set<Hooking>> = new Map<HookEndpoint, Set<Hooking>>();

    public static hook(
        endpoint: HookEndpoint,
        type: HookType,
        callback: (config: Config, element: HTMLElement, route: Route) => void
    ): void {
        if (Hooking.hooks.get(endpoint) == undefined) Hooking.hooks.set(endpoint, new Set<Hooking>());
        Hooking.hooks.get(endpoint).add(new Hooking(endpoint, type, callback));
    }

    public static publish(
        endpoint: HookEndpoint,
        type: HookType,
        config: Config,
        element: HTMLElement,
        route: Route
    ): void {
        Hooking.hooks.get(endpoint)?.forEach(hook => {
            if (hook.type == type) {
                hook.callback(config, element, route);
            }
        });
    }

    constructor(
        public endpoint: HookEndpoint,
        public type: HookType,
        public callback: (config: Config, element: HTMLElement, route: Route) => void
    ) {
    }
}

export enum HookEndpoint {
    CONTAINER,
    HEADER,
    HEADER_LEFT,
    HEADER_CENTER,
    HEADER_RIGHT,
    BANNER,
    CONTENT,
    CONTENT_LEFT,
    CONTENT_CENTER,
    CONTENT_RIGHT,
    FOOTER,
    FOOTER_LEFT,
    FOOTER_CENTER,
    FOOTER_RIGHT
}

export enum HookType {
    ON_LOAD,
    ON_LOADED,
    ON_UNLOAD
}