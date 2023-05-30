export class Footer {
    constructor(
        public html?: string,
        public moeIcp?: string,
        public cnIcp?: string,
    ) {
        this.cnIcp = '';
        this.moeIcp = '';
        this.html = '';
    }
}