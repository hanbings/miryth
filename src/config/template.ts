export default class Template {
    constructor(
        public title = "Miryth",
        public path = ["./docs"],
        public fullScreen = false,
        public allowHtml = false,
        public allowJs = false,
        public meta: HTMLMetaElement = new HTMLMetaElement()
    ) {
    }
}