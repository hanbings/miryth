export class Sidebar {
    constructor(
        public enable?: boolean,
        public allowHtml?: boolean,
        public allowJs?: boolean
    ) {
        this.enable = false;
        this.allowHtml = true;
        this.allowJs = true;
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