import * as Hapi from "hapi";
import * as Boom from "boom";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default class HomeController {

    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations) {
        this.configs = configs;
    }

    public async sayHello(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply('Hello from server.');
    }
}