export class Content {
    constructor(
        public index?: Array<Index>,
        public tags?: Tags,
        public friends?: Friends,
        public about?: About,
        public notfound?: Notfound
    ) {}
}

export class Index {
    constructor(
        public type?: string,
        public source?: string,
        public banner?: string,
        public title?: string,
        public create?: string,
        public author?: string,
        public tags?: string[]
    ) {
    }
}

export class Notfound {
    constructor(

    ) {
    }
}

export class About {
    constructor(

    ) {
    }
}

export class Tags {
    constructor(

    ) {
    }
}

export class Friends {
    constructor(

    ) {
    }
}