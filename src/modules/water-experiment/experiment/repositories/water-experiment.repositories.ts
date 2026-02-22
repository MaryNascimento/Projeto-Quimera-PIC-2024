import { injectable } from "tsyringe";
import { WaterExperimentRepositoryTypes } from "../types/water-experiment.repositories.types";
import { WaterExperimentTypes } from "../types/water-experiment.schemas.types";
import { WaterExperiment } from "../schemas/water-experiment.schemas";

@injectable()
export class WaterExperimentRepository implements WaterExperimentRepositoryTypes {
  async create(waterExperiment: WaterExperimentTypes) {
    const newWaterExperiment = new WaterExperiment(waterExperiment);
    return await newWaterExperiment.save();
  }
  async findById(id: string) {
    return await WaterExperiment.findById(id);
  }
  async findByPin(pin: string) {
    return await WaterExperiment.findOne({ pin });
  }
  async findByTeacher(teacherId: string): Promise<WaterExperimentTypes[]> {
    return await WaterExperiment.find({ teacher: teacherId });
  }
  async update(id: string, waterExperiment: WaterExperimentTypes) {
    return await WaterExperiment.findByIdAndUpdate(id, waterExperiment, {
      new: true,
    });
  }
  async delete(id: string) {
    await WaterExperiment.findByIdAndDelete(id);
  }
}
