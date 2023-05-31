export class Content {
    constructor(
        public home?: Home,
        public posts?: Posts,
        public friends?: Friends,
        public about?: About,
        public notfound?: Notfound
    ) {
    }
}

export class Home {
    constructor(
        public source?: string
    ) {
    }
}

export class Posts {
    constructor(
        public posts?: Array<Post>,
        public path?: string,
        public source?: string,
    ) {
    }
}

export class Post {
    constructor(
        public path?: string,
        public source?: string,
        public title?: string,
        public create?: string,
        public icon?: string
    ) {
    }
}

export class Notfound {
    constructor(
        public path?: string,
        public source?: string
    ) {
    }
}

export class About {
    constructor(
        public path?: string,
        public about?: string,
        public avatar?: string,
        public source?: string,
    ) {
    }
}

export class Friends {
    constructor(
        public path?: string,
        public friends?: Array<Friend>,
        public source?: string
    ) {
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