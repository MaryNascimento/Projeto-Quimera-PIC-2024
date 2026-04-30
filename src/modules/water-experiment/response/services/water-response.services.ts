import { inject, injectable } from "tsyringe";
import { WaterResponseServiceTypes } from "../types/water-response.services.types";
import { WaterResponseRepositoryTypes } from "../types/water-response.repositories.types";
import { WaterResponseTypes } from "../types/water-response.schemas.types";
import ServiceError, { ServiceErrorType } from "../../../../shared/errors/ServiceError";
import { ErrorCode } from "../../../../shared/errors/errorCodes";
import { WaterOptions } from "../../options/schemas/water-options.schemas";
import { Types } from "mongoose";

@injectable()
export class WaterResponseService implements WaterResponseServiceTypes {
  constructor(
    @inject("WaterResponseRepository")
    private waterResponseRepository: WaterResponseRepositoryTypes,
  ) {}

  async createWaterResponse(waterResponse: WaterResponseTypes) {
    if (!waterResponse.pin) {
      throw new ServiceError("PIN do experimento é obrigatório", ServiceErrorType.BadRequest, undefined, ErrorCode.RESPONSE_PIN_REQUIRED);
    }
    const resolveWeight = async (ans: any) => {
      if (!ans) return 0;
      if (typeof ans === "object" && "weight" in ans) return Number(ans.weight) || 0;
      if (Types.ObjectId.isValid(ans)) {
        const doc = await WaterOptions.findById(ans).lean();
        if (!doc) throw new ServiceError("Opção não encontrada", ServiceErrorType.NotFound, undefined, ErrorCode.OPTION_NOT_FOUND);
        return Number((doc as any).weight) || 0;
      }
      return 0;
    };

    const score =
      (await resolveWeight(waterResponse.answerOne)) +
      (await resolveWeight(waterResponse.answerTwo));
    const toSave: WaterResponseTypes = { ...waterResponse, score };

    return this.waterResponseRepository.create(toSave);
  }
  async getWaterResponseByPin(pin: string) {
    return this.waterResponseRepository.findByPin(pin);
  }
  async getWaterResponseById(id: string) {
    return this.waterResponseRepository.findById(id);
  }
  async updateWaterResponse(id: string, waterResponse: WaterResponseTypes) {
    return this.waterResponseRepository.update(id, waterResponse);
  }
  async deleteWaterResponse(id: string) {
    return this.waterResponseRepository.delete(id);
  }
}
