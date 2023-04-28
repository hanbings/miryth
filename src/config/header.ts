export default class Header {
    constructor(
        public enable = true,
        public title = "Miryth",
        public logo = "logo.png",
        public nav = "nav.md",
        public exclude: string[] = [],
        public allowHtml = false,
        public allowJs = false
    ) {
    }
}