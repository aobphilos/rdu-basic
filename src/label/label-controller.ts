import * as Hapi from "hapi";
import * as Boom from "boom";
import { ILabel } from "./label";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";
import * as xlsx from 'excel';

export default class LabelController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.configs = configs;
        this.database = database;

    }

    private convertToJSON(array): any {
        var first = array[0].join();
        var headers = first.split(',');

        var jsonData = [];
        for (var i = 1, length = array.length; i < length; i++) {

            var myRow = array[i].join();
            var row = myRow.split(',');

            var data = {};
            for (var x = 0; x < row.length; x++) {
                data[headers[x]] = row[x];
            }
            jsonData.push(data);

        }
        return jsonData;
    }

    private loadData(excel): Promise<any> {
        const context = this;
        return new Promise<any>((resolve, reject) => {

            if (excel) {
                resolve(excel);
            } else {

                // Read Excel Sheet
                xlsx(__dirname + '/label.xlsx', function (err, data) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(context.convertToJSON(data));
                    }

                });

            }
        });

    }

    public async getLabelById(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let id = request.params["id"];

        let model = await this.database.labelModel.findOne({ drugId: id }).lean(true);
        if (model) {
            reply(model);
        } else {
            reply(Boom.notFound());
        }
    }

    public async getLabelAll(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let userId = request.auth.credentials.id;
        let top = request.query['top'];
        let skip = request.query['skip'];
        let model = await this.database.labelModel.find({}).lean(true).skip(skip).limit(top);

        return reply(model);
    }

    public async getLabelByDrugName(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let keyword = request.params["keyword"];
        let criteria = new RegExp(`^${keyword}`, `i`);

        let model = await this.database.labelModel
            .find().or([
                { 'drugNameThai': criteria },
                { 'drugNameEng': criteria }
            ])
            .lean(true)
            .limit(1);

        if (model) {
            reply(model);
        } else {
            reply(Boom.notFound());
        }
    }

    public async getLabelByGroupName(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let keyword = request.params["keyword"];

        let criteria = new RegExp(`^${keyword}`, `i`);

        let model = await this.database.labelModel
            .find().or([
                { 'groupNameThai': criteria },
                { 'groupNameEng': criteria }
            ])
            .lean(true)
            .limit(1);

        if (model) {
            reply(model);
        } else {
            reply(Boom.notFound());
        }
    }
}