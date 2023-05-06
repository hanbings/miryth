import {Template} from "./template";
import {Header} from "./header";
import {Footer} from "./footer";
import {LeftSidebar, RightSidebar, Sidebar} from "./sidebar";

export default class Config {
    constructor(
        // 主题颜色
        public color?: string,
        // markdown 目录
        public docs?: string[],
        public router?: string,
        // 全屏
        public fullscreen?: boolean,
        // 页面配置
        // 默认页面
        public override?: Template,
        // 主页
        public home?: Template,
        // 关于页
        public about?: Template,
        // 文章页面
        public post?: Template,
        // 404 页面
        public notfound?: Template,
        // 网页顶部
        public header?: Header,
        // 网页底部
        public footer?: Footer,
        // 侧边栏
        public left?: Sidebar,
        public right?: Sidebar
    ) {
        this.color = "#feba06";
        this.docs = ["./docs"];
        this.router = "hash";
        this.override = new Template();
        this.home = new Template();
        this.about = new Template();
        this.post = new Template();
        this.notfound = new Template();
        this.header = new Header();
        this.footer = new Footer();
        this.left = new LeftSidebar();
        this.right = new RightSidebar();

        this.override.path = ["override.md"];
        this.home.path = ["README.md"];
        this.about.path = ["about.md"];
        this.notfound.path = ["notfound.md"];
    }
}