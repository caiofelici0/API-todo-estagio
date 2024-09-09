import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../util/jwt";

export interface AuthenticadedRequest extends Request {
    userId?: number;
}

export function authMiddleware(
    request: AuthenticadedRequest,
    response: Response,
    next: NextFunction
) {
    const token = request.cookies.token;

    if (!token) return response.status(401).json({ message: "Não autorizado" });

    try {
        const decodedToken = verifyToken(token);
        request.userId = decodedToken.id;
        next();
    } catch (error) {
        response.status(401).json({ message: "Token inválido" });
    }
}
