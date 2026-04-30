import { inject, injectable } from "tsyringe";
import { WaterOptionsServiceTypes } from "../types/water-options.services.types";
import { WaterOptionsRepositoryTypes } from "../types/water-options.repositories.types";
import { WaterOptionsTypes } from "../types/water-options.schemas.types";
import ServiceError, { ServiceErrorType } from "../../../../shared/errors/ServiceError";

// business rules for WaterOptions

@injectable()
export class WaterOptionsService implements WaterOptionsServiceTypes {
  constructor(
    @inject("WaterOptionsRepository")
    private waterOptionsRepository: WaterOptionsRepositoryTypes,
  ) {}

  async createWaterOption(waterOption: WaterOptionsTypes) {
    if (!waterOption.value || waterOption.weigth === undefined || waterOption.answerNumber === undefined) {
      throw new ServiceError("Campos obrigatórios da opção ausentes", ServiceErrorType.BadRequest);
    }

    return this.waterOptionsRepository.create(waterOption);
  }
  async getWaterOptionById(id: string) {
    const option = await this.waterOptionsRepository.findById(id);
    if (!option) throw new ServiceError("Opção não encontrada", ServiceErrorType.NotFound);
    return option;
  }
  async getWaterOptionByAnswerNumber(answerNumber: number) {
    const options = await this.waterOptionsRepository.findByAnswerNumber(answerNumber);
    if (!options || options.length === 0) throw new ServiceError("Opções não encontradas para o número de resposta", ServiceErrorType.NotFound);
    return options;
  }
  async getAllWaterOption() {
    return this.waterOptionsRepository.findAll();
  }
  async updateWaterOption(id: string, waterOption: WaterOptionsTypes) {
    const existing = await this.waterOptionsRepository.findById(id);
    if (!existing) throw new ServiceError("Opção não encontrada", ServiceErrorType.NotFound);
    return this.waterOptionsRepository.update(id, waterOption);
  }
  async deleteWaterOption(id: string) {
    const existing = await this.waterOptionsRepository.findById(id);
    if (!existing) throw new ServiceError("Opção não encontrada", ServiceErrorType.NotFound);
    return this.waterOptionsRepository.delete(id);
  }
}
