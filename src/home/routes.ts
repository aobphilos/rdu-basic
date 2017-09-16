import * as Hapi from "hapi";
import * as Joi from "joi";
import HomeController from "./home-controller";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, configs: IServerConfigurations) {

    const context = new HomeController(configs);
    server.bind(context);

    server.route({
        method: 'GET',
        path: '/home',
        config: {
            handler: context.sayHello,
            description: 'Say hello from server',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Greet is good.'
                        },
                        '404': {
                            'description': 'Home does not exists.'
                        }
                    }
                }
            }
        }
    });
}