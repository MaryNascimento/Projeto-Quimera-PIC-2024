import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { WaterOptionsServiceTypes } from "../types/water-options.services.types";
import { CustomRequest } from "../../../../middlewares/authMiddleware";
import { WaterOptionsTypes } from "../types/water-options.schemas.types";

@injectable()
export class WaterOptionsController {
  constructor(
    @inject("WaterOptionsService")
    private waterOptionsService: WaterOptionsServiceTypes,
  ) {}

  async createWaterOption(req: CustomRequest, res: Response) {
    try {
      const { value, weigth, answerNumber } = req.body;

      const waterOptionData: WaterOptionsTypes = {
        value,
        weigth,
        answerNumber,
      };

      const newWaterOption =
        await this.waterOptionsService.createWaterOption(waterOptionData);
      res.status(201).json(newWaterOption);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Create water option error" });
    }
  }

  async getWaterOptionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const waterOption = await this.waterOptionsService.getWaterOptionById(id);

      if (!waterOption) {
        res.status(404).json({ message: "Water option not found" });
        return;
      }

      res.status(200).json(waterOption);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting water option" });
    }
  }

  async getWaterOptionByAnswerNumber(req: Request, res: Response) {
    try {
      const { answerNumber } = req.params;
      const waterOption =
        await this.waterOptionsService.getWaterOptionByAnswerNumber(
          Number(answerNumber),
        );

      if (!waterOption) {
        res.status(404).json({ message: "Water option not found" });
        return;
      }

      res.status(200).json(waterOption);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting water option" });
    }
  }

  async getAllWaterOption(req: Request, res: Response) {
    try {
      const waterOptions = await this.waterOptionsService.getAllWaterOption();
      res.status(200).json(waterOptions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting water options" });
    }
  }

  async updateWaterOption(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { value, weigth, answerNumber } = req.body;

      const existingOption =
        await this.waterOptionsService.getWaterOptionById(id);

      if (!existingOption) {
        res.status(404).json({ message: "Water option not found" });
        return;
      }

      const updatedData: WaterOptionsTypes = {
        value,
        weigth,
        answerNumber,
      };

      const updatedWaterOption =
        await this.waterOptionsService.updateWaterOption(id, updatedData);

      res.status(200).json(updatedWaterOption);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating water option" });
    }
  }

  async deleteWaterOption(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const waterOption = await this.waterOptionsService.getWaterOptionById(id);

      if (!waterOption) {
        res.status(404).json({ message: "Water option not found" });
        return;
      }

      await this.waterOptionsService.deleteWaterOption(id);
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting water option" });
    }
  }
}
