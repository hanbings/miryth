export class Footer {
    constructor(
        public enable?: boolean,
        public cnIcp?: string,
        public moeIcp?: string,
        public content?: string,
        public exclude?: string[]
    ) {
        this.enable = true;
        this.content = `<h4 style="margin: 0; padding: 0;">Powered by ⭐ Miryth</h4>`;
        this.exclude = [];
    }
}