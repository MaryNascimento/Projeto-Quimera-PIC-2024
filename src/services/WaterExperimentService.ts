import { inject, injectable } from "tsyringe";
import { IWaterExperiment } from "../interfaces/models/IWaterExperiment";
import { IWaterExperimentRepository } from "../interfaces/repositories/IWaterExperimentRepository";
import { IWaterExperimentService } from "../interfaces/service/IWaterExperimentService";

@injectable()
export class WaterExperimentService implements IWaterExperimentService {
  constructor(
    @inject("WaterExperimentRepository")
    private waterExperimentRepository: IWaterExperimentRepository
  ) {}

  async createWaterExperiment(waterExperiment: IWaterExperiment) {
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
  async updateWaterExperiment(id: string, waterExperiment: IWaterExperiment) {
    return this.waterExperimentRepository.update(id, waterExperiment);
  }
  async deleteWaterExperiment(id: string) {
    return this.waterExperimentRepository.delete(id);
  }
}
