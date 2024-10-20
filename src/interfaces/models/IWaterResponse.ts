import { IWaterOption } from "./IWaterOptions";

export interface IWaterResponse {
  studentName: string;
  pin: string;
  answerOne: IWaterOption;
  answerTwo: IWaterOption;
  score: number;
}
