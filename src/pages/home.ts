import Config from "../config/config";
import Index from "./index";

export default class Home {
    public static index(element: HTMLDivElement, config: Config, index: Array<Index>) {
        let html = `
            <div style="
                height: 100%; width: 100%; overflow: hidden;
                display: flex; justify-content: center; align-items: center;
                color: white; font-size: 32px;
                background-image: url(${config.banner});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;">
                    ${config.slogan}
            </div>
        `;

        index.forEach((item) => {

        });

        element.innerHTML = html;
    }
}