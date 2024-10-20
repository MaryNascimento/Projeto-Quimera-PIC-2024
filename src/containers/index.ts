import "reflect-metadata";
import { container } from "tsyringe";
import { AuthService } from "../services/AuthService";
import { TeacherRepository } from "../repositories/TeacherRepository";
import { TeacherService } from "../services/TeacherService";
import { WaterExperimentRepository } from "../repositories/WaterExperimentRepository";
import { WaterExperimentService } from "../services/WaterExperimentService";
import { WaterOptionRepository } from "../repositories/WaterOptionRepository";
import { WaterOptionService } from "../services/WaterOptionService";

container.registerSingleton("AuthService", AuthService);
container.registerSingleton("TeacherRepository", TeacherRepository);
container.registerSingleton("TeacherService", TeacherService);
container.registerSingleton(
  "WaterExperimentRepository",
  WaterExperimentRepository
);
container.registerSingleton("WaterExperimentService", WaterExperimentService);
container.register("WaterOptionRepository", WaterOptionRepository);
container.register("WaterOptionService", WaterOptionService);
