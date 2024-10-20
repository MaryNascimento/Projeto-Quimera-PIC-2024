import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export type CustomRequest = Request & { user?: JwtPayload & { id: string } };

export function authMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Acesso negado, token não fornecido" });
    return;
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as CustomRequest["user"];
    next();
  } catch (error) {
    res.status(400).json({ error: "Token inválido" });
  }
}
