import * as nconf from "nconf";
import * as path from "path";

//Read Configurations
const configs = new nconf.Provider({
    env: true,
    argv: true,
    store: {
        type: 'file',
        file: path.join(__dirname, `./config.${process.env.NODE_ENV || "develop"}.json`)
    }
});

export interface IServerConfigurations {
    port: number;
    plugins: Array<string>;
    jwtSecret: string;
    jwtExpiration: string;
    routePrefix: string;
}

export interface IDataConfiguration {
    connectionString: string;
}

export interface IEmailConfiguration {
    to: string;
    from: string;
    subject: string;
    text: string;
    html: string;
}

export function getDatabaseConfig(): IDataConfiguration {
    return configs.get("database");
}

export function getServerConfigs(): IServerConfigurations {
    return configs.get("server");
}

export function getEmailConfigs(): IEmailConfiguration {
    return configs.get("email");
}