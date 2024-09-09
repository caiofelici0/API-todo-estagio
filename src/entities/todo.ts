type TodoProps = {
    title: string;
    description: string;
    isCompleted: boolean;
};

export class Todo {
    private constructor(readonly props: TodoProps) {}

    public static build(title: string, description: string) {
        return new Todo({
            title,
            description,
            isCompleted: false,
        });
    }

    public get title() {
        return this.props.title;
    }

    public get description() {
        return this.props.description;
    }

    public get isCompleted() {
        return this.props.isCompleted;
    }

    public edit(title: string, description: string) {
        this.props.title = title;
        this.props.description = description;
    }

    public toggleComplete() {
        this.props.isCompleted = !this.props.isCompleted;
    }
}
