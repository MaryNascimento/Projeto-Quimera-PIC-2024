import { Router } from "express";
import { container } from "tsyringe";
import { AuthController } from "./controllers/auth.controllers";

export function AuthRoutes() {
  const router = Router();

  const authController = container.resolve(AuthController);

  router.post("/login", authController.login.bind(authController));

  return router;
}
