import {marked} from "marked";
import {Header} from "../config/header";
import {Sidebar} from "../config/sidebar";
import {Template} from "../config/template";
import {Footer} from "../config/footer";
import Route from "../router/route";

export default class Render {
    public static renderHeader(header: Header, route: Route): HTMLDivElement {
        let element = document.createElement("div");

        element.style.width = "100%";
        element.style.height = "5%";
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

        return element;
    }

    public static renderSidebar(sidebar: Sidebar, route: Route): HTMLDivElement {
        let element = document.createElement("div");
        return element;
    }

    public static renderContent(template: Template, route: Route): HTMLDivElement {
        let element = document.createElement("div");

        // 获取 markdown 文件
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/${template.path[0]}`, false);
        xhr.onload = function () {
            element.innerHTML = marked(xhr.responseText);
        };
        xhr.send();

        // 处理样式
        element.style.width = "60%";

        return element;
    }

    public static renderFooter(footer: Footer, route: Route): HTMLDivElement {
        let element = document.createElement("div");
        return element;
    }
}