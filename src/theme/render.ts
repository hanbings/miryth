import {HookEndpoint, Hooking, HookType} from "../api/hooks";
import {ContentRender} from "./content";

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
                header.addEventListener('click', () => window.location.href = '#/');

                header.innerText = config.header.title;
            });
    }

    public renderBanner() {
        Hooking.hook(
            HookEndpoint.BANNER,
            HookType.ON_LOAD,
            (config, banner, route) => {
                let height = (route.paths.length == 0 || route.paths[0] == '' || route.paths[0] == '/') ? 100 : 70;

                banner.style.height = `${height}%`;
                banner.style.width = '100%';

                // 插入图片
                banner.innerHTML = `
                    <div style="
                        height: ${height}vh; width: 100%; overflow: hidden;
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

                console.log(route);

                if (route.paths.length == 0 || route.paths[0] == '' || route.paths[0] == '/') {
                    content.appendChild(ContentRender.home(config, content));
                }

                config.content.index.forEach((item) => {
                    if (encodeURI(item.source) == route.path) {
                        content.appendChild(ContentRender.post(config, content, item));
                    }
                });
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
                    moeIcp.addEventListener('click', () => window.open('https://beian.miit.gov.cn/'));
                    moeIcp.addEventListener('mouseover', () => moeIcp.style.color = '#30a9de');
                    moeIcp.addEventListener('mouseout', () => moeIcp.style.color = '#666666');
                    container.appendChild(moeIcp);
                }

                if (config.footer.cnIcp) {
                    let cnIcp = document.createElement('div');
                    cnIcp.style.color = '#666666';
                    cnIcp.style.fontSize = '14px';
                    cnIcp.innerText = config.footer.cnIcp;
                    cnIcp.addEventListener('click', () => window.open('https://icp.gov.moe/'));
                    cnIcp.addEventListener('mouseover', () => cnIcp.style.color = '#30a9de');
                    cnIcp.addEventListener('mouseout', () => cnIcp.style.color = '#666666');
                    container.appendChild(cnIcp);
                }

                let love = document.createElement('div');
                love.style.color = '#666666';
                love.style.fontSize = '14px';
                love.style.marginTop = '10px';
                love.innerText = 'Powered by ✨ Miryth';
                love.addEventListener('click', () => window.open('https://github.com/hanbings/miryth'));
                love.addEventListener('mouseover', () => love.style.color = '#30a9de');
                love.addEventListener('mouseout', () => love.style.color = '#666666');
                container.appendChild(love);

                footer.appendChild(container);
            });
    }
}