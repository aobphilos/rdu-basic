import * as Hapi from "hapi";
import Routes from "./routes";
import { IEmailConfiguration } from "../configurations";

export function init(server: Hapi.Server, configs: IEmailConfiguration) {
    Routes(server, configs);
}