import { TodoRepository } from "../repositories/todo.repository";

export class TodoService {
    private constructor(readonly repository: TodoRepository) {}

    public static build(repository: TodoRepository) {
        return new TodoService(repository);
    }

    public async list(userId: number) {
        return await this.repository.list(userId);
    }

    public async create(userId: number, title: string, description: string) {
        const todo = await this.repository.create(userId, title, description);

        if (!todo) throw Error("Erro ao criar tarefa");

        return todo;
    }

    public async delete(id: number) {
        const todo = await this.repository.delete(id);

        if (!todo) throw Error("Erro ao excluir tarefa");

        return todo;
    }

    public async edit(id: number, title: string, description: string) {
        const updatedTodo = await this.repository.edit(id, title, description);

        if (!updatedTodo) throw Error("Erro ao editar tarefa");

        return updatedTodo;
    }

    public async toggleComplete(id: number, isCompleted: boolean) {
        const todo = await this.repository.toggleComplete(id, isCompleted);

        if (!todo) throw Error("Erro ao trocar conclusão");

        return todo;
    }
}
