import { inject, injectable } from "tsyringe";
import { WaterOptionsServiceTypes } from "../types/water-options.services.types";
import { WaterOptionsRepositoryTypes } from "../types/water-options.repositories.types";
import { WaterOptionsTypes } from "../types/water-options.schemas.types";

@injectable()
export class WaterOptionsService implements WaterOptionsServiceTypes {
  constructor(
    @inject("WaterOptionsRepository")
    private waterOptionsRepository: WaterOptionsRepositoryTypes,
  ) {}

  async createWaterOption(waterOption: WaterOptionsTypes) {
    return this.waterOptionsRepository.create(waterOption);
  }
  async getWaterOptionById(id: string) {
    return this.waterOptionsRepository.findById(id);
  }
  async getWaterOptionByAnswerNumber(answerNumber: number) {
    return this.waterOptionsRepository.findByAnswerNumber(answerNumber);
  }
  async getAllWaterOption() {
    return this.waterOptionsRepository.findAll();
  }
  async updateWaterOption(id: string, waterOption: WaterOptionsTypes) {
    return this.waterOptionsRepository.update(id, waterOption);
  }
  async deleteWaterOption(id: string) {
    return this.waterOptionsRepository.delete(id);
  }
}
