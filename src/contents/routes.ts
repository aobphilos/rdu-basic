import * as Hapi from "hapi";
import * as Joi from "joi";
import ContentController from "./content-controller";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, configs: IServerConfigurations) {

    const context = new ContentController(configs);
    server.bind(context);
    server.path(__dirname + '/../client');

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
            description: 'Default path for website.'
        }
    });
}