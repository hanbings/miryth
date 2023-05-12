export class Sidebar {
    constructor(
        public enable?: boolean,
        public exclude?: string[]
    ) {
        this.enable = false;
        this.exclude = ['', '/', 'about', 'tags'];
    }
}

export class LeftSidebar extends Sidebar {
    constructor() {
        super();
    }
}

export class RightSidebar extends Sidebar {
    constructor() {
        super();
    }
}