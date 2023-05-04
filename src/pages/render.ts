import {marked} from "marked";
import {Header} from "../config/header";
import {Sidebar} from "../config/sidebar";
import {Template} from "../config/template";
import {Footer} from "../config/footer";

export default class Render {
    public static render(element: HTMLElement, header: Header, sidebar: Sidebar, template: Template, footer: Footer): void {
        document.getElementsByTagName("title")[0].innerText = template.title;

        // 保证外侧容器足够大
        element.style.width = "100%";
        element.style.height = "100%";

        // 头部 固定在 top
        let headerElement: HTMLElement = document.createElement("div");
        headerElement.style.width = "100%";
        headerElement.style.height = "5%";
        headerElement.style.position = "fixed";
        headerElement.style.top = "0";
        headerElement.style.left = "0";
        headerElement.style.zIndex = "100";
        headerElement.style.backgroundColor = "#000";
        headerElement.style.color = "#fff";
        headerElement.style.display = "flex";
        headerElement.style.justifyContent = "center";
        headerElement.style.alignItems = "center";

        headerElement.innerText = header.title;
        element.appendChild(headerElement);

        // 容器
        let containerElement: HTMLElement = document.createElement("div");
        let contentElement: HTMLElement = document.createElement("div");

        // 设置容器样式
        containerElement.style.width = "100%";
        containerElement.style.height = "100%";
        containerElement.style.display = "flex";
        containerElement.style.justifyContent = "center";
        containerElement.style.alignItems = "center";
        containerElement.style.marginTop = "5%";

        // 设置内容样式
        if (!template.fullScreen) contentElement.style.width = "60%";

        // 嵌入容器
        containerElement.appendChild(contentElement);
        element.appendChild(containerElement);

        // 渲染模板
        let templateElement: HTMLTemplateElement = document.createElement("template");

        // 获取 markdown 文件
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/${template.path[0]}`, false);
        xhr.onload = function () {
            templateElement.innerHTML = marked(xhr.responseText)
            contentElement.appendChild(templateElement.content);
        };
        xhr.send();
    }
}