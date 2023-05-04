export class Sidebar {
    constructor(
        public index?: string,
        public exclude?: string[],
        public enable?: boolean,
        public allowHtml?: boolean,
        public allowJs?: boolean
    ) {
        this.index = "sidebar.md";
        this.exclude = [];
        this.enable = true;
        this.allowHtml = false;
        this.allowJs = false;
    }
}