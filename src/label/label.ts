import * as Mongoose from "mongoose";

export interface ILabel extends Mongoose.Document {
  drugId: string;
  drugNameThai: string;
  drugNameEng: string;
  drugType: string;
  groupNameThai: string;
  groupNameEng: string;
  termsOfUse1: string;
  termsOfUse2: string;
  termsOfUse3: string;
  instructionsForUse1: string;
  instructionsForUse2: string;
  instructionsForUse3: string;
  adverseEffects1: string;
  adverseEffects2: string;
  adverseEffects3: string;
  contraindication1: string;
  contraindication2: string;
  contraindication3: string;
  medicationPrecautions1: string;
  medicationPrecautions2: string;
  medicationPrecautions3: string;
  combinationOtherDrugs: string;
  drugStorage: string;
  createdAt: Date;
  updateAt: Date;
}


export const LabelSchema = new Mongoose.Schema(
  {
    orderId: String,
    atcCode: String,
    drugNameThai: String,
    drugNameEng: String,
    drugType: String,
    groupNameThai: String,
    groupNameEng: String,
    termsOfUse1: String,
    termsOfUse2: String,
    termsOfUse3: String,
    instructionsForUse1: String,
    instructionsForUse2: String,
    instructionsForUse3: String,
    adverseEffects1: String,
    adverseEffects2: String,
    adverseEffects3: String,
    contraindication1: String,
    contraindication2: String,
    contraindication3: String,
    medicationPrecautions1: String,
    medicationPrecautions2: String,
    medicationPrecautions3: String,
    combinationOtherDrugs: String,
    drugStorage: String
  },
  {
    timestamps: true
  });

export const LabelModel = Mongoose.model<ILabel>('Label', LabelSchema);