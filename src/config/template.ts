export class Template {
    constructor(
        public title?: string,
        public path?: string[],
        public fullScreen?: boolean,
        public allowHtml?: boolean,
        public allowJs?: boolean,
        public meta?: HTMLMetaElement
    ) {
        this.title = "Miryth";
        this.path = ["./docs"];
        this.fullScreen = false;
        this.allowHtml = false;
        this.allowJs = false;
        this.meta = document.createElement("meta");
    }
}