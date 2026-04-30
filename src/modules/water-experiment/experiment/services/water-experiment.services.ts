import { inject, injectable } from "tsyringe";
import { WaterExperimentServiceTypes } from "../types/water-experiment.services.types";
import { WaterExperimentTypes } from "../types/water-experiment.schemas.types";
import { WaterExperimentRepositoryTypes } from "../types/water-experiment.repositories.types";
import ServiceError, {
  ServiceErrorType,
} from "../../../../shared/errors/ServiceError";
import { ErrorCode } from "../../../../shared/errors/errorCodes";

@injectable()
export class WaterExperimentService implements WaterExperimentServiceTypes {
  constructor(
    @inject("WaterExperimentRepository")
    private waterExperimentRepository: WaterExperimentRepositoryTypes,
  ) {}

  async createWaterExperiment(waterExperiment: WaterExperimentTypes) {
    if (
      !waterExperiment.title ||
      !waterExperiment.description ||
      !waterExperiment.teacher
    ) {
      throw new ServiceError(
        "Campos obrigatórios do experimento ausentes",
        ServiceErrorType.BadRequest,
        undefined,
        ErrorCode.EXPERIMENT_MISSING_FIELDS,
      );
    }

    const MAX_RETRIES = 5;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        return await this.waterExperimentRepository.create(waterExperiment);
      } catch (err: any) {
        if (err?.code === 11000 && err.message?.includes("pin")) {
          if (attempt === MAX_RETRIES - 1) {
            throw new ServiceError(
              "Conflito: PIN do experimento não pôde ser gerado",
              ServiceErrorType.Conflict,
              undefined,
              ErrorCode.EXPERIMENT_PIN_CONFLICT,
            );
          }

          waterExperiment.pin = require("crypto")
            .randomBytes(8)
            .toString("hex")
            .slice(0, 6);
          continue;
        }
        throw err;
      }
    }

    throw new ServiceError(
      "Conflito: PIN do experimento não pôde ser gerado",
      ServiceErrorType.Conflict,
      undefined,
      ErrorCode.EXPERIMENT_PIN_CONFLICT,
    );
  }
  async getWaterExperimentById(id: string) {
    const exp = await this.waterExperimentRepository.findById(id);
    if (!exp)
      throw new ServiceError(
        "Experimento não encontrado",
        ServiceErrorType.NotFound,
        undefined,
        ErrorCode.EXPERIMENT_NOT_FOUND,
      );
    return exp;
  }
  async getWaterExperimentByPin(pin: string) {
    const exp = await this.waterExperimentRepository.findByPin(pin);
    if (!exp)
      throw new ServiceError(
        "Experimento não encontrado",
        ServiceErrorType.NotFound,
        undefined,
        ErrorCode.EXPERIMENT_NOT_FOUND,
      );
    return exp;
  }
  async getWaterExperimentByTeacher(teacherId: string) {
    return this.waterExperimentRepository.findByTeacher(teacherId);
  }
  async updateWaterExperiment(
    id: string,
    waterExperiment: Partial<WaterExperimentTypes>,
  ) {
    const existing = await this.waterExperimentRepository.findById(id);
    if (!existing)
      throw new ServiceError(
        "Experimento não encontrado",
        ServiceErrorType.NotFound,
        undefined,
        ErrorCode.EXPERIMENT_NOT_FOUND,
      );

    const updated: WaterExperimentTypes = {
      pin: existing.pin,
      teacher: existing.teacher,
      title: waterExperiment.title ?? existing.title,
      description: waterExperiment.description ?? existing.description,
      liberateSend: waterExperiment.liberateSend ?? existing.liberateSend,
      liberateResult: waterExperiment.liberateResult ?? existing.liberateResult,
      responsesNumber: existing.responsesNumber,
      createdAt: existing.createdAt,
    };

    return this.waterExperimentRepository.update(id, updated);
  }
  async deleteWaterExperiment(id: string) {
    const existing = await this.waterExperimentRepository.findById(id);
    if (!existing)
      throw new ServiceError(
        "Experimento não encontrado",
        ServiceErrorType.NotFound,
        undefined,
        ErrorCode.EXPERIMENT_NOT_FOUND,
      );
    return this.waterExperimentRepository.delete(id);
  }
}
