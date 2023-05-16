import {HookEndpoint, Hooking, HookType} from "../api/hooks";

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
            (config, header, route) => {
                header.style.backdropFilter = 'blur(8px)';
                header.style.width = '100%';
                header.style.height = '65px';
                header.style.position = 'fixed';
                header.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
            }
        )

        Hooking.hook(
            HookEndpoint.HEADER_LEFT,
            HookType.ON_LOAD,
            (config, header, route) => {
                header.style.width = '32%';
                header.style.height = '100%';
                header.style.display = 'flex';
                header.style.justifyContent = 'center';
                header.style.alignItems = 'center';
                header.style.color = '#fff';
                header.style.fontSize = '20px';
                header.style.fontWeight = 'bold';

                header.innerText = config.header.title;
            });
    }

    public renderBanner() {
        Hooking.hook(
            HookEndpoint.BANNER,
            HookType.ON_LOAD,
            (config, banner, route) => {
                banner.style.height = '100%';
                banner.style.width = '100%';

                // 插入图片
                banner.innerHTML = `
                    <div style="
                        height: 100vh; width: 100%; overflow: hidden;
                        display: flex; justify-content: center; align-items: center;
                        color: white; font-size: 32px;
                        background-image: url(${config.banner.background});
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;">
                        ${config.banner.slogan}
                    </div>
                `;
            }
        )
    }

    public renderContent() {
        Hooking.hook(
            HookEndpoint.CONTENT_CENTER,
            HookType.ON_LOAD,
            (config, content, route) => {
                content.style.width = '100%';
                content.style.backgroundColor = '#eeeeee';
                content.style.display = 'flex';
                content.style.justifyContent = 'center';
                content.style.alignItems = 'center';

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
                    }

                    if (post.preview) {
                        description.innerText = post.preview;
                        description.style.color = '#3c4858';
                        description.style.fontSize = '16px';
                        description.style.fontWeight = '400';
                        description.style.lineHeight = '24px';
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

                content.appendChild(container);
            }
        );
    }

    public renderFooter() {
        Hooking.hook(
            HookEndpoint.FOOTER,
            HookType.ON_LOAD,
            (config, footer, route) => {
                footer.style.height = '120px';
                footer.style.width = '100%';
                footer.style.backgroundColor = '#eeeeee';

                footer.style.paddingTop = '60px';
            });

        Hooking.hook(
            HookEndpoint.FOOTER_CENTER,
            HookType.ON_LOAD,
            (config, footer, route) => {
                let container = document.createElement('div');
                container.style.width = '100%';
                container.style.height = '100%';
                container.style.display = 'flex';
                container.style.justifyContent = 'center';
                container.style.alignItems = 'center';
                container.style.flexDirection = 'column';

                if (config.footer.moeIcp) {
                    let moeIcp = document.createElement('div');
                    moeIcp.style.color = '#666666';
                    moeIcp.style.fontSize = '14px';
                    moeIcp.innerText = config.footer.moeIcp;
                    container.appendChild(moeIcp);
                }

                if (config.footer.cnIcp) {
                    let cnIcp = document.createElement('div');
                    cnIcp.style.color = '#666666';
                    cnIcp.style.fontSize = '14px';
                    cnIcp.innerText = config.footer.cnIcp;
                    container.appendChild(cnIcp);
                }

                let love = document.createElement('div');
                love.style.color = '#666666';
                love.style.fontSize = '14px';
                love.style.marginTop = '10px';
                love.innerText = 'Powered by ✨ Miryth';
                container.appendChild(love);

                footer.appendChild(container);
            });
    }
}