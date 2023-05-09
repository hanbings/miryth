export class Header {
    constructor(
        public enable?: boolean,
        public title?: string,
        public logo?: string,
        public nav?: string,
        public exclude?: string[]
    ) {
        this.enable = true;
        this.title = "Miryth";
        this.logo = "logo.png";
        this.nav = "nav.md";
        this.exclude = [];
    }
}