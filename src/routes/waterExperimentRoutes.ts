import { Router } from "express";
import { container } from "tsyringe";
import { WaterExperimentController } from "../controllers/WaterExperimentController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

const waterExperimentController = container.resolve(WaterExperimentController);

router.post(
  "/",
  authMiddleware,
  waterExperimentController.createWaterExperiment.bind(
    waterExperimentController
  )
);
router.get(
  "/id/:id",
  authMiddleware,
  waterExperimentController.getWaterExperimentById.bind(
    waterExperimentController
  )
);
router.get(
  "/pin/:pin",
  authMiddleware,
  waterExperimentController.getWaterExperimentByPin.bind(
    waterExperimentController
  )
);
router.get(
  "/teacher/:teacherId",
  authMiddleware,
  waterExperimentController.getWaterExperimentByTeacher.bind(
    waterExperimentController
  )
);
router.put(
  "/:id",
  authMiddleware,
  waterExperimentController.updateWaterExperiment.bind(
    waterExperimentController
  )
);
router.delete(
  "/:id",
  authMiddleware,
  waterExperimentController.deleteWaterExperiment.bind(
    waterExperimentController
  )
);

export default router;
