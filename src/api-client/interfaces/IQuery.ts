import ICreate from "./ICreate";
import IInsert from "./IInsert";
import ISelectAll from "./ISelectAll";

export default interface IQuery {
    name: string,
    definition: ICreate | IInsert | ISelectAll
}