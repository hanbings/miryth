import HashRouter from "./router/hash";
import Router from "./router/router";
import Route from "./router/route";
import Request from "./utils/request";
import {Config} from "./config/config";
import {HookEndpoint, Hooking, HookType} from "./api/hooks";
import {Render} from "./theme/render";

const logo =
    "        .__                 __  .__            \n" +
    "  _____ |__|______ ___.__._/  |_|  |__         \n" +
    " /     \\|  \\_  __ <   |  |\\   __\\  |  \\   \n" +
    "|  Y Y  \\  ||  | \\/\\___  | |  | |   Y  \\   \n" +
    "|__|_|  /__||__|   / ____| |__| |___|  /       \n" +
    "      \\/           \\/                \\/     \n";

class Miryth {
    static config: Config;
    static route: Route;

    public static init(): void {
        console.log(logo);

        // 预先渲染好页面
        new Render();

        // 延迟到页面加载完成
        window.onload = function () {
            // 从全局对象中获取配置文件
            // @ts-ignore
            let global = window.miryth as any;
            Miryth.config = new Config();
            let body: HTMLElement = document.body;

            for (let key in global) {
                if (typeof global[key] == "object") {
                    for (let k in global[key]) {
                        // overwrite config
                        Miryth.config[key][k] = global[key][k];
                    }
                }
            }

            // 清除默认样式
            body.style.margin = "0";
            body.style.padding = "0";

            // 撑开页面
            document.documentElement.style.height = "100%";
            document.documentElement.style.width = "100%";

            // 创建路由
            let router: Router = new HashRouter();
            Miryth.route = router.parse(window.location.hash.split("#")[1] ?? "");

            // 监听 hash 更改 更改后刷新页面
            window.onhashchange = function () {
                window.location.reload();
            }

            // 获取头部导航栏
            if (Miryth.config.header.nav == undefined) {
                new Request("/nav.json").get(
                    xhr => Miryth.config.header.nav = Array.from(JSON.parse(xhr.responseText))
                );
            }

            // 获取索引文件
            if (Miryth.config.content.index == undefined) {
                new Request("/index.json").get(
                    xhr => Miryth.config.content.index = Array.from(JSON.parse(xhr.responseText))
                );
            }

            // 调用 api
            Hooking.publish(HookEndpoint.CONTAINER, HookType.ON_LOAD, Miryth.config, body, Miryth.route);

            // 渲染页面
            let header: HTMLDivElement = Miryth.element("miryth-header", true, HookEndpoint.HEADER, HookEndpoint.HEADER_LEFT, HookEndpoint.HEADER_CENTER, HookEndpoint.HEADER_RIGHT);
            let banner: HTMLDivElement = Miryth.element("miryth-banner", false, HookEndpoint.BANNER);
            let content: HTMLDivElement = Miryth.element("miryth-content", true, HookEndpoint.CONTENT, HookEndpoint.CONTENT_LEFT, HookEndpoint.CONTENT_CENTER, HookEndpoint.CONTENT_RIGHT);
            let footer: HTMLDivElement = Miryth.element("miryth-footer", true, HookEndpoint.FOOTER, HookEndpoint.FOOTER_LEFT, HookEndpoint.FOOTER_CENTER, HookEndpoint.FOOTER_RIGHT);

            body.appendChild(header);
            body.appendChild(banner);
            body.appendChild(content);
            body.appendChild(footer);

            // 调用 api
            Hooking.publish(HookEndpoint.CONTAINER, HookType.ON_LOADED, Miryth.config, body, Miryth.route);
        };
    }

    private static element(
        id: string, slice: boolean, endpoint: HookEndpoint,
        leftSlice?: HookEndpoint, centerSlice?: HookEndpoint, rightSlice?: HookEndpoint
    ): HTMLDivElement {
        let element: HTMLDivElement = document.createElement("div");
        element.id = id;
        element.style.width = "100%";

        Hooking.publish(endpoint, HookType.ON_LOAD, Miryth.config, element, Miryth.route);

        if (slice) {
            let left: HTMLElement = document.createElement("div");
            left.id = `${id}-left`;
            Hooking.publish(leftSlice, HookType.ON_LOAD, Miryth.config, left, Miryth.route);
            Hooking.publish(leftSlice, HookType.ON_LOADED, Miryth.config, left, Miryth.route);

            let center: HTMLElement = document.createElement("div");
            center.id = `${id}-center`;
            Hooking.publish(centerSlice, HookType.ON_LOAD, Miryth.config, center, Miryth.route);
            Hooking.publish(centerSlice, HookType.ON_LOADED, Miryth.config, center, Miryth.route);

            let right: HTMLElement = document.createElement("div");
            right.id = `${id}-right`;
            Hooking.publish(rightSlice, HookType.ON_LOAD, Miryth.config, right, Miryth.route);
            Hooking.publish(rightSlice, HookType.ON_LOADED, Miryth.config, right, Miryth.route);

            element.appendChild(left);
            element.appendChild(center);
            element.appendChild(right);
        }

        Hooking.publish(endpoint, HookType.ON_LOADED, Miryth.config, element, Miryth.route);

        return element;
    }
}

Miryth.init();