export default class Footer {
    constructor(
        public enable = true,
        public cnIcp = "",
        public moeIcp = "",
        public content = "",
        public exclude: string[] = [],
        public allowHtml = false,
        public allowJs = false
    ) {
    }
}