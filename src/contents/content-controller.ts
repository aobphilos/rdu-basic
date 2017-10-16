import * as Hapi from "hapi";
import * as Boom from "boom";
import { IDatabase } from "../database";
import { IServerConfigurations, IEmailConfiguration } from "../configurations";
import { IContact } from "./contact";

export default class ContentController {

    private configs: IServerConfigurations;
    private emailConfigs: IEmailConfiguration;
    private emailService: any;

    constructor(configs: IServerConfigurations, emailconfigs: IEmailConfiguration, emailservice: any) {
        this.configs = configs;
        this.emailConfigs = emailconfigs;
        this.emailService = emailservice;
    }

    public async postHandler(request: Hapi.Request, reply: Hapi.ReplyWithContinue) {

        const response = request.response;
        if (response.isBoom &&
            response.output.statusCode === 404) {

            return reply.file('404.html').code(404);
        }

        return reply.continue();
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

    public async history(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("history.html");
    }

    public async please(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("please.html");
    }

    public async performance(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("performance.html");
    }

    public async toward(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("toward.html");
    }

    public async instructional(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("instructional.html");
    }

    public async elearning(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("elearning.html");
    }

    public async documents(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("documents.html");
    }

    public async video(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("video.html");
    }

    public async application(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("application.html");
    }

    public async other(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("other.html");
    }

    public async news(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("news.html");
    }

    public async committee(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("committee.html");
    }

    public async contactus(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        return reply.file("contactus.html");
    }

    public async sendMailToUs(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const contact: IContact = request.payload;
        const { to, from, subject, html, text } = this.emailConfigs;
        let emailForm = {
            to: to,
            from: contact.email,
            subject: contact.subject,
            html: "<strong>" + contact.message + "</strong>"
        };

        return this.emailService
            .send(emailForm)
            .then((response) => {
                return reply({ sucess: true });
            })
            .fail((err) => {
                return reply({ sucess: false, error: err });
            });
    }
}