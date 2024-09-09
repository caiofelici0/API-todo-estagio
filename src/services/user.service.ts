import bcrypt from "bcryptjs";
import { User } from "../entities/user";
import { UserRepository } from "../repositories/user.repository";
import { generateToken } from "../util/jwt";

export class UserService {
    private constructor(readonly repository: UserRepository) {}

    public static build(repository: UserRepository): UserService {
        return new UserService(repository);
    }

    public async signup(email: string, password: string): Promise<User> {
        const aUser = await this.repository.findByUserEmail(email);

        if (aUser) throw Error("Email já registrado");

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.repository.signupUser(email, hashedPassword);

        return user;
    }

    public async login(email: string, password: string): Promise<string> {
        const user = await this.repository.findByUserEmail(email);
        if (!user) throw Error("Usuário não registrado");

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw Error("Senha incorreta");

        const token = generateToken(user.id);

        return token;
    }
}
