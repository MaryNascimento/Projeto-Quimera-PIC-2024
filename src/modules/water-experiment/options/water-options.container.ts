import "reflect-metadata";
import { container } from "tsyringe";
import { WaterOptionsRepository } from "./repositories/water-options.repositories";
import { WaterOptionsService } from "./services/water-options.services";

container.registerSingleton("WaterOptionsRepository", WaterOptionsRepository);
container.registerSingleton("WaterOptionsService", WaterOptionsService);
