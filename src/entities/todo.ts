type TodoProps = {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
};

export class Todo {
    private constructor(readonly props: TodoProps) {}

    public static build(id: number, title: string, description: string) {
        return new Todo({
            id,
            title,
            description,
            isCompleted: false,
        });
    }

    public static with(
        id: number,
        title: string,
        description: string,
        isCompleted: boolean
    ) {
        return new Todo({
            id,
            title,
            description,
            isCompleted,
        });
    }

    public get id() {
        return this.props.id;
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
