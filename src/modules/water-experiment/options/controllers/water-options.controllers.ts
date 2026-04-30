import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { WaterOptionsServiceTypes } from "../types/water-options.services.types";
import { CustomRequest } from "../../../../middlewares/authMiddleware";
import { WaterOptionsTypes } from "../types/water-options.schemas.types";
import { asyncHandler } from "../../../../shared/asyncHandler";

@injectable()
export class WaterOptionsController {
  constructor(
    @inject("WaterOptionsService")
    private waterOptionsService: WaterOptionsServiceTypes,
  ) {}

  createWaterOption = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { value, weigth, answerNumber } = req.body;

    const waterOptionData: WaterOptionsTypes = { value, weigth, answerNumber };
    const newWaterOption = await this.waterOptionsService.createWaterOption(waterOptionData);
    res.status(201).json(newWaterOption);
  });

  getWaterOptionById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const waterOption = await this.waterOptionsService.getWaterOptionById(id);
    res.status(200).json(waterOption);
  });

  getWaterOptionByAnswerNumber = asyncHandler(async (req: Request, res: Response) => {
    const { answerNumber } = req.params;
    const waterOption = await this.waterOptionsService.getWaterOptionByAnswerNumber(Number(answerNumber));
    res.status(200).json(waterOption);
  });

  getAllWaterOption = asyncHandler(async (req: Request, res: Response) => {
    const waterOptions = await this.waterOptionsService.getAllWaterOption();
    res.status(200).json(waterOptions);
  });

  updateWaterOption = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { value, weigth, answerNumber } = req.body;
    const updatedData: WaterOptionsTypes = { value, weigth, answerNumber };
    const updatedWaterOption = await this.waterOptionsService.updateWaterOption(id, updatedData);
    res.status(200).json(updatedWaterOption);
  });

  deleteWaterOption = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.waterOptionsService.deleteWaterOption(id);
    res.status(200).send();
  });
}
