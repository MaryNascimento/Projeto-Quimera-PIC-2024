import { injectable } from "tsyringe";
import { IWaterResponseRepository } from "../interfaces/repositories/IWaterResponseRepository";
import { IWaterResponse } from "../interfaces/models/IWaterResponse";
import { WaterResponse } from "../models/WaterResponse";

@injectable()
export class WaterResponseRepository implements IWaterResponseRepository {
  async create(waterResponse: IWaterResponse) {
    const newWaterResponse = new WaterResponse(waterResponse);
    return await newWaterResponse.save();
  }
  async findByPin(pin: string) {
    return await WaterResponse.find({ pin });
  }
  async findById(id: string) {
    return await WaterResponse.findById(id);
  }
  async update(id: string, waterResponse: IWaterResponse) {
    return await WaterResponse.findByIdAndUpdate(id, waterResponse, {
      new: true,
    });
  }
  async delete(id: string) {
    await WaterResponse.findByIdAndDelete(id);
  }
}
