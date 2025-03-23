import { Router } from "express";
import { container } from "tsyringe";
import { authMiddleware } from "../middlewares/authMiddleware";
import { WaterResponseController } from "../controllers/WaterResponseController";

const router = Router();

const waterResponseController = container.resolve(WaterResponseController);

router.post(
  "/",
  waterResponseController.createWaterResponse.bind(waterResponseController)
);

router.get(
  "/:pin",
  waterResponseController.getWaterResponseByPin.bind(waterResponseController)
);

router.put(
  "/:id",
  authMiddleware,
  waterResponseController.updateWaterResponse.bind(waterResponseController)
);

router.delete(
  "/:id",
  authMiddleware,
  waterResponseController.deleteWaterResponse.bind(waterResponseController)
);

export default router;
