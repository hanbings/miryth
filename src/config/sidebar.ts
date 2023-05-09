export class Sidebar {
    constructor(
        public enable?: boolean
    ) {
        this.enable = false;
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