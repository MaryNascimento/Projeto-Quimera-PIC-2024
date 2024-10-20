import { inject, injectable } from "tsyringe";
import { IWaterOptionService } from "../interfaces/service/IWaterOptionService";
import { IWaterOptionRepository } from "../interfaces/repositories/IWaterOptionRepository";
import { IWaterOption } from "../interfaces/models/IWaterOptions";

@injectable()
export class WaterOptionService implements IWaterOptionService {
  constructor(
    @inject("WaterOptionRepository")
    private waterOptionRepository: IWaterOptionRepository
  ) {}

  async createWaterOption(waterOption: IWaterOption) {
    return this.waterOptionRepository.create(waterOption);
  }
  async getWaterOptionById(id: string) {
    return this.waterOptionRepository.findById(id);
  }
  async getWaterOptionByAnswerNumber(answerNumber: number) {
    return this.waterOptionRepository.findByAnswerNumber(answerNumber);
  }
  async getAllWaterOption() {
    return this.waterOptionRepository.findAll();
  }
  async updateWaterOption(id: string, waterOption: IWaterOption) {
    return this.waterOptionRepository.update(id, waterOption);
  }
  async deleteWaterOption(id: string) {
    return this.waterOptionRepository.delete(id);
  }
}
