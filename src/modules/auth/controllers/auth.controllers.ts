import { inject, injectable } from "tsyringe";

import { Request, Response } from "express";
import { AuthServiceTypes } from "../types/auth.services.types";
import { asyncHandler } from "../../../shared/asyncHandler";
import ServiceError from "../../../shared/errors/ServiceError";

@injectable()
export class AuthController {
  constructor(@inject("AuthService") private authService: AuthServiceTypes) {}

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await this.authService.login(email, password);
    res.status(200).json(token);
  });
}
