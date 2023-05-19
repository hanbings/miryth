export class Content {
    constructor(
        public index?: Array<Index>,
        public tags?: Tags,
        public friends?: Friends,
        public about?: About,
        public notfound?: Notfound
    ) {
    }
}

export class Index {
    constructor(
        public type?: string,
        public source?: string,
        public banner?: string,
        public thumbnail?: string,
        public title?: string,
        public preview?: string,
        public create?: string,
        public author?: string,
        public tags?: string[]
    ) {
    }
}

export class Notfound {
    constructor() {
    }
}

export class About {
    constructor(
        public banner: string,
        public title: string,
        public subtitle: string,
        public avatar: string,
    ) {
    }
}

export class Tags {
    constructor(
        public banner: string,
        public title: string,
        public subtitle: string,
        public avatar: string,
    ) {
    }
}

export class Friends {
    constructor(
        public banner: string,
        public title: string,
        public subtitle: string,
    ) {
    }
}

export class Friend {
    constructor(
        public avatar: string,
        public name: string,
        public link: string,
        public about: string
    ) {
    }
}