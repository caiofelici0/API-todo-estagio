import { PrismaClient } from "@prisma/client";
import { User } from "../entities/user";

export class UserRepository {
    private constructor(readonly prisma: PrismaClient) {}

    public static build(prisma: PrismaClient): UserRepository {
        return new UserRepository(prisma);
    }

    public async signupUser(email: string, password: string): Promise<User> {
        const user = await this.prisma.user.create({
            data: {
                email,
                password,
            },
        });

        return User.build(user.id, user.email, user.password);
    }

    public async findByUserEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) return null;

        return User.build(user.id, user.email, user.password);
    }
}
