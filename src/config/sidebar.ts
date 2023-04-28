export default class Sidebar {
    constructor(
        public index = "sidebar.md",
        public exclude: string[] = [],
        public enable = true,
        public allowHtml = false,
        public allowJs = false
    ) {
    }
}