import * as Hapi from "hapi";
import * as Joi from "joi";
import LabelController from "./label-controller";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {

    const prefix = "/api";
    const labelController = new LabelController(configs, database);
    server.bind(labelController);

    server.route({
        method: 'GET',
        path: `${prefix}/label/{id}`,
        config: {
            handler: labelController.getLabelById,
            tags: ['api', 'label'],
            description: 'Get label by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                }
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Label founded.'
                        },
                        '404': {
                            'description': 'Label does not exists.'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: `${prefix}/label/all`,
        config: {
            handler: labelController.getLabelAll,
            tags: ['api', 'label'],
            description: 'Get all label.',
            validate: {
                query: {
                    top: Joi.number().default(10),
                    skip: Joi.number().default(0)
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: `${prefix}/label/find/drug/{keyword}`,
        config: {
            handler: labelController.getLabelByDrugName,
            tags: ['api', 'label'],
            description: 'Get label by drug name.',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Label founded.'
                        },
                        '404': {
                            'description': 'Label does not exists.'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: `${prefix}/label/find/group/{keyword}`,
        config: {
            handler: labelController.getLabelByGroupName,
            tags: ['api', 'label'],
            description: 'Get label by drug name.',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Label founded.'
                        },
                        '404': {
                            'description': 'Label does not exists.'
                        }
                    }
                }
            }
        }
    });

}