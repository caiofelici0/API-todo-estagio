import { PrismaClient } from "@prisma/client";
import { Todo } from "../entities/todo";

export class TodoRepository {
    private constructor(readonly prisma: PrismaClient) {}

    public static build(prisma: PrismaClient) {
        return new TodoRepository(prisma);
    }
}
