import Route from "./route";
import Router from "./router";

export default class HashRouter implements Router {
    public parse(path: string): Route {
        return new Route(
            path.split("?")[0],
            path.split("?")[0].split('/').filter(segment => segment !== ""),
            new Map<string, string>(
                (path.split("?")[1]?.split("#")[0] ?? "")
                    .split("&")
                    .map(pair => pair.split("=") as [string, string])
            ),
            path.split("#")[1] ?? ""
        );
    }
}