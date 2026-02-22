import { injectable } from "tsyringe";
import { WaterOptionsRepositoryTypes } from "../types/water-options.repositories.types";
import { WaterOptionsTypes } from "../types/water-options.schemas.types";
import { WaterOptions } from "../schemas/water-options.schemas";

@injectable()
export class WaterOptionsRepository implements WaterOptionsRepositoryTypes {
  async create(waterOption: WaterOptionsTypes) {
    const newWaterOption = new WaterOptions(waterOption);
    return await newWaterOption.save();
  }
  async findById(id: string) {
    return await WaterOptions.findById(id);
  }
  async findByAnswerNumber(answerNumber: number) {
    return await WaterOptions.find({ answerNumber });
  }
  async findAll() {
    return await WaterOptions.find();
  }
  async update(id: string, waterOption: WaterOptionsTypes) {
    return await WaterOptions.findByIdAndUpdate(id, waterOption, {
      new: true,
    });
  }
  async delete(id: string) {
    await WaterOptions.findByIdAndDelete(id);
  }
}
