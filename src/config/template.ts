export class Template {
    constructor(
        public title?: string,
        public path?: string[],
        public fullScreen?: boolean,
        public meta?: HTMLMetaElement
    ) {
        this.title = "Miryth";
        this.path = ["./docs"];
        this.fullScreen = false;
        this.meta = document.createElement("meta");
    }
}