import { injectable } from "tsyringe";
import { IWaterExperiment } from "../interfaces/models/IWaterExperiment";
import { IWaterExperimentRepository } from "../interfaces/repositories/IWaterExperimentRepository";
import { WaterExperiment } from "../models/WaterExperiment";

@injectable()
export class WaterExperimentRepository implements IWaterExperimentRepository {
  async create(waterExperiment: IWaterExperiment) {
    const newWaterExperiment = new WaterExperiment(waterExperiment);
    return await newWaterExperiment.save();
  }
  async findById(id: string) {
    return await WaterExperiment.findById(id);
  }
  async findByPin(pin: string) {
    return await WaterExperiment.findOne({ pin });
  }
  async findByTeacher(teacherId: string): Promise<IWaterExperiment[]> {
    return await WaterExperiment.find({ teacher: teacherId });
  }
  async update(id: string, waterExperiment: IWaterExperiment) {
    return await WaterExperiment.findByIdAndUpdate(id, waterExperiment, {
      new: true,
    });
  }
  async delete(id: string) {
    await WaterExperiment.findByIdAndDelete(id);
  }
}
