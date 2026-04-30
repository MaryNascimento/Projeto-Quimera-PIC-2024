import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { WaterResponseServiceTypes } from "../types/water-response.services.types";
import { WaterResponseTypes } from "../types/water-response.schemas.types";

@injectable()
export class WaterResponseController {
  constructor(
    @inject("WaterResponseService")
    private waterResponseService: WaterResponseServiceTypes,
  ) {}

  async createWaterResponse(req: Request, res: Response) {
    try {
      const { studentName, pin, answerOne, answerTwo } = req.body;

      // compute score safely: request may send full option objects or just ObjectId strings
      const getWeight = (ans: any) => {
        if (!ans) return 0;
        if (typeof ans === "object" && "weigth" in ans) return Number(ans.weigth) || 0;
        return 0; // if ans is id, weight must be resolved elsewhere or provided by client
      };

      const score = getWeight(answerOne) + getWeight(answerTwo);

      const waterResponse: WaterResponseTypes = {
        studentName,
        pin,
        answerOne,
        answerTwo,
        score,
      };

      const newWaterResponse =
        await this.waterResponseService.createWaterResponse(waterResponse);
      res.status(201).json(newWaterResponse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Create water response error" });
    }
  }

  async getWaterResponseByPin(req: Request, res: Response) {
    try {
      const { pin } = req.params;
      const waterResponse =
        await this.waterResponseService.getWaterResponseByPin(pin);

      if (!waterResponse) {
        res.status(404).json({ message: "Water Response not Found" });
        return;
      }

      res.status(200).json(waterResponse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Get water response error" });
    }
  }

  async updateWaterResponse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { studentName, answerOne, answerTwo } = req.body;

      const waterResponse =
        await this.waterResponseService.getWaterResponseById(id);

      if (!waterResponse) {
        res.status(404).json({ message: "Water Response not Found" });
        return;
      }

      const getWeight = (ans: any) => {
        if (!ans) return 0;
        if (typeof ans === "object" && "weigth" in ans) return Number(ans.weigth) || 0;
        return 0;
      };

      const score = getWeight(answerOne) + getWeight(answerTwo) || waterResponse.score;

      const updatedData = {
        studentName: studentName || waterResponse.studentName,
        pin: waterResponse.pin,
        answerOne: answerOne || waterResponse.answerOne,
        answerTwo: answerTwo || waterResponse.answerTwo,
        score,
      };

      const updatedWaterResponse =
        await this.waterResponseService.updateWaterResponse(id, updatedData);
      res.status(200).json(updatedWaterResponse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Update water response error" });
    }
  }

  async deleteWaterResponse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const waterResponse =
        await this.waterResponseService.getWaterResponseById(id);

      if (!waterResponse) {
        res.status(404).json({ message: "Water Response not Found" });
        return;
      }

      await this.waterResponseService.deleteWaterResponse(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Delete water response error" });
    }
  }
}
