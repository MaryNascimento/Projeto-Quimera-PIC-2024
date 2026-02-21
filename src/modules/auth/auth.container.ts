import "reflect-metadata";
import { container } from "tsyringe";
import { AuthService } from "./services/auth.services";

container.registerSingleton("AuthService", AuthService);
