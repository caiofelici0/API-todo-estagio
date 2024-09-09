import { TodoRepository } from "../repositories/todo.repository";

export class TodoService {
    private constructor(readonly repository: TodoRepository) {}

    public static build(repository: TodoRepository) {
        return new TodoService(repository);
    }
}
