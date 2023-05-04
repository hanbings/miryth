export class Footer {
    constructor(
        public enable?: boolean,
        public cnIcp?: string,
        public moeIcp?: string,
        public content?: string,
        public exclude?: string[],
        public allowHtml?: boolean,
        public allowJs?: boolean
    ) {
        this.enable = true;
        this.cnIcp = "";
        this.moeIcp = "";
        this.content = "";
        this.exclude = [];
        this.allowHtml = false;
        this.allowJs = false;
    }
}