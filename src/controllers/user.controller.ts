import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { prisma } from "../util/prisma.util";
import { UserRepository } from "../repositories/user.repository";
import { AuthenticadedRequest } from "../middlewares/authMiddleware";

export class UserController {
    private constructor() {}

    public static build() {
        return new UserController();
    }

    public async signup(request: Request, response: Response) {
        const { email, password } = request.body;

        const userRepository = UserRepository.build(prisma);
        const userService = UserService.build(userRepository);

        try {
            const user = await userService.signup(email, password);
            return response.status(201).json(user);
        } catch (error: any) {
            return response.status(400).json({ erro: error.message });
        }
    }

    public async login(request: Request, response: Response) {
        const { email, password } = request.body;

        const userRepository = UserRepository.build(prisma);
        const userService = UserService.build(userRepository);

        try {
            const token = await userService.login(email, password);

            response.cookie("token", token, {
                httpOnly: true,
                secure: true, // usar false em ambiente dev
                sameSite: "none", // usar lax em ambiente dev
                maxAge: 60 * 60 * 1000,
            });

            return response.status(200).json({ token });
        } catch (error: any) {
            return response.status(400).json({ erro: error.message });
        }
    }

    public async logout(request: AuthenticadedRequest, response: Response) {
        response.clearCookie("token");
        return response
            .status(200)
            .json({ message: "Logout feito com sucesso" });
    }
}
