import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const todoRouter = Router();
const todoController = TodoController.build();

todoRouter.post("/", authMiddleware, (req, res) =>
    todoController.createTodo(req, res)
);
todoRouter.delete("/", authMiddleware, (req, res) =>
    todoController.deleteTodo(req, res)
);
todoRouter.put("/edit", authMiddleware, (req, res) =>
    todoController.editTodo(req, res)
);
todoRouter.get("/", authMiddleware, (req, res) =>
    todoController.listTodos(req, res)
);
todoRouter.put("/complete", authMiddleware, (req, res) =>
    todoController.toggleComplete(req, res)
);

export default todoRouter;
