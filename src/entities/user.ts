type UserProps = {
    email: string;
    password: string;
};

export class User {
    private constructor(readonly props: UserProps) {}

    public static build(email: string, password: string): User {
        return new User({
            email,
            password,
        });
    }

    public get email(): string {
        return this.props.email;
    }

    public get password(): string {
        return this.props.password;
    }
}
