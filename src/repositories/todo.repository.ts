import { PrismaClient } from "@prisma/client";
import { Todo } from "../entities/todo";

export class TodoRepository {
    private constructor(readonly prisma: PrismaClient) {}

    public static build(prisma: PrismaClient) {
        return new TodoRepository(prisma);
    }

    public async list(userId: number) {
        const aTodos = await this.prisma.todo.findMany({ where: { userId } });

        const todos: Todo[] = aTodos.map((todo) => {
            const { id, title, description, isCompleted } = todo;
            return Todo.with(id, title, description, isCompleted);
        });

        return todos;
    }

    public async create(userId: number, title: string, description: string) {
        const newTodo = await this.prisma.todo.create({
            data: {
                title,
                description,
                userId,
            },
        });

        if (!newTodo) return null;

        return Todo.build(newTodo.id, newTodo.title, newTodo.description);
    }

    public async delete(id: number) {
        const deletedTodo = await this.prisma.todo.delete({ where: { id } });

        if (!deletedTodo) return null;

        return Todo.build(
            deletedTodo.id,
            deletedTodo.title,
            deletedTodo.description
        );
    }

    public async update(id: number, title: string, description: string) {
        const updatedTodo = await this.prisma.todo.update({
            where: { id },
            data: {
                title,
                description,
            },
        });

        if (!updatedTodo) return null;

        return Todo.with(
            updatedTodo.id,
            updatedTodo.title,
            updatedTodo.description,
            updatedTodo.isCompleted
        );
    }

    public async findById(id: number) {
        const todo = await this.prisma.todo.findUnique({ where: { id } });

        if (!todo) return null;

        return Todo.with(
            todo.id,
            todo.title,
            todo.description,
            todo.isCompleted
        );
    }
}
