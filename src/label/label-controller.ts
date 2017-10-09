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

        this.initLabelData();
    }

    private async initLabelData() {
        const first = await this.database.labelModel.findOne({ orderId: "1001" });
        if (!first) {
            const models = await this.loadData(null);
            this.database.labelModel.create(models);
        }
    }

    private mappingModel(model: ILabel, name: string, value: any) {
        switch (name) {
            case "OrderID": model.orderId = value; break;
            case "ATCCODE": model.atcCode = value; break;
            case "GenericNameThai": model.drugNameThai = value; break;
            case "GenericNameEng": model.drugNameEng = value; break;
            case "NLEMCode": model.groupNameEng = value; break;
            case "DrugClassThai": model.groupNameThai = value; break;
            case "Form": model.drugType = value; break;
            case "Ind1": model.termsOfUse1 = value; break;
            case "Ind2": model.termsOfUse2 = value; break;
            case "Ind3": model.termsOfUse3 = value; break;
            case "Ins1": model.instructionsForUse1 = value; break;
            case "Ins2": model.instructionsForUse2 = value; break;
            case "Ins3": model.instructionsForUse3 = value; break;
            case "SE1": model.adverseEffects1 = value; break;
            case "SE2": model.adverseEffects2 = value; break;
            case "SE3": model.adverseEffects3 = value; break;
            case "CI1": model.contraindication1 = value; break;
            case "CI2": model.contraindication2 = value; break;
            case "CI3": model.contraindication3 = value; break;
            case "Precaution1": model.medicationPrecautions1 = value; break;
            case "Precaution2": model.medicationPrecautions2 = value; break;
            case "Precaution3": model.medicationPrecautions3 = value; break;
            case "DI": model.combinationOtherDrugs = value; break;
            case "Storage": model.drugStorage = value; break;
        }
    }

    private convertToModel(array: Array<any>): Array<ILabel> {
        const first = array[0].join();
        const headers = first.split(',');

        let jsonData = new Array<ILabel>();
        for (let i = 1, length = array.length; i < length; i++) {

            let data = <ILabel>{};
            let myRow: string = array[i].join();
            let row: Array<string> = myRow.split(',');

            row.map((value, idx) => this.mappingModel(data, headers[idx], value));
            if (data.orderId) {
                jsonData.push(data);
            }

        }
        return jsonData;
    }

    private loadData(excel): Promise<Array<ILabel>> {
        const context = this;
        return new Promise<Array<ILabel>>((resolve, reject) => {

            if (excel) {
                resolve(excel);
            } else {

                // Read Excel Sheet
                xlsx(__dirname + '/label.xlsx', function (err, data) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(context.convertToModel(data));
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
            .lean(true);

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
            .lean(true);

        if (model) {
            reply(model);
        } else {
            reply(Boom.notFound());
        }
    }
}