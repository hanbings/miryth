export class Hooking {
    public static hooks: Map<HookEndpoint, Set<Hooking>> = new Map<HookEndpoint, Set<Hooking>>();

    constructor(
        public endpoint: HookEndpoint,
        public type: HookType,
        public callback: (element: HTMLElement) => void
    ) {
    }
}

export enum HookEndpoint {
    HEADER,
    FOOTER,
    LEFT,
    CONTENT,
    RIGHT,
    CONTAINER
}

export enum HookType {
    BEFORE,
    AFTER
}
