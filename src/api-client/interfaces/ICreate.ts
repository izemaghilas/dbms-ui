export interface IColumn {
    index: number,
    type: string
}

export default interface ICreate {
    relation: string,
    count: number,
    columns: IColumn[]
}