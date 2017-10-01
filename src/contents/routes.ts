import * as Hapi from "hapi";
import * as Joi from "joi";
import ContentController from "./content-controller";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, configs: IServerConfigurations) {

    const context = new ContentController(configs);
    server.bind(context);
    server.path(__dirname + '/../client');

    server.register(
        [require('inert')],
        (error) => {

            if (error) {
                console.log(`Error registering inert plugin: ${error}`);
            } else {
                server.route({
                    method: 'GET',
                    path: '/{filename*}',
                    config: {
                        handler: context.serveAllFile,
                        description: 'Serve all content from server.'
                    }
                });

                server.route({
                    method: 'GET',
                    path: '/',
                    config: {
                        handler: context.index,
                        description: 'Index path of RDU site'
                    }
                });

                server.route({
                    method: 'GET',
                    path: '/aboutus',
                    config: {
                        handler: context.aboutus,
                        description: 'AboutUs path'
                    }
                });

                server.route({
                    method: 'GET',
                    path: '/toward',
                    config: {
                        handler: context.roadmap,
                        description: 'toward path'
                    }
                });

                server.route({
                    method: 'GET',
                    path: '/media',
                    config: {
                        handler: context.media,
                        description: 'Media path'
                    }
                });

                server.route({
                    method: 'GET',
                    path: '/news',
                    config: {
                        handler: context.news,
                        description: 'News path'
                    }
                });

                server.route({
                    method: 'GET',
                    path: '/members',
                    config: {
                        handler: context.members,
                        description: 'Members path'
                    }
                });

                server.route({
                    method: 'GET',
                    path: '/contactus',
                    config: {
                        handler: context.contactus,
                        description: 'ContactUs path'
                    }
                });

                server.ext({
                    type: 'onPostHandler',
                    method: context.postHandler
                });

            }
        });
}