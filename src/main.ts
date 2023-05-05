import HashRouter from "./router/hash";
import Config from "./config/config";
import Router from "./router/router";
import Route from "./router/route";
import Render from "./pages/render";

const logo =
    "        .__                 __  .__            \n" +
    "  _____ |__|______ ___.__._/  |_|  |__         \n" +
    " /     \\|  \\_  __ <   |  |\\   __\\  |  \\   \n" +
    "|  Y Y  \\  ||  | \\/\\___  | |  | |   Y  \\   \n" +
    "|__|_|  /__||__|   / ____| |__| |___|  /       \n" +
    "      \\/           \\/                \\/     \n";

class Miryth {
    public static init(): void {
        console.log(logo);

        // 从全局对象中获取配置文件
        // @ts-ignore
        let global = window.miryth as any;
        let config: Config = new Config();
        let body: HTMLElement = document.body;

        // 调整全屏样式
        // @ts-ignore
        if (global.fullScreen == undefined || global.fullScreen) {
            // 清除默认样式
            body.style.margin = "0";
            body.style.padding = "0";
        }

        // 创建路由
        let router: Router = new HashRouter();
        let route: Route = router.parse(window.location.hash.split("#")[1] ?? "");

        // 获取各个部分的页面元素
        let header: HTMLDivElement = Render.renderHeader(config.header, route);
        let footer: HTMLDivElement = Render.renderFooter(config.footer, route);
        // 容器
        let left: HTMLDivElement = Render.renderSidebar(config.left, route);
        let content: HTMLDivElement = Render.renderContent(config.home, route);
        let right: HTMLDivElement = Render.renderSidebar(config.right, route);

        // 内容容器
        let container: HTMLDivElement = document.createElement("div");
        // 处理内容容器与 header 的样式 需要保持一定的距离
        container.style.marginTop = header.style.height;
        // 剧中
        container.style.display = "flex";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";
        // 合并内容
        container.appendChild(left);
        container.appendChild(content);
        container.appendChild(right);

        // 挂载进页面
        body.appendChild(header);
        body.appendChild(container);
        body.appendChild(footer);

        console.log(route);
    }
}

Miryth.init();