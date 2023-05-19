export class Header {
    constructor(
        public logo?: string,
        public title?: string,
        public nav?: Array<Nav>,
        public search?: string
    ) {
        this.title = "Miryth";
    }
}

export class Nav {
    constructor(
        public icon?: string,
        public name?: string,
        public href?: string,
        public type?: string
    ) {
    }
}