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

        // 清除默认样式
        document.body.style.margin = "0";
        document.body.style.padding = "0";

        let config: Config = new Config();
        let element: HTMLElement = document.body;
        let router: Router = new HashRouter();

        // 初始化路由
        router.init();

        // 获取路由
        let route: Route = router.parse(window.location.hash.split("#")[1] ?? "");

        if (route.paths.length == 0 || route.path == "/") {
            Render.render(element, config.header, config.sidebar, config.home, config.footer);
        }

        console.log(route);
    }
}

Miryth.init();