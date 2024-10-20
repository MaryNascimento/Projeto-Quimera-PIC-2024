import { inject, injectable } from "tsyringe";
import { IWaterExperimentService } from "../interfaces/service/IWaterExperimentService";
import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/authMiddleware";
import { randomBytes } from "crypto";
import { IWaterExperiment } from "../interfaces/models/IWaterExperiment";

@injectable()
export class WaterExperimentController {
  constructor(
    @inject("WaterExperimentService")
    private waterExperimentService: IWaterExperimentService
  ) {}

  async createWaterExperiment(req: CustomRequest, res: Response) {
    try {
      const teacherId = req.user?.id;
      const { title, description } = req.body;

      if (!teacherId) {
        res.status(400).json({ message: "Teacher ID não encontrado" });
        return;
      }

      const waterExperimentData: IWaterExperiment = {
        pin: randomBytes(16).toString("hex").slice(0, 4),
        teacher: teacherId,
        title,
        description,
        liberateSend: false,
        liberateResult: false,
        responsesNumber: 0,
        createdAt: new Date(),
      };

      const newWaterExperiment =
        await this.waterExperimentService.createWaterExperiment(
          waterExperimentData
        );
      res.status(201).json(newWaterExperiment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Create water experiment error" });
    }
  }

  async getWaterExperimentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const waterExperiment =
        await this.waterExperimentService.getWaterExperimentById(id);

      if (!waterExperiment) {
        res.status(404).json({ message: "Water Experiment not Found" });
        return;
      }

      res.status(200).json(waterExperiment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving water experiment" });
    }
  }

  async getWaterExperimentByPin(req: Request, res: Response) {
    try {
      const { pin } = req.params;
      const waterExperiment =
        await this.waterExperimentService.getWaterExperimentByPin(pin);

      if (!waterExperiment) {
        res.status(404).json({ message: "Water Experiment not Found" });
        return;
      }

      res.status(200).json(waterExperiment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving water experiment" });
    }
  }
  async getWaterExperimentByTeacher(req: CustomRequest, res: Response) {
    try {
      const teacherId = req.user?.id;

      if (!teacherId) {
        res.status(400).json({ message: "Teacher ID não encontrado" });
        return;
      }

      const waterExperiments =
        await this.waterExperimentService.getWaterExperimentByTeacher(
          teacherId
        );
      res.status(200).json(waterExperiments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error return water experiments list" });
    }
  }
  async updateWaterExperiment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, liberateSend, liberateResult } = req.body;

      const existingExperiment =
        await this.waterExperimentService.getWaterExperimentById(id);

      if (!existingExperiment) {
        res.status(404).json({ message: "Water Experiment not found" });
        return;
      }

      const updatedData = {
        pin: existingExperiment.pin,
        title: title || existingExperiment.title,
        description: description || existingExperiment.description,
        liberateSend:
          liberateSend !== undefined
            ? liberateSend
            : existingExperiment.liberateSend,
        liberateResult:
          liberateResult !== undefined
            ? liberateResult
            : existingExperiment.liberateResult,
        responsesNumber: existingExperiment.responsesNumber,
        teacher: existingExperiment.teacher,
        createdAt: existingExperiment.createdAt,
      };

      const updatedWaterExperiment =
        await this.waterExperimentService.updateWaterExperiment(
          id,
          updatedData
        );

      res.status(200).json(updatedWaterExperiment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating water experiment" });
    }
  }

  async deleteWaterExperiment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const waterExperiment =
        await this.waterExperimentService.getWaterExperimentById(id);

      if (!waterExperiment) {
        res.status(404).json({ message: "Water Experiment not found" });
        return;
      }

      await this.waterExperimentService.deleteWaterExperiment(id);
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting water experiment" });
    }
  }
}
