import { Types } from "mongoose";

export interface IWaterExperiment {
  pin: string;
  teacher: Types.ObjectId | string;
  title: string;
  description: string;
  liberateSend: boolean;
  liberateResult: boolean;
  responsesNumber: number;
  createdAt: Date;
}
