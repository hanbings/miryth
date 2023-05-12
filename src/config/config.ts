import {Header} from "./header";
import {Footer} from "./footer";
import {LeftSidebar, RightSidebar, Sidebar} from "./sidebar";

export default class Config {
    constructor(
        // 主题颜色
        public color?: string,
        public index?: string,
        public router?: string,
        // 网页顶部
        public header?: Header,
        // 网页底部
        public footer?: Footer,
        // 侧边栏
        public left?: Sidebar,
        public right?: Sidebar,
        public banner?: string,
        public slogan?: string
    ) {
        this.banner = "https://picture.hanbings.com/2021/06/06/804ad1c9798b5.jpg";
        this.slogan = "萤光起腐草 云翼腾沉鲲";
        this.color = "#feba06";
        this.index = "index.json";
        this.router = "hash";
        this.header = new Header();
        this.footer = new Footer();
        this.left = new LeftSidebar();
        this.right = new RightSidebar();
    }
}