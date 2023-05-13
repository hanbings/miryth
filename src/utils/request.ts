export default class Request {
    constructor(
        public url: string
    ) {
    }

    public get(callback: (XMLHttpRequest) => void): void {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', this.url, false);
        xhr.onload = () => {
            if (xhr.status === 200) {
                callback(xhr);
            }
        }
        xhr.send();
    }
}