import { Router } from "express";
import { container } from "tsyringe";

import { WaterOptionsController } from "./controllers/water-options.controllers";

export function WaterOptionsRoutes() {
  const router = Router();

  const waterOptionsController = container.resolve(WaterOptionsController);

  router.post(
    "/",
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
    waterOptionsController.updateWaterOption.bind(waterOptionsController),
  );

  router.delete(
    "/:id",
    waterOptionsController.deleteWaterOption.bind(waterOptionsController),
  );

  return router;
}
