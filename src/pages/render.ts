import {marked} from "marked";
import {Header} from "../config/header";
import {LeftSidebar, RightSidebar, Sidebar} from "../config/sidebar";
import {Template} from "../config/template";
import {Footer} from "../config/footer";
import Route from "../router/route";
import {HookEndpoint, Hooking, HookType} from "../api/hook";
import Config from "../config/config";

export default class Render {
    public static renderHeader(config: Config, header: Header, route: Route): HTMLDivElement {
        let element = document.createElement("div");

        // api 调用
        Hooking.hooks.get(HookEndpoint.HEADER)?.forEach((hook) => {
            if (hook.type == HookType.BEFORE) hook.callback(element);
        });

        element.style.width = "100%";
        element.style.height = "68px";
        element.style.position = "fixed";
        element.style.top = "0";
        element.style.left = "0";
        element.style.zIndex = "100";
        element.style.backgroundColor = "#000";
        element.style.color = "#fff";
        element.style.display = "flex";
        element.style.justifyContent = "center";
        element.style.alignItems = "center";
        element.innerText = header.title;

        // api 调用
        Hooking.hooks.get(HookEndpoint.HEADER)?.forEach((hook) => {
            if (hook.type == HookType.AFTER) hook.callback(element);
        });

        return element;
    }

    public static renderSidebar(config: Config, sidebar: Sidebar, route: Route): HTMLDivElement {
        let element = document.createElement("div");

        if (sidebar instanceof LeftSidebar) {
            // api 调用
            Hooking.hooks.get(HookEndpoint.LEFT)?.forEach((hook) => {
                if (hook.type == HookType.BEFORE) hook.callback(element);
            });

            // api 调用
            Hooking.hooks.get(HookEndpoint.LEFT)?.forEach((hook) => {
                if (hook.type == HookType.AFTER) hook.callback(element);
            });
        }

        if (sidebar instanceof RightSidebar) {
            // api 调用
            Hooking.hooks.get(HookEndpoint.RIGHT)?.forEach((hook) => {
                if (hook.type == HookType.BEFORE) hook.callback(element);
            });

            // api 调用
            Hooking.hooks.get(HookEndpoint.RIGHT)?.forEach((hook) => {
                if (hook.type == HookType.AFTER) hook.callback(element);
            });
        }

        return element;
    }

    public static renderContent(config: Config, template: Template, route: Route): HTMLDivElement {
        let element = document.createElement("div");

        // api 调用
        Hooking.hooks.get(HookEndpoint.CONTENT)?.forEach((hook) => {
            if (hook.type == HookType.BEFORE) hook.callback(element);
        });

        // 获取文档
        if (route.paths.length == 0 || route.paths[0] == "/") {
            // 获取 index.json 文件
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `/index.json`, false);
            xhr.onload = function () {
                let index = JSON.parse(xhr.responseText);
                let html = ``;

                element.innerHTML = html;
            }
            xhr.send();
        }

        if (route.paths.length > 1) {
            // 获取 markdown 文件
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `/${template.path[0]}`, false);
            xhr.onload = function () {
                element.innerHTML = marked(xhr.responseText);
            };
            xhr.send();
        }

        // 处理样式
        element.style.width = "60%";

        // api 调用
        Hooking.hooks.get(HookEndpoint.CONTENT)?.forEach((hook) => {
            if (hook.type == HookType.AFTER) hook.callback(element);
        });

        return element;
    }

    public static renderFooter(config: Config, footer: Footer, route: Route): HTMLDivElement {
        let element = document.createElement("div");

        // api 调用
        Hooking.hooks.get(HookEndpoint.FOOTER)?.forEach((hook) => {
            if (hook.type == HookType.BEFORE) hook.callback(element);
        });

        element.style.bottom = "0";
        element.style.height = "68px";
        // 居中
        element.style.width = "100%";
        element.style.display = "flex";
        element.style.flexDirection = "column";
        element.style.justifyContent = "center";
        element.style.alignItems = "center";

        let content = ``;
        if (footer.cnIcp) content += `<p style="margin: 0; padding: 0;">${footer.cnIcp}</p>`;
        if (footer.moeIcp) content += `<p style="margin: 0; padding: 0;">${footer.moeIcp}</p>`;
        content += footer.content;

        element.innerHTML = content;

        // api 调用
        Hooking.hooks.get(HookEndpoint.FOOTER)?.forEach((hook) => {
            if (hook.type == HookType.AFTER) hook.callback(element);
        });

        return element;
    }
}