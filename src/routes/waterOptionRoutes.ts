import { Router } from "express";
import { container } from "tsyringe";
import { WaterOptionController } from "../controllers/WaterOptionController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

const waterOptionController = container.resolve(WaterOptionController);

router.post(
  "/",
  authMiddleware,
  waterOptionController.createWaterOption.bind(waterOptionController)
);

router.get(
  "/id/:id",
  waterOptionController.getWaterOptionById.bind(waterOptionController)
);

router.get(
  "/answer/:answerNumber",
  waterOptionController.getWaterOptionByAnswerNumber.bind(waterOptionController)
);

router.get(
  "/",
  waterOptionController.getAllWaterOption.bind(waterOptionController)
);

router.put(
  "/:id",
  authMiddleware,
  waterOptionController.updateWaterOption.bind(waterOptionController)
);

router.delete(
  "/:id",
  authMiddleware,
  waterOptionController.deleteWaterOption.bind(waterOptionController)
);

export default router;
