import { Router } from "express";
import { container } from "tsyringe";

import { WaterOptionsController } from "./controllers/water-options.controllers";
import { authMiddleware } from "../../../middlewares/authMiddleware";

export function WaterOptionsRoutes() {
  const router = Router();

  const waterOptionsController = container.resolve(WaterOptionsController);

  router.post(
    "/",
    authMiddleware,
    waterOptionsController.createWaterOption.bind(waterOptionsController),
  );

  router.get(
    "/id/:id",
    waterOptionsController.getWaterOptionById.bind(waterOptionsController),
  );

  router.get(
    "/answer/:answerNumber",
    waterOptionsController.getWaterOptionByAnswerNumber.bind(
      waterOptionsController,
    ),
  );

  router.get(
    "/",
    waterOptionsController.getAllWaterOption.bind(waterOptionsController),
  );

  router.put(
    "/:id",
    authMiddleware,
    waterOptionsController.updateWaterOption.bind(waterOptionsController),
  );

  router.delete(
    "/:id",
    authMiddleware,
    waterOptionsController.deleteWaterOption.bind(waterOptionsController),
  );

  return router;
}
