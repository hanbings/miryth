import {Content} from "./content";
import {Header} from "./header";
import {Footer} from "./footer";
import Setting from "./setting";

export class Config {
    constructor(
        public setting?: Setting,
        public header?: Header,
        public content?: Content,
        public footer?: Footer,
    ) {
        this.setting = new Setting();
        this.header = new Header();
        this.content = new Content();
        this.footer = new Footer();
    }
}