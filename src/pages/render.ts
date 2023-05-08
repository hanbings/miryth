import {marked} from "marked";
import {Header} from "../config/header";
import {LeftSidebar, RightSidebar, Sidebar} from "../config/sidebar";
import {Template} from "../config/template";
import {Footer} from "../config/footer";
import Route from "../router/route";
import {HookEndpoint, Hooking, HookType} from "../api/hook";

export default class Render {
    public static renderHeader(header: Header, route: Route): HTMLDivElement {
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

    public static renderSidebar(sidebar: Sidebar, route: Route): HTMLDivElement {
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

    public static renderContent(template: Template, route: Route): HTMLDivElement {
        let element = document.createElement("div");

        // api 调用
        Hooking.hooks.get(HookEndpoint.CONTENT)?.forEach((hook) => {
            if (hook.type == HookType.BEFORE) hook.callback(element);
        });

        // 获取 markdown 文件
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/${template.path[0]}`, false);
        xhr.onload = function () {
            element.innerHTML = marked(xhr.responseText);
        };
        xhr.send();

        // 处理样式
        element.style.width = "60%";

        // api 调用
        Hooking.hooks.get(HookEndpoint.CONTENT)?.forEach((hook) => {
            if (hook.type == HookType.AFTER) hook.callback(element);
        });

        return element;
    }

    public static renderFooter(footer: Footer, route: Route): HTMLDivElement {
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

        element.innerHTML = `
            <h4 style="margin: 0; padding: 0;">萌ICP备 00000000 号</h4>
            <h4 style="margin: 0; padding: 0;">Powered by ⭐ Miryth</h4>
         `;

        // api 调用
        Hooking.hooks.get(HookEndpoint.FOOTER)?.forEach((hook) => {
            if (hook.type == HookType.AFTER) hook.callback(element);
        });

        return element;
    }
}