type UserProps = {
    id: number;
    email: string;
    password: string;
};

export class User {
    private constructor(readonly props: UserProps) {}

    public static build(id: number, email: string, password: string): User {
        return new User({
            id,
            email,
            password,
        });
    }

    public get id(): number {
        return this.props.id;
    }

    public get email(): string {
        return this.props.email;
    }

    public get password(): string {
        return this.props.password;
    }
}
