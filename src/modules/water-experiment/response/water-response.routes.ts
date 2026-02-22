import { Router } from "express";
import { container } from "tsyringe";
import { WaterResponseController } from "./controllers/water-response.controllers";
import { authMiddleware } from "../../../middlewares/authMiddleware";

export function WaterResponseRoutes() {
  const router = Router();

  const waterResponseController = container.resolve(WaterResponseController);

  router.post(
    "/",
    waterResponseController.createWaterResponse.bind(waterResponseController),
  );

  router.get(
    "/:pin",
    waterResponseController.getWaterResponseByPin.bind(waterResponseController),
  );

  router.put(
    "/:id",
    authMiddleware,
    waterResponseController.updateWaterResponse.bind(waterResponseController),
  );

  router.delete(
    "/:id",
    authMiddleware,
    waterResponseController.deleteWaterResponse.bind(waterResponseController),
  );

  return router;
}
