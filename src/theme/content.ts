import {Config} from "../config/config";
import {Index} from "../config/content";
import {marked} from "marked";

export class ContentRender {
    public static home(config: Config, content: HTMLElement): HTMLDivElement {
        let container = document.createElement('div');
        container.style.width = '90%';
        container.style.maxWidth = '1100px';
        container.style.minHeight = '60px';
        container.style.backgroundColor = '#ffffff';
        container.style.borderRadius = '12px';
        container.style.marginTop = '30px';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.gap = '20px';
        container.style.paddingTop = '80px';
        container.style.paddingBottom = '80px';

        // 阴影
        container.style.boxShadow = '0 0 32px rgba(0, 0, 0, 0.5)';

        // 监听滑动事件
        window.addEventListener("scroll", function () {
            container.style.marginTop = `-${(window.scrollY / document.documentElement.clientHeight) * 160}px`;
        });

        config.content.index.forEach(post => {
            let div = document.createElement('div');
            let picture = document.createElement('div');

            let content = document.createElement('div');
            let title = document.createElement('div');
            let description = document.createElement('div');
            let other = document.createElement('div');

            let tags = document.createElement('div');
            let create = document.createElement('div');

            div.style.width = '80%';
            div.style.minHeight = '180px';
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';
            div.style.gap = '20px';

            content.style.height = '100%';

            // 如果有缩略图
            if (post.thumbnail) {
                content.style.width = '65%';
                content.style.display = 'flex';
                content.style.flexDirection = 'column';
                content.style.justifyContent = 'center';

                picture.style.width = '30%';
                picture.style.height = '180px';
                picture.style.boxShadow = '0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15)';
                picture.style.borderRadius = '12px';
                picture.style.backgroundImage = `url(${post.thumbnail})`;
                picture.style.backgroundSize = 'cover';
                picture.style.backgroundPosition = 'center';
            } else {
                content.style.width = '100%';
                content.style.display = 'flex';
                content.style.flexDirection = 'column';
                content.style.justifyContent = 'center';
                content.style.alignItems = 'center';
            }

            if (post.title) {
                title.innerText = post.title;
                title.style.color = '#3c4858';
                title.style.fontSize = '24px';
                title.style.fontWeight = '700';
                title.style.overflow = 'hidden';
                title.style.textOverflow = 'ellipsis';
                title.style.whiteSpace = 'nowrap';
                title.style.marginTop = '8px';
                title.style.marginBottom = '8px';

                title.addEventListener('mouseover', () => title.style.color = '#30a9de');
                title.addEventListener('mouseout', () => title.style.color = '#3c4858');
                title.addEventListener('click', () => window.location.href = `#${post.source}`);
            }

            if (post.preview) {
                description.innerText = post.preview;
                description.style.color = '#3c4858';
                description.style.fontSize = '16px';
                description.style.fontWeight = '400';
                description.style.lineHeight = '24px';

                description.addEventListener('mouseover', () => description.style.color = '#30a9de');
                description.addEventListener('mouseout', () => description.style.color = '#3c4858');
                description.addEventListener('click', () => window.location.href = `#${post.source}`);
            }

            other.style.height = '36px';
            other.style.display = 'flex';
            other.style.alignItems = 'center';
            other.style.gap = '20px';

            if (post.create) {
                create.innerHTML = `
                    <div style="color: #718096; font-size: 16px; font-weight: 400; display: flex; align-items: center;">
                        <i class="material-icons" style="font-size: 20px; width: 24px;">date_range</i> ${post.create}
                    </div>
                `;
            }

            if (post.tags) {
                tags.innerHTML = `
                      <div style="color:#718096; font-size: 16px; font-weight: 400; display: flex; align-items: center;">
                            <i class="material-icons" style="font-size: 20px; width: 24px;">local_offer</i> ${post.tags}
                      </div>
                `;
            }

            // 右侧文字
            content.appendChild(title);
            content.appendChild(description);
            content.appendChild(other);

            // other 里面的其他内容
            other.appendChild(create);
            other.appendChild(tags);

            // 左侧图片
            div.appendChild(picture);
            div.appendChild(content);

            container.appendChild(div);
        });

        return container;
    }

    public static post(config: Config, content: HTMLElement, index: Index): HTMLDivElement {
        let container = document.createElement('div');
        container.style.width = '90%';
        container.style.maxWidth = '1100px';
        container.style.minHeight = '60px';
        container.style.backgroundColor = '#ffffff';
        container.style.borderRadius = '12px';
        container.style.marginTop = '-80px';
        container.style.display = 'flex';
        container.style.flexDirection = 'row';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.paddingTop = '80px';
        container.style.paddingBottom = '80px';

        // 阴影
        container.style.boxShadow = '0 0 32px rgba(0, 0, 0, 0.5)';

        let markdown = document.createElement('div');
        markdown.style.width = '70%';

        fetch(index.source)
            .then(response => response.text())
            .then(text => {
                markdown.innerHTML = marked(text);

                // 图片自适应
                document.querySelectorAll('img').forEach(node => {
                    node.style.width = '100%';
                    node.style.height = 'auto';
                });

                // pre 样式处理
                document.querySelectorAll('pre').forEach(node => {
                    node.style.backgroundColor = '#f6f8fa';
                    node.style.borderRadius = '8px';
                    node.style.padding = '12px';
                    node.style.margin = '20px 0px';
                    node.style.display = 'flex';
                    node.style.flexDirection = 'column';
                });

                document.querySelectorAll('code').forEach(node => {
                    node.style.order = '2';
                    node.style.width = '100%';
                    node.style.color = '#1f2328';
                    node.style.wordBreak = 'break-word';
                    node.style.whiteSpace = 'pre-wrap';
                });
            });

        container.appendChild(markdown);

        return container;
    }
}