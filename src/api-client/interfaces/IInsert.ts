export interface IRecordValue {
    column: number | string // the index of column, can be string when fetched from API
    value: string
}

export interface IRecord {
    values: IRecordValue[]
}


export default interface IInsert {
    relation: string,
    record: IRecord
}