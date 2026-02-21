import { inject, injectable } from "tsyringe";

import { Request, Response } from "express";
import { AuthServiceTypes } from "../types/auth.services.types";

@injectable()
export class AuthController {
  constructor(@inject("AuthService") private authService: AuthServiceTypes) {}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      res.status(200).json(token);
    } catch (error) {
      let message = "Erro desconhecido";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(401).json({ error: message });
    }
  }
}
