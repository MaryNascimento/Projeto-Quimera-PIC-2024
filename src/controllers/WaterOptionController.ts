import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/authMiddleware";
import { IWaterOption } from "../interfaces/models/IWaterOptions";
import { IWaterOptionService } from "../interfaces/service/IWaterOptionService";

@injectable()
export class WaterOptionController {
  constructor(
    @inject("WaterOptionService")
    private waterOptionService: IWaterOptionService
  ) {}

  async createWaterOption(req: CustomRequest, res: Response) {
    try {
      const { value, weigth, answerNumber } = req.body;

      const waterOptionData: IWaterOption = {
        value,
        weigth,
        answerNumber,
      };

      const newWaterOption = await this.waterOptionService.createWaterOption(
        waterOptionData
      );
      res.status(201).json(newWaterOption);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Create water option error" });
    }
  }

  async getWaterOptionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const waterOption = await this.waterOptionService.getWaterOptionById(id);

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
        await this.waterOptionService.getWaterOptionByAnswerNumber(
          Number(answerNumber)
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
      const waterOptions = await this.waterOptionService.getAllWaterOption();
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

      const existingOption = await this.waterOptionService.getWaterOptionById(
        id
      );

      if (!existingOption) {
        res.status(404).json({ message: "Water option not found" });
        return;
      }

      const updatedData: IWaterOption = {
        value,
        weigth,
        answerNumber,
      };

      const updatedWaterOption =
        await this.waterOptionService.updateWaterOption(id, updatedData);

      res.status(200).json(updatedWaterOption);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating water option" });
    }
  }

  async deleteWaterOption(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const waterOption = await this.waterOptionService.getWaterOptionById(id);

      if (!waterOption) {
        res.status(404).json({ message: "Water option not found" });
        return;
      }

      await this.waterOptionService.deleteWaterOption(id);
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting water option" });
    }
  }
}
