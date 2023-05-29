import {HookEndpoint, Hooking, HookType} from "../api/hooks";
import Request from "../utils/request";
import {marked} from "marked";

export class Render {
    constructor() {
        this.renderHeader();
        this.renderBanner();
        this.renderContent();
        this.renderFooter();
    }

    public renderHeader() {
        Hooking.hook(
            HookEndpoint.HEADER,
            HookType.ON_LOAD,
            (config, element, route) => {
                element.style.width = '100%';
                element.style.height = '100%';

                element.style.display = 'flex';
                element.style.alignItems = 'center';
                element.style.justifyContent = 'center';

                element.style.marginTop = '80px';
            });

        Hooking.hook(
            HookEndpoint.HEADER_CENTER,
            HookType.ON_LOAD,
            (config, element, route) => {
                element.style.width = '95%';
                element.style.maxWidth = '630px';
                element.style.height = '100%';

                let title = document.createElement('h1');
                title.style.color = '#2c3e50';
                title.style.fontSize = '32px';
                title.style.fontWeight = 'bold';
                title.style.margin = '0px';
                title.style.padding = '0px';
                title.style.lineHeight = '1.5';
                title.style.wordBreak = 'break-word';
                title.style.whiteSpace = 'pre-wrap';
                title.innerText = config.header.title;

                let nav = document.createElement('div');

                element.appendChild(title);
                element.appendChild(nav);
            });
    }

    public renderBanner() {

    }

    public renderContent() {

    }

    public renderFooter() {

    }

    public renderMarkdown(element: HTMLElement, path: string): void {
        // 使用 fetch 获取 markdown 文件
        new Request(path).get().then((response) => {
            // 将 markdown 文件转换为 html
            let html = marked(response);

            // 渲染样式
            // 图片自适应
            element.querySelectorAll('img').forEach(node => {
                node.style.width = '100%';
                node.style.height = 'auto';
                node.style.borderRadius = '8px';
            });

            element.querySelectorAll('p').forEach(node => {
                node.style.color = '#2c3e50';
            });

            element.querySelectorAll('a').forEach(node => {
                node.style.color = '#0366d6';
                node.style.textDecoration = 'none';

                node.addEventListener('mouseover', () => {
                    node.style.color = '#30a9de';
                    node.style.textDecoration = 'underline';
                });
                node.addEventListener('mouseout', () => {
                    node.style.color = '#0366d6';
                    node.style.textDecoration = 'none';
                });
            });

            // pre 样式处理
            element.querySelectorAll('pre').forEach(node => {
                node.style.backgroundColor = '#f6f8fa';
                node.style.borderRadius = '8px';
                node.style.padding = '12px';
                node.style.margin = '20px 0px';
                node.style.display = 'flex';
                node.style.flexDirection = 'column';
            });

            element.querySelectorAll('code').forEach(node => {
                node.style.order = '2';
                node.style.width = '100%';
                node.style.color = '#1f2328';
                node.style.wordBreak = 'break-word';
                node.style.whiteSpace = 'pre-wrap';
            });

            // 将 html 内容写入到 element 中
            element.innerHTML = html;
        });
    }
}