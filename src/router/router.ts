import Route from "./route";

export default interface Router {
    init(): void;

    parse(path: string): Route;
}