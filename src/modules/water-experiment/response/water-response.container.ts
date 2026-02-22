import "reflect-metadata";
import { container } from "tsyringe";
import { WaterResponseRepository } from "./repositories/water-response.repositories";
import { WaterResponseService } from "./services/water-response.services";

container.registerSingleton("WaterResponseRepository", WaterResponseRepository);
container.registerSingleton("WaterResponseService", WaterResponseService);
