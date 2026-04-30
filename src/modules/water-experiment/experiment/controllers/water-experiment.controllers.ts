import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { randomBytes } from "crypto";
import { CustomRequest } from "../../../../middlewares/authMiddleware";
import { WaterExperimentServiceTypes } from "../types/water-experiment.services.types";
import { WaterExperimentTypes } from "../types/water-experiment.schemas.types";
import { asyncHandler } from "../../../../shared/asyncHandler";

@injectable()
export class WaterExperimentController {
  constructor(
    @inject("WaterExperimentService")
    private waterExperimentService: WaterExperimentServiceTypes,
  ) {}

  createWaterExperiment = asyncHandler(async (req: CustomRequest, res: Response) => {
    const teacherId = req.user?.id;
    const { title, description } = req.body;

    if (!teacherId) throw new Error("ID do professor não encontrado");

    const waterExperimentData: WaterExperimentTypes = {
      pin: randomBytes(16).toString("hex").slice(0, 4),
      teacher: teacherId,
      title,
      description,
      liberateSend: false,
      liberateResult: false,
      responsesNumber: 0,
      createdAt: new Date(),
    };

    const newWaterExperiment = await this.waterExperimentService.createWaterExperiment(waterExperimentData);
    res.status(201).json(newWaterExperiment);
  });

  getWaterExperimentById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const waterExperiment = await this.waterExperimentService.getWaterExperimentById(id);
    res.status(200).json(waterExperiment);
  });

  getWaterExperimentByPin = asyncHandler(async (req: Request, res: Response) => {
    const { pin } = req.params;
    const waterExperiment = await this.waterExperimentService.getWaterExperimentByPin(pin);
    res.status(200).json(waterExperiment);
  });
  getWaterExperimentByTeacher = asyncHandler(async (req: CustomRequest, res: Response) => {
    const teacherId = req.user?.id;
    if (!teacherId) throw new Error("ID do professor não encontrado");
    const waterExperiments = await this.waterExperimentService.getWaterExperimentByTeacher(teacherId);
    res.status(200).json(waterExperiments);
  });
  updateWaterExperiment = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, liberateSend, liberateResult } = req.body;

    const existingExperiment = await this.waterExperimentService.getWaterExperimentById(id);

    if (!existingExperiment) throw new Error("Experimento não encontrado");

    const updatedData = {
      pin: existingExperiment.pin,
      title: title || existingExperiment.title,
      description: description || existingExperiment.description,
      liberateSend: liberateSend !== undefined ? liberateSend : existingExperiment.liberateSend,
      liberateResult: liberateResult !== undefined ? liberateResult : existingExperiment.liberateResult,
      responsesNumber: existingExperiment.responsesNumber,
      teacher: existingExperiment.teacher,
      createdAt: existingExperiment.createdAt,
    };

    const updatedWaterExperiment = await this.waterExperimentService.updateWaterExperiment(id, updatedData);
    res.status(200).json(updatedWaterExperiment);
  });

  deleteWaterExperiment = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.waterExperimentService.deleteWaterExperiment(id);
    res.status(200).send();
  });
}
