import ICreate from "./interfaces/ICreate";
import IInsert from "./interfaces/IInsert";
import IQuery from "./interfaces/IQuery";
import ISelectAll from "./interfaces/ISelectAll";

export default class Query {
    private name: string;
    private definition: ICreate | IInsert | ISelectAll;

    private constructor(name: string, definition: ICreate | IInsert | ISelectAll) {
        this.name = name;
        this.definition = definition;
    }

    public getName(): string {
        return this.name;
    }

    public getDefinition(): ICreate | IInsert | ISelectAll {
        return this.definition;
    }

    public static create(arg: IQuery): Query {
        return new Query(arg.name, arg.definition);
    }
}