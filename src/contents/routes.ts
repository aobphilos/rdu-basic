import * as Hapi from "hapi";
import * as Joi from "joi";
import ContentController from "./content-controller";
import { IEmailConfiguration } from "../configurations";

export default function (server: Hapi.Server, configs: IEmailConfiguration) {

    // Config Static Path
    const context = new ContentController(configs);
    server.bind(context);
    server.path(__dirname + '/../client');

    // Config Sendgrid API-Key
    const mail = require('@sendgrid/mail');
    mail.setApiKey(process.env.SENDGRID_API_KEY);

    server.register(
        [require('inert')],
        (error) => {

            if (error) {
                console.log(`Error registering inert plugin: ${error}`);
            } else {

                server.ext({
                    type: 'onPostHandler',
                    method: context.postHandler
                });

                server.route([
                    {
                        method: 'GET',
                        path: '/{filename*}',
                        handler: context.serveAllFile
                    },
                    {
                        method: 'GET',
                        path: '/',
                        handler: context.index
                    },
                    {
                        method: 'GET',
                        path: '/aboutus',
                        handler: context.aboutus
                    },
                    {
                        method: 'GET',
                        path: '/history',
                        handler: context.history
                    },
                    {
                        method: 'GET',
                        path: '/please',
                        handler: context.please
                    },
                    {
                        method: 'GET',
                        path: '/performance',
                        handler: context.performance
                    },
                    {
                        method: 'GET',
                        path: '/toward',
                        handler: context.toward
                    },
                    {
                        method: 'GET',
                        path: '/instructional',
                        handler: context.instructional
                    },
                    {
                        method: 'GET',
                        path: '/elearning',
                        handler: context.elearning
                    },
                    {
                        method: 'GET',
                        path: '/documents',
                        handler: context.documents
                    },
                    {
                        method: 'GET',
                        path: '/video',
                        handler: context.video
                    },
                    {
                        method: 'GET',
                        path: '/application',
                        handler: context.application
                    },
                    {
                        method: 'GET',
                        path: '/other',
                        handler: context.other
                    },
                    {
                        method: 'GET',
                        path: '/news',
                        handler: context.news
                    },
                    {
                        method: 'GET',
                        path: '/committee',
                        handler: context.committee
                    },
                    {
                        method: 'GET',
                        path: '/contactus',
                        handler: context.contactus
                    },
                    {
                        method: 'POST',
                        path: '/contactus',
                        handler: function (request, reply) {
                            return context.sendMailToUs(request, reply, mail);
                        }
                    }
                ]);

            }

        });
}