import Route from "./route";

export default interface Router {
    parse(path: string): Route;
}