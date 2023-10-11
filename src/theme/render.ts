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
            (config, element) => {
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
                navs.style.height = '26px';

                if (!isFound) {
                    config.header.nav.forEach(item => {
                        let nav = document.createElement('div');
                        nav.style.marginRight = '10px';
                        nav.style.color = '#383838';
                        nav.style.textDecoration = 'none';
                        nav.style.fontSize = '16px';
                        nav.style.cursor = 'pointer';
                        nav.innerText = item.name;

                        nav.style.borderBottom = '0px solid #383838';
                        nav.addEventListener('mouseover', () => nav.style.borderBottom = '2px solid #666666');
                        nav.addEventListener('mouseout', () => nav.style.borderBottom = '0px solid #383838');
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
            (config, element) => {
                element.style.width = '100%';
                element.style.height = '100%';

                element.style.display = 'flex';
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

                    let friends = document.createElement('div');
                    friends.style.display = 'flex';
                    friends.style.flexDirection = 'column';
                    friends.style.gap = '10px';
                    friends.style.marginTop = '20px';

                    config.content.friends.friends.forEach(friend => {
                        let item = document.createElement('div');
                        item.style.display = 'flex';
                        item.style.alignItems = 'center';

                        let avatar = document.createElement('img');
                        avatar.style.width = '42px';
                        avatar.style.height = '42px';
                        avatar.style.borderRadius = '50%';
                        avatar.src = friend.avatar;

                        let text = document.createElement('div');
                        text.style.display = 'flex';
                        text.style.flexDirection = 'column';
                        text.style.marginLeft = '10px';

                        let name = document.createElement('a');
                        name.style.marginLeft = '10px';
                        name.style.fontSize = '16px';
                        name.style.color = '#000';
                        name.style.textDecoration = 'none';
                        name.innerText = friend.name;
                        name.href = friend.link;

                        name.addEventListener('mouseover', () => name.style.color = '#666');
                        name.addEventListener('mouseout', () => name.style.color = '#000');

                        let desc = document.createElement('div');
                        desc.style.marginLeft = '10px';
                        desc.style.fontSize = '14px';
                        desc.style.color = '#666';
                        desc.innerText = friend.about;

                        text.appendChild(name);
                        text.appendChild(desc);

                        item.appendChild(avatar);
                        item.appendChild(text);

                        friends.appendChild(item);
                    });

                    element.appendChild(friends);
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

        Hooking.hook(
            HookEndpoint.CONTENT_RIGHT,
            HookType.ON_LOADED,
            (config, element, route) => {
                // 文章
                let isFound = false;
                config.content.posts.posts.forEach(post => {
                    if (route.path == post.path) {
                        isFound = true;
                    }
                });

                if (isFound && window.innerWidth >= 1024) {
                    let tools = document.createElement('div');

                    tools.style.width = '20%';
                    tools.style.maxWidth = '360px';
                    tools.style.height = '100px';

                    //固定在父容器的右上角
                    tools.style.position = 'fixed';
                    tools.style.right = '0';

                    let bar = document.createElement('div');
                    bar.style.width = '70%';
                    bar.style.height = '36px';
                    bar.style.color = '#383838';
                    bar.style.display = 'flex';
                    bar.style.flexDirection = 'row';
                    bar.style.justifyContent = 'flex-end';
                    // 返回顶部和复制链接
                    bar.innerHTML = `<i class="fa fa-arrow-up"></i>`;

                    bar.addEventListener('click', () => this.smoothScroll(0, 1000));
                    bar.addEventListener('mouseover', () => bar.style.color = '#666666');
                    bar.addEventListener('mouseout', () => bar.style.color = '#383838');

                    let catalog = document.createElement('div');
                    catalog.style.width = '75%';
                    catalog.style.display = 'flex';
                    catalog.style.flexDirection = 'column';
                    catalog.style.justifyContent = 'flex-start';

                    // 循环等待三秒 一秒一次 等待网络请求完成加载目录
                    setTimeout(() => {
                        for (let deep = 1; deep <= 3; deep++) {
                            document.querySelectorAll<HTMLHeadingElement>('h' + deep).forEach(element => {
                                let div = document.createElement('div');
                                div.innerHTML = `
                                    <div style="margin-left: ${16 + (5 * deep)}px;" />
                                    <span style="color: #3e3e3e;">#</span>
                                    <span style="font-size: 13px; color: #383838;">${element.textContent}</span>
                                `;

                                div.addEventListener('click', () => this.smoothScroll(element.offsetTop - 100, 1000));
                                div.addEventListener('mouseover', () => div.style.textDecoration = 'underline');
                                div.addEventListener('mouseout', () => div.style.textDecoration = 'none');

                                catalog.appendChild(div);
                            });
                        }
                    }, 3000);

                    tools.appendChild(bar);
                    tools.appendChild(catalog);

                    element.appendChild(tools);
                }
            });
    }

    public renderFooter() {
        Hooking.hook(
            HookEndpoint.FOOTER,
            HookType.ON_LOAD,
            (config, element) => {
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
            (config, element) => {
                element.style.width = '88%';
                element.style.maxWidth = '630px';
                element.style.height = '100%';
                element.style.color = '#6b7280';
                element.style.fontSize = '13.2px';

                // 渲染 markdown
                element.innerHTML = `
                    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <a href="https://beian.miit.gov.cn/">${config.footer.cnIcp}</a>
                        <a href="https://icp.gov.moe/">${config.footer.moeIcp}</a>
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

                if (window.innerWidth < 1024) node.style.maxWidth = '100%';
            });

            markdown.querySelectorAll('p').forEach(node => {
                node.style.color = '#2c3e50';
            });

            markdown.querySelectorAll('a').forEach(node => {
                node.style.color = '#383838';
                node.style.textDecoration = 'none';

                node.style.borderBottom = '1px solid #383838';
                node.addEventListener('mouseover', () => node.style.borderBottom = '2px solid #666666');
                node.addEventListener('mouseout', () => node.style.borderBottom = '1px solid #383838');
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

    public smoothScroll(targetPosition, duration) {
        const startPosition = window.scrollX;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) {
                startTime = currentTime;
            }
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
}