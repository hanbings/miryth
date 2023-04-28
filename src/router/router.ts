export default interface Router {
    init(): void;

    parse(path: string): string[];
}