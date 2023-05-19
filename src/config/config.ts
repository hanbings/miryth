import {Content} from "./content";
import {Header} from "./header";
import {Banner} from "./banner";
import {Footer} from "./footer";
import Setting from "./setting";

export class Config {
    constructor(
        public setting?: Setting,
        public header?: Header,
        public banner?: Banner,
        public content?: Content,
        public footer?: Footer,
    ) {
        this.setting = new Setting();
        this.header = new Header();
        this.banner = new Banner();
        this.content = new Content();
        this.footer = new Footer();
    }
}