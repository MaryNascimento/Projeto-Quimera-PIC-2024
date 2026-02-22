import { inject, injectable } from "tsyringe";
import { WaterExperimentServiceTypes } from "../types/water-experiment.services.types";
import { WaterExperimentTypes } from "../types/water-experiment.schemas.types";
import { WaterExperimentRepositoryTypes } from "../types/water-experiment.repositories.types";

@injectable()
export class WaterExperimentService implements WaterExperimentServiceTypes {
  constructor(
    @inject("WaterExperimentRepository")
    private waterExperimentRepository: WaterExperimentRepositoryTypes,
  ) {}

  async createWaterExperiment(waterExperiment: WaterExperimentTypes) {
    return this.waterExperimentRepository.create(waterExperiment);
  }
  async getWaterExperimentById(id: string) {
    return this.waterExperimentRepository.findById(id);
  }
  async getWaterExperimentByPin(pin: string) {
    return this.waterExperimentRepository.findByPin(pin);
  }
  async getWaterExperimentByTeacher(teacherId: string) {
    return this.waterExperimentRepository.findByTeacher(teacherId);
  }
  async updateWaterExperiment(
    id: string,
    waterExperiment: WaterExperimentTypes,
  ) {
    return this.waterExperimentRepository.update(id, waterExperiment);
  }
  async deleteWaterExperiment(id: string) {
    return this.waterExperimentRepository.delete(id);
  }
}
