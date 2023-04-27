import Template from "./template";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";

export default class Config {
    constructor(
        // 主题颜色
        public color: string = "#feba06",
        // markdown 目录
        public docs = ["./docs"],
        public router = "hash",
        // 页面配置
        // 默认页面
        public override = new Template(),
        // 主页
        public home = new Template(),
        // 关于页
        public about = new Template(),
        // 文章页面
        public post = new Template(),
        // 404 页面
        public notfound = new Template(),
        // 网页顶部
        public header = new Header(),
        // 网页底部
        public footer = new Footer(),
        // 侧边栏
        public sidebar = new Sidebar()
    ) {
        override.path = ["override.md"];
        home.path = ["home.md"];
        about.path = ["about.md"];
        notfound.path = ["notfound.md"];
    }
}