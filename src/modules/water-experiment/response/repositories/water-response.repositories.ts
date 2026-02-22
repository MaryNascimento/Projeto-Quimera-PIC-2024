import { injectable } from "tsyringe";
import { WaterResponse } from "../schemas/water-response.schemas";
import { WaterResponseRepositoryTypes } from "../types/water-response.repositories.types";
import { WaterResponseTypes } from "../types/water-response.schemas.types";

@injectable()
export class WaterResponseRepository implements WaterResponseRepositoryTypes {
  async create(waterResponse: WaterResponseTypes) {
    const newWaterResponse = new WaterResponse(waterResponse);
    return await newWaterResponse.save();
  }
  async findByPin(pin: string) {
    return await WaterResponse.find({ pin });
  }
  async findById(id: string) {
    return await WaterResponse.findById(id);
  }
  async update(id: string, waterResponse: WaterResponseTypes) {
    return await WaterResponse.findByIdAndUpdate(id, waterResponse, {
      new: true,
    });
  }
  async delete(id: string) {
    await WaterResponse.findByIdAndDelete(id);
  }
}
