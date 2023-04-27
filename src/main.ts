import Config from "./config/config";
import HashRouter from "./router/hash";
import Router from "./router/router";
import Template from "./config/template";

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
    let body: HTMLBodyElement = document.getElementsByClassName('body')[0] as HTMLBodyElement;
    let router: Router = new HashRouter();

    // 初始化路由
    router.init();

    // 获取路由
    let path: string[] = router.parse(window.location.hash);
}