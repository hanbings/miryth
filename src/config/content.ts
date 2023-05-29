export class Content {
    constructor(
        public home?: Home,
        public friends?: Friends,
        public about?: About,
        public notfound?: Notfound
    ) {
    }
}

export class Home {
    constructor(
        public index?: Array<Index>,
        public source?: string
    ) {
    }
}

export class Index {
    constructor(
        public path?: string,
        public source?: string,
        public title?: string,
        public create?: string,
        public author?: string,
    ) {
    }
}

export class Notfound {
    constructor(
        public path?: string,
        public source?: string
    ) {
        this.path = "/404";
    }
}

export class About {
    constructor(
        public path?: string,
        public about?: string,
        public avatar?: string,
        public source?: string,
    ) {
        this.path = "/about";
    }
}

export class Friends {
    constructor(
        public path?: string,
        public friends?: Array<Friend>,
        public source?: string
    ) {
        this.path = "/friends";
    }
}

export class Friend {
    constructor(
        public avatar?: string,
        public name?: string,
        public link?: string,
        public about?: string
    ) {
    }
}