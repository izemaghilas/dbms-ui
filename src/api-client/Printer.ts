import { IRecord } from "./interfaces/IInsert";

class Column {
    private name: string;
    private rows: string[];
    private length: number;

    public constructor(name: string, rows: string[], length: number){
        this.name = name;
        this.rows = rows;
        this.length = length;
    }

    public getName(): string {
        return this.name;
    }
    public getRows(): string[] {
        return this.rows;
    }
    public getLength(): number {
        return this.length;
    }
}

export default class Printer {
    
    public static print(relationName: string, records: IRecord[]): string{
        let str: string = relationName+": ";
        if(records.length > 0){
            let columns: Column[] = [];
            let types: string[] = []; // column name is the column type
            // get column names
            records[0].values.forEach((record) => {
                let type: string = record.column as string;
                types.push(type.toUpperCase());
            });

            for(let i=0; i < types.length; i++){
                columns.push( this.getColumn(types[i], records, i) );
            }
            str += this.buildHeader(columns) + "\n";
            str += this.buildRows(columns, records.length);
            columns.forEach(column=>{
                str += this.buildLine(column.getLength());
            });
            str += "+";
            str += "\nrecords: "+records.length;
        }
        else {
            str+="Empty set.";
        }
        return str;
    }

    private static getColumn(name: string, records: IRecord[], index: number): Column {
        let maxLength: number = name.length;
        let rows: string[] = [];
        records.forEach(record=>{
            let row: string = record.values[index].value;
            if(row.length > maxLength){
                maxLength = row.length;
            }
            rows.push(row);
        }); 
        return new Column(name, rows, maxLength);
    }

    private static buildHeader(columns: Column[]): string {
        let header: string = "";
        let line: string = "";
        let name: string = "";
        columns.forEach(column=>{
            line += this.buildLine(column.getLength());
        });
        line += "+";
        columns.forEach(column=>{
            name += this.buildRow(column.getName(), column.getLength())+ " ";
        });
        name += "|";

        return header+"\n"+line+"\n"+name+"\n"+line;
    }

    private static buildRows(columns: Column[], numberOfRows: number): string {
        let rows: string = "";
        for(let rowIndex=0; rowIndex<numberOfRows; rowIndex++){
            columns.forEach(column=>{
                let slotValue: string = column.getRows()[rowIndex];
                rows += this.buildRow(slotValue, column.getLength())+" ";
            });
            rows += "|\n";
        }
        return rows;
    }

    private static buildLine(length: number): string {
        let line: string = "+";
        for(let i=0; i<length+2; i++){
            line += "-";
        }
        return line;
    }

    private static buildRow(value: string, length: number): string {
        let row: string = "| ";
        row+=value;
        for(let i=0; i<length-value.length; i++){
            row += " ";
        }
        return row;
    }
}