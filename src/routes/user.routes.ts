import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRouter = Router();
const userController = UserController.build();

userRouter.post("/signup", (req, res) => userController.signup(req, res));
userRouter.post("/login", (req, res) => userController.login(req, res));
userRouter.post("/logout", authMiddleware, (req, res) =>
    userController.logout(req, res)
);

export default userRouter;
