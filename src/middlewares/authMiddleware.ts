import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../util/jwt";

export function authMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const token = request.cookies.token;

    if (!token) return response.status(401).json({ message: "Não autorizado" });

    try {
        verifyToken(token);
        next();
    } catch (error) {
        response.status(401).json({ message: "Token inválido" });
    }
}
