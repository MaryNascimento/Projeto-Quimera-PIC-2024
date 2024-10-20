import { IWaterOption } from "../models/IWaterOptions";

export interface IWaterOptionService {
  createWaterOption(waterOption: IWaterOption): Promise<IWaterOption>;
  getWaterOptionById(id: string): Promise<IWaterOption | null>;
  getWaterOptionByAnswerNumber(
    answerNumber: number
  ): Promise<IWaterOption[] | null>;
  getAllWaterOption(): Promise<IWaterOption[]>;
  updateWaterOption(
    id: string,
    waterOption: IWaterOption
  ): Promise<IWaterOption | null>;
  deleteWaterOption(id: string): Promise<void>;
}
