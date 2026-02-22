import "reflect-metadata";
import { container } from "tsyringe";
import { WaterExperimentRepository } from "./repositories/water-experiment.repositories";
import { WaterExperimentService } from "./services/water-experiment.services";

container.registerSingleton(
  "WaterExperimentRepository",
  WaterExperimentRepository,
);
container.registerSingleton("WaterExperimentService", WaterExperimentService);
