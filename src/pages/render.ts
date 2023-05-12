import Route from "../router/route";
import {HookEndpoint, Hooking, HookType} from "../api/hook";
import Config from "../config/config";
import Index from "./index";
import Home from "./home";

export default class Render {
    public static renderHeader(config: Config, index: Array<Index>, route: Route): HTMLDivElement {
        let element = document.createElement("div");

        // api 调用
        Hooking.hooks.get(HookEndpoint.HEADER)?.forEach((hook) => {
            if (hook.type == HookType.BEFORE) hook.callback(element);
        });

        element.innerHTML =
            `
                <div style="
                    width: 100%; height: 65px; 
                    position: fixed; 
                    top: 0; left: 0; z-index: 100; 
                    color: #fff;
                    font-size: 20px; font-weight: bold;
                    display: flex; justify-content: center; align-items: center;
                    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);">
                        ${config.header.title}
                </div>
            `;

        // api 调用
        Hooking.hooks.get(HookEndpoint.HEADER)?.forEach((hook) => {
            if (hook.type == HookType.AFTER) hook.callback(element);
        });

        return element;
    }

    public static renderLeft(config: Config, index: Array<Index>, route: Route): HTMLDivElement {
        let element = document.createElement("div");

        // api 调用
        Hooking.hooks.get(HookEndpoint.LEFT)?.forEach((hook) => {
            if (hook.type == HookType.BEFORE) hook.callback(element);
        });

        // api 调用
        Hooking.hooks.get(HookEndpoint.LEFT)?.forEach((hook) => {
            if (hook.type == HookType.AFTER) hook.callback(element);
        });

        return element;
    }

    public static renderRight(config: Config, index: Array<Index>, route: Route): HTMLDivElement {
        let element = document.createElement("div");

        // api 调用
        Hooking.hooks.get(HookEndpoint.RIGHT)?.forEach((hook) => {
            if (hook.type == HookType.BEFORE) hook.callback(element);
        });

        // api 调用
        Hooking.hooks.get(HookEndpoint.RIGHT)?.forEach((hook) => {
            if (hook.type == HookType.AFTER) hook.callback(element);
        });

        return element;
    }

    public static renderContent(config: Config, index: Array<Index>, route: Route): HTMLDivElement {
        let element = document.createElement("div");

        // api 调用
        Hooking.hooks.get(HookEndpoint.CONTENT)?.forEach((hook) => {
            if (hook.type == HookType.BEFORE) hook.callback(element);
        });

        // 渲染主页目录
        if (route.path == "/" || route.paths.length == 0) Home.index(element, config, index);

        // 处理样式
        element.style.width = "100%";
        element.style.height = "100%";

        // api 调用
        Hooking.hooks.get(HookEndpoint.CONTENT)?.forEach((hook) => {
            if (hook.type == HookType.AFTER) hook.callback(element);
        });

        return element;
    }

    public static renderFooter(config: Config, index: Array<Index>, route: Route): HTMLDivElement {
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
        if (config.footer.cnIcp) content += `<p style="margin: 0; padding: 0;">${config.footer.cnIcp}</p>`;
        if (config.footer.moeIcp) content += `<p style="margin: 0; padding: 0;">${config.footer.moeIcp}</p>`;
        content += config.footer.content;

        element.innerHTML = content;

        // api 调用
        Hooking.hooks.get(HookEndpoint.FOOTER)?.forEach((hook) => {
            if (hook.type == HookType.AFTER) hook.callback(element);
        });

        return element;
    }
}