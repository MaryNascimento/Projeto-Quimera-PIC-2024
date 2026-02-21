import "reflect-metadata";
import { container } from "tsyringe";
import { TeacherRepository } from "./repositories/teacher.repositories";
import { TeacherService } from "./services/teacher.services";

container.registerSingleton("TeacherRepository", TeacherRepository);
container.registerSingleton("TeacherService", TeacherService);
