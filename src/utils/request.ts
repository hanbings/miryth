export default class Request {
    constructor(
        public url: string
    ) {
    }

    public get(): Promise<string> {
        return fetch(this.url).then(response => response.text());
    }
}