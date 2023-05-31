import {HookEndpoint, Hooking, HookType} from "../api/hooks";
import Request from "../utils/request";
import {marked} from "marked";
import {Post} from "../config/content";

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

                let isFound = false;
                config.content.posts.posts.forEach(post => {
                    if (route.path == post.path) isFound = true;
                });

                let title = document.createElement('a');
                title.style.color = '#000';
                title.style.fontSize = isFound ? '24px' : '32px';
                title.style.fontWeight = 'bold';
                title.style.margin = '0px';
                title.style.padding = '0px';
                title.style.lineHeight = '1.5';
                title.style.wordBreak = 'break-word';
                title.style.whiteSpace = 'pre-wrap';
                title.style.textDecoration = 'none';
                title.innerText = config.header.title;
                title.href = '#';

                let navs = document.createElement('div');
                navs.style.display = isFound ? 'none' : 'flex';
                navs.style.alignItems = 'center';
                navs.style.marginTop = '20px';

                if (!isFound) {
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
                }

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

                    // 有序 map index [年份] -> [当年的文章列表]
                    let index = new Map<number, Array<Post>>();

                    let markdown = document.createElement('div');
                    this.renderMarkdown(markdown, config.content.posts.source);

                    let parts = document.createElement('div');

                    // 遍历文章 按年份分类 包括年月日
                    // 时间格式 2023-05-30 12:00:00
                    let years = new Map<number, Array<Post>>();
                    config.content.posts.posts.forEach(post => {
                        // 先按年分类
                        let year = post.create.split('-')[0];
                        if (!years.has(parseInt(year))) {
                            years.set(parseInt(year), new Array<Post>());
                        }
                        years.get(parseInt(year)).push(post);
                    });

                    // 按照年份从大到小排序
                    let sortedYears = Array.from(years.keys()).sort((a, b) => b - a);
                    sortedYears.forEach(year => {
                        let posts = years.get(year);

                        // 对每个年份对应的 Array<Post> 进行排序
                        let sortedPosts = posts.sort((a, b) => {
                            let timeA = new Date(a.create).getTime();
                            let timeB = new Date(b.create).getTime();
                            let distanceA = Math.abs(Date.now() - timeA);
                            let distanceB = Math.abs(Date.now() - timeB);
                            return distanceA - distanceB;
                        });

                        // 将排序后的 Array<Post> 再放回 Map 中
                        index.set(year, sortedPosts);
                    });

                    // 遍历并生成
                    index.forEach((posts, year) => {
                        let part = document.createElement('div');
                        let tags = document.createElement('div');
                        let collection = document.createElement('div');

                        // 年份字体
                        tags.innerHTML = `<span style="font-size: 20px; font-weight: bold;">${year}</span>`;

                        posts.forEach(post => {
                            let row = document.createElement('div');

                            // 图标
                            let icon = document.createElement('div');
                            // 时间
                            let time = document.createElement('div');
                            // 文章 title
                            let title = document.createElement('div');

                            // 设置样式
                            row.style.display = 'flex';
                            row.style.alignItems = 'center';
                            // 判断是否为移动端
                            if (window.innerWidth <= 768) {
                                row.style.minHeight = '20px';
                            } else {
                                row.style.height = '20px';
                            }
                            row.style.marginTop = '10px';
                            row.style.marginLeft = '16px';

                            icon.style.width = '16px';
                            icon.style.height = '16px';
                            icon.style.display = 'flex';
                            icon.style.alignItems = 'center';
                            icon.style.justifyContent = 'center';
                            icon.style.color = '#666666';
                            icon.innerHTML = `<i class="${post.icon}"></i>`;

                            time.style.minWidth = '100px';
                            time.style.textAlign = 'center';
                            time.style.color = '#666666';
                            time.style.fontSize = '13px';
                            time.innerText = post.create.split(' ')[0];

                            title.style.cursor = 'pointer';
                            title.style.color = '#383838';
                            title.style.fontSize = '16px';
                            // 文字自动换行
                            title.style.wordBreak = 'break-all';
                            title.innerText = post.title;
                            title.addEventListener('click', () => {
                                window.location.href = `#${post.path}`;
                                window.location.reload();
                            });

                            // 下划线
                            // 判断是否为移动端
                            if (window.innerWidth > 768) {
                                title.style.borderBottom = '1px solid #383838';
                                title.addEventListener('mouseover', () => title.style.borderBottom = '2px solid #666666');
                                title.addEventListener('mouseout', () => title.style.borderBottom = '1px solid #383838');
                            }

                            row.appendChild(icon);
                            row.appendChild(time);
                            row.appendChild(title);

                            collection.appendChild(row);
                        });

                        part.appendChild(tags);
                        part.appendChild(collection);

                        parts.appendChild(part);
                    });

                    element.appendChild(markdown);
                    element.appendChild(parts);
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
                element.style.minHeight = '130px';

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