export class Todo {
    private id: number;
    private name: string;
    private propietary: string;
    private completed: boolean;

    constructor(id: number, name: string, propietary: string, completed: boolean) {
        this.id = id;
        this.name = name;
        this.propietary = propietary;
        this.completed = completed;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number) {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getPropietary(): string {
        return this.propietary;
    }

    public setPropietary(propietary: string) {
        this.propietary = propietary;
    }

    public isCompleted(): boolean {
        return this.completed;
    }

    public setCompleted(completed: boolean) {
        this.completed = completed;
    }

    public toString(): string {
        return "Task[id=" + this.id + "name=" + this.name + ", propietary=" + this.propietary + ", completed=" + this.completed + "]";
    }
}