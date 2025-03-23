import { inject, injectable } from "tsyringe";
import { IWaterResponseRepository } from "../interfaces/repositories/IWaterResponseRepository";
import { IWaterResponseService } from "../interfaces/service/IWaterResponseService";
import { IWaterResponse } from "../interfaces/models/IWaterResponse";

@injectable()
export class WaterResponseService implements IWaterResponseService {
  constructor(
    @inject("WaterResponseRepository")
    private waterResponseRepository: IWaterResponseRepository
  ) {}

  async createWaterResponse(waterResponse: IWaterResponse) {
    return this.waterResponseRepository.create(waterResponse);
  }
  async getWaterResponseByPin(pin: string) {
    return this.waterResponseRepository.findByPin(pin);
  }
  async getWaterResponseById(id: string) {
    return this.waterResponseRepository.findById(id);
  }
  async updateWaterResponse(id: string, waterResponse: IWaterResponse) {
    return this.waterResponseRepository.update(id, waterResponse);
  }
  async deleteWaterResponse(id: string) {
    return this.waterResponseRepository.delete(id);
  }
}
