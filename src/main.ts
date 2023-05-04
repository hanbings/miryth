import {marked} from "marked";
import HashRouter from "./router/hash";

class Config {
    constructor(
        // 主题颜色
        public color?: string,
        // markdown 目录
        public docs?: string[],
        public router?: string,
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
        public sidebar?: Sidebar
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
        this.sidebar = new Sidebar();

        this.override.path = ["override.md"];
        this.home.path = ["home.md"];
        this.about.path = ["about.md"];
        this.notfound.path = ["notfound.md"];
    }
}

class Template {
    constructor(
        public title = "Miryth",
        public path = ["./docs"],
        public fullScreen = false,
        public allowHtml = false,
        public allowJs = false,
        public meta: HTMLMetaElement = document.createElement("meta")
    ) {
    }
}

class Header {
    constructor(
        public enable = true,
        public title = "Miryth",
        public logo = "logo.png",
        public nav = "nav.md",
        public exclude: string[] = [],
        public allowHtml = false,
        public allowJs = false
    ) {
    }
}

class Sidebar {
    constructor(
        public index = "sidebar.md",
        public exclude: string[] = [],
        public enable = true,
        public allowHtml = false,
        public allowJs = false
    ) {
    }
}

class Footer {
    constructor(
        public enable = true,
        public cnIcp = "",
        public moeIcp = "",
        public content = "",
        public exclude: string[] = [],
        public allowHtml = false,
        public allowJs = false
    ) {
    }
}

const logo =
    "        .__                 __  .__            \n" +
    "  _____ |__|______ ___.__._/  |_|  |__         \n" +
    " /     \\|  \\_  __ <   |  |\\   __\\  |  \\   \n" +
    "|  Y Y  \\  ||  | \\/\\___  | |  | |   Y  \\   \n" +
    "|__|_|  /__||__|   / ____| |__| |___|  /       \n" +
    "      \\/           \\/                \\/     \n";

function miryth(setting: () => Config = () => new Config()): void {
    console.log(logo);

    // 默认整页渲染 路由
    let config: Config = setting.call(null);
    let element: HTMLElement = document.body;
    let router: Router = new HashRouter();

    // 初始化路由
    router.init();

    // 获取路由
    let path: string[] = router.parse(window.location.hash);

    // 渲染主页
    if (path.length < 1) {
        render(element, config.header, config.sidebar, config.home, config.footer);
    }
}

function render(element: HTMLElement, header: Header, sidebar: Sidebar, template: Template, footer: Footer): void {
    document.getElementsByTagName("title")[0].innerText = template.title;

    Render.header(element, header);
    Render.sidebar(element, sidebar);
    Render.template(element, template);
    Render.footer(element, footer);
}

class Render {
    public static header(element: HTMLElement, header: Header): void {

    }

    public static sidebar(element: HTMLElement, sidebar: Sidebar): void {

    }

    public static template(element: HTMLElement, template: Template): void {
        // 渲染模板
        let templateElement: HTMLTemplateElement = document.createElement("template");
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/${template.path[0]}`, false);
        xhr.onload = function () {
            templateElement.innerHTML = marked(xhr.responseText)

            // 挂载到 body
            element.appendChild(templateElement.content);
        };

        xhr.send();
    }

    public static footer(element: HTMLElement, footer: Footer): void {

    }
}

miryth(() => new Config());