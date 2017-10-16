import * as Hapi from "hapi";
import Routes from "./routes";
import { IServerConfigurations, IEmailConfiguration } from "../configurations";

export function init(server: Hapi.Server, configs: IServerConfigurations, emailConfigs: IEmailConfiguration) {
    Routes(server, configs, emailConfigs);
}