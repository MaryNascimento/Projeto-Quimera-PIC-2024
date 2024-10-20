import { injectable } from "tsyringe";
import { IWaterOption } from "../interfaces/models/IWaterOptions";
import { IWaterOptionRepository } from "../interfaces/repositories/IWaterOptionRepository";
import { WaterOption } from "../models/WaterOption";

@injectable()
export class WaterOptionRepository implements IWaterOptionRepository {
  async create(waterOption: IWaterOption) {
    const newWaterOption = new WaterOption(waterOption);
    return await newWaterOption.save();
  }
  async findById(id: string) {
    return await WaterOption.findById(id);
  }
  async findByAnswerNumber(answerNumber: number) {
    return await WaterOption.find({ answerNumber });
  }
  async findAll() {
    return await WaterOption.find();
  }
  async update(id: string, waterOption: IWaterOption) {
    return await WaterOption.findByIdAndUpdate(id, waterOption, {
      new: true,
    });
  }
  async delete(id: string) {
    await WaterOption.findByIdAndDelete(id);
  }
}
