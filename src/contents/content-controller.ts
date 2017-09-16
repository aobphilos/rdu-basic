import * as Hapi from "hapi";
import * as Boom from "boom";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default class ContentController {

    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations) {
        this.configs = configs;
    }

    public async index(request: Hapi.Request, reply: any) {
        return reply.file("index.html");
    }

    public async serveAllFile(request: Hapi.Request, reply: any) {
        return reply.file(request.params.filename);
    }
}