import { Request, Response, NextFunction } from "express";
import ServiceError from "../shared/errors/ServiceError";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ServiceError) {
    return res
      .status(err.statusCode)
      .json({ code: err.code ?? null, message: err.message, type: err.type });
  }

  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
}

export default errorHandler;
