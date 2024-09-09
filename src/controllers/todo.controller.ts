import { Request, Response } from "express";
import { AuthenticadedRequest } from "../middlewares/authMiddleware";
import { TodoRepository } from "../repositories/todo.repository";
import { prisma } from "../util/prisma.util";
import { TodoService } from "../services/todo.service";

export class TodoController {
    private constructor() {}

    public static build() {
        return new TodoController();
    }

    public async listTodos(request: AuthenticadedRequest, response: Response) {
        const userId = request.userId;

        const todoRepository = TodoRepository.build(prisma);
        const todoService = TodoService.build(todoRepository);

        if (!userId) {
            return response
                .status(401)
                .json({ message: "Usuário não autenticado" });
        }

        try {
            const todos = await todoService.list(userId);
            return response.status(200).json(todos);
        } catch (error: any) {
            return response.status(400).json({ erro: error.message });
        }
    }

    public async createTodo(request: AuthenticadedRequest, response: Response) {
        const userId = request.userId;
        const { title, description } = request.body;

        if (!userId) {
            return response
                .status(401)
                .json({ message: "Usuário não autenticado" });
        }

        const todoRepository = TodoRepository.build(prisma);
        const todoService = TodoService.build(todoRepository);

        try {
            const todo = await todoService.create(userId, title, description);
            return response.status(200).json(todo);
        } catch (error: any) {
            return response.status(400).json({ erro: error.message });
        }
    }

    public async deleteTodo(request: Request, response: Response) {
        const { id } = request.body;

        const todoRepository = TodoRepository.build(prisma);
        const todoService = TodoService.build(todoRepository);

        try {
            const todo = await todoService.delete(id);
            return response.status(200).json(todo);
        } catch (error: any) {
            return response.status(400).json({ erro: error.message });
        }
    }

    public async editTodo(request: Request, response: Response) {
        const { id, title, description } = request.body;

        const todoRepository = TodoRepository.build(prisma);
        const todoService = TodoService.build(todoRepository);

        try {
            const todo = await todoService.edit(id, title, description);
            return response.status(200).json(todo);
        } catch (error: any) {
            return response.status(400).json({ erro: error.message });
        }
    }

    public async toggleComplete(request: Request, response: Response) {
        const { id, isCompleted } = request.body;

        const todoRepository = TodoRepository.build(prisma);
        const todoService = TodoService.build(todoRepository);

        try {
            const todo = await todoService.toggleComplete(id, isCompleted);
            return response.status(200).json(todo);
        } catch (error: any) {
            return response.status(400).json({ erro: error.message });
        }
    }
}
