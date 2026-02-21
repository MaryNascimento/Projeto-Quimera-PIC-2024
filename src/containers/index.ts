import "reflect-metadata";
import { container } from "tsyringe";

import { WaterExperimentRepository } from "../repositories/WaterExperimentRepository";
import { WaterExperimentService } from "../services/WaterExperimentService";
import { WaterOptionRepository } from "../repositories/WaterOptionRepository";
import { WaterOptionService } from "../services/WaterOptionService";
import { WaterResponseRepository } from "../repositories/WaterResponseRepository";
import { WaterResponseService } from "../services/WaterResponseService";

import "../modules/teacher/teacher.container";
import "../modules/auth/auth.container";

container.registerSingleton(
  "WaterExperimentRepository",
  WaterExperimentRepository,
);
container.registerSingleton("WaterExperimentService", WaterExperimentService);

container.registerSingleton("WaterOptionRepository", WaterOptionRepository);
container.registerSingleton("WaterOptionService", WaterOptionService);

container.registerSingleton("WaterResponseRepository", WaterResponseRepository);
container.registerSingleton("WaterResponseService", WaterResponseService);
