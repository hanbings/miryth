export default class Route {
    constructor(
        public path?: string,
        public paths?: string[],
        public query?: Map<string, string>,
        public fragment?: string,
    ) {
    }
}