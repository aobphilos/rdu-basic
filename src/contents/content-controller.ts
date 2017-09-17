import * as Hapi from "hapi";
import * as Boom from "boom";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default class ContentController {

    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations) {
        this.configs = configs;
    }

    public async serveAllFile(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file(request.params.filename);
    }

    public async index(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("index.html");
    }

    public async aboutus(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("aboutus.html");
    }

    public async roadmap(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("roadmap.html");
    }

    public async media(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("media.html");
    }

    public async news(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("news.html");
    }

    public async members(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("members.html");
    }

    public async contactus(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("contactus.html");
    }
}