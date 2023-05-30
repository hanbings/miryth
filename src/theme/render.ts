import {HookEndpoint, Hooking, HookType} from "../api/hooks";
import Request from "../utils/request";
import {marked} from "marked";

export class Render {
    constructor() {
        this.renderHeader();
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
            });

        Hooking.hook(
            HookEndpoint.HEADER_CENTER,
            HookType.ON_LOAD,
            (config, element, route) => {
                element.style.width = '88%';
                element.style.maxWidth = '630px';
                element.style.height = '100%';
                element.style.marginTop = '80px';

                let title = document.createElement('h1');
                title.style.color = '#000';
                title.style.fontSize = '32px';
                title.style.fontWeight = 'bold';
                title.style.margin = '0px';
                title.style.padding = '0px';
                title.style.lineHeight = '1.5';
                title.style.wordBreak = 'break-word';
                title.style.whiteSpace = 'pre-wrap';
                title.innerText = config.header.title;

                let navs = document.createElement('div');
                navs.style.display = 'flex';
                navs.style.alignItems = 'center';
                navs.style.marginTop = '20px';

                config.header.nav.forEach(item => {
                    let nav = document.createElement('div');
                    nav.style.marginRight = '10px';
                    nav.style.color = '#383838';
                    nav.style.textDecoration = 'none';
                    nav.style.fontSize = '16px';
                    nav.style.cursor = 'pointer';
                    nav.innerText = item.name;

                    // 鼠标移入
                    nav.addEventListener('mouseover', () => {
                        nav.style.color = '#30a9de';
                        nav.style.textDecoration = 'underline';
                    });

                    // 鼠标移出
                    nav.addEventListener('mouseout', () => {
                        nav.style.color = '#383838';
                        nav.style.textDecoration = 'none';
                    });

                    nav.addEventListener('click', () => {
                        window.location.href = `#${item.href}`;
                        window.location.reload();
                    });

                    navs.appendChild(nav);
                });

                element.appendChild(title);
                element.appendChild(navs);
            });
    }

    public renderContent() {
        Hooking.hook(
            HookEndpoint.CONTENT,
            HookType.ON_LOAD,
            (config, element, route) => {
                element.style.width = '100%';
                element.style.height = '100%';

                element.style.display = 'flex';
                element.style.alignItems = 'center';
                element.style.justifyContent = 'center';
            });

        Hooking.hook(
            HookEndpoint.CONTENT_CENTER,
            HookType.ON_LOAD,
            (config, element, route) => {
                element.style.width = '88%';
                element.style.maxWidth = '630px';
                element.style.height = '100%';
                element.style.marginTop = '20px';

                console.log(route);

                // 主页
                if (route.paths.length == 0 || route.path == '/' || route.path == '/index.html' || route.path == '/index') {
                    // 渲染 markdown
                    this.renderMarkdown(element, config.content.home.source);
                    return;
                }

                if (route.path == (config.content.about.path ? config.content.about.path : '/about')) {
                    this.renderMarkdown(element, config.content.about.source);
                    return;
                }

                if (route.path == (config.content.friends.path ? config.content.friends.path : '/friends')) {
                    this.renderMarkdown(element, config.content.friends.source);
                    return;
                }

                if (route.path == (config.content.posts.path ? config.content.posts.path : '/posts')) {
                    console.log(route.path)

                    let markdown = document.createElement('div');
                    this.renderMarkdown(markdown, config.content.posts.source);

                    let index = document.createElement('div');
                    config.content.posts.posts.forEach(post => {
                        let item = document.createElement('a');
                        item.innerText = post.title;
                        item.style.color = '#000';
                        item.style.fontSize = '16px';

                        item.addEventListener('click', () => {
                            window.location.href = `#${post.path}`;
                            window.location.reload();
                        });

                        index.appendChild(item);
                    });

                    element.appendChild(markdown);
                    element.appendChild(index);
                    return;
                }

                // 文章
                let isFound = false;
                config.content.posts.posts.forEach(post => {
                    if (route.path == post.path) {
                        isFound = true;
                        this.renderMarkdown(element, post.source);
                    }
                });

                if (!isFound) {
                    this.renderMarkdown(element, config.content.notfound.source);
                }
            });
    }

    public renderFooter() {
        Hooking.hook(
            HookEndpoint.FOOTER,
            HookType.ON_LOAD,
            (config, element, route) => {
                element.style.width = '100%';
                element.style.height = '100%';
                element.style.minHeight = '100px';

                element.style.display = 'flex';
                element.style.flexDirection = 'row';
                element.style.alignItems = 'center';
                element.style.justifyContent = 'center';
            });

        Hooking.hook(
            HookEndpoint.FOOTER_CENTER,
            HookType.ON_LOAD,
            (config, element, route) => {
                element.style.width = '88%';
                element.style.maxWidth = '630px';
                element.style.height = '100%';
                element.style.color = '#6b7280';
                element.style.fontSize = '13.2px';

                // 渲染 markdown
                element.innerHTML = `
                    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <a>${config.footer.cnIcp}</a>
                        <a>${config.footer.moeIcp}</a>
                        <a>${config.footer.html}</a>
                        Powered by ⭐ Miryth
                    </div> 
                `;
            });
    }

    public renderMarkdown(element: HTMLElement, path: string): void {
        // 使用 fetch 获取 markdown 文件
        new Request(path).get().then((response) => {
            // 将 markdown 文件转换为 html
            let html = marked(response);

            // 将 html 内容写入到 element 中
            let markdown = document.createElement('div');
            markdown.style.height = '100%';
            markdown.style.overflow = 'hidden';
            markdown.innerHTML = html;

            // 渲染样式
            // 图片自适应
            markdown.querySelectorAll('img').forEach(node => {
                node.style.maxWidth = '630px';
                node.style.height = 'auto';
            });

            markdown.querySelectorAll('p').forEach(node => {
                node.style.color = '#2c3e50';
            });

            markdown.querySelectorAll('a').forEach(node => {
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
            markdown.querySelectorAll('pre').forEach(node => {
                node.style.backgroundColor = '#f6f8fa';
                node.style.borderRadius = '8px';
                node.style.padding = '12px';
                node.style.margin = '20px 0px';
                node.style.display = 'flex';
                node.style.flexDirection = 'column';
            });

            markdown.querySelectorAll('code').forEach(node => {
                node.style.order = '2';
                node.style.width = '100%';
                node.style.color = '#1f2328';
                node.style.wordBreak = 'break-word';
                node.style.whiteSpace = 'pre-wrap';
            });

            element.appendChild(markdown);
        });
    }
}