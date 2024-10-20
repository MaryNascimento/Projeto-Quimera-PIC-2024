import { IWaterOption } from "../models/IWaterOptions";

export interface IWaterOptionRepository {
  create(waterOption: IWaterOption): Promise<IWaterOption>;
  findById(id: string): Promise<IWaterOption | null>;
  findByAnswerNumber(answerNumber: number): Promise<IWaterOption[] | null>;
  findAll(): Promise<IWaterOption[]>;
  update(id: string, waterOption: IWaterOption): Promise<IWaterOption | null>;
  delete(id: string): Promise<void>;
}
