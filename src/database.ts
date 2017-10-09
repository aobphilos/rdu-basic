import * as Mongoose from "mongoose";
import { IDataConfiguration } from "./configurations";
import { IUser, UserModel } from "./users/user";
import { ITask, TaskModel } from "./tasks/task";
import { ILabel, LabelModel } from "./label/label";

export interface IDatabase {
    userModel: Mongoose.Model<IUser>;
    taskModel: Mongoose.Model<ITask>;
    labelModel: Mongoose.Model<ILabel>;
}

export function init(config: IDataConfiguration): IDatabase {

    (<any>Mongoose).Promise = Promise;
    Mongoose.connect(process.env.MONGODB_URI || config.connectionString);

    let mongoDb = Mongoose.connection;

    mongoDb.on('error', () => {
        console.log(`Unable to connect to database: ${config.connectionString}`);
    });

    mongoDb.once('open', () => {
        console.log(`Connected to database: ${config.connectionString}`);
    });

    return {
        labelModel: LabelModel,
        taskModel: TaskModel,
        userModel: UserModel
    };
}