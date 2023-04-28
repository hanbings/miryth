import Config from "./config/config";
import HashRouter from "./router/hash";
import Router from "./router/router";
import Template from "./config/template";
import Header from "./config/header";
import Footer from "./config/footer";
import Sidebar from "./config/sidebar";
import {marked} from "marked";
import axios from "axios";

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

    // 渲染主页
    if (path.length < 1) {
        render(body, config.header, config.sidebar, config.home, config.footer);
    }
}

function render(body: HTMLBodyElement, header: Header, sidebar: Sidebar, template: Template, footer: Footer): void {
    document.getElementsByTagName("title")[0].innerText = template.title;

    Render.header(body, header);
    Render.sidebar(body, sidebar);
    Render.template(body, template);
    Render.footer(body, footer);
}

class Render {
    public static header(body: HTMLBodyElement, header: Header): void {

    }

    public static sidebar(body: HTMLBodyElement, sidebar: Sidebar): void {

    }

    public static template(body: HTMLBodyElement, template: Template): void {
        // 渲染模板
        let templateElement: HTMLTemplateElement = document.createElement("template");
        axios(template.path[0]).then(res => templateElement.innerHTML = marked(res.data));

        // 挂载到 body
        body.appendChild(templateElement.content);
    }

    public static footer(body: HTMLBodyElement, footer: Footer): void {

    }
}