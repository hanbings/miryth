export class Sidebar {
    // 一般用作目录
    public static Left = class Left extends Sidebar {
        constructor() {
            super();
        }
    }
    // 一般用作分享等小工具
    public static Right = class Right extends Sidebar {
        constructor() {
            super();
        }
    }

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