import ICreate, { IColumn } from "./interfaces/ICreate";
import IInsert, { IRecord } from "./interfaces/IInsert";
import ISelectAll from "./interfaces/ISelectAll";
import Query from "./Query";

export default class Parser {

    public static parse(query: string): Query {
        query = query.trim();
        let parts: string[] = this.getParts(query);

        if(parts.length === 0){
            throw new Error("No query to process!");
        }

        return Query.create({
            name: parts[0].toUpperCase(),
            definition: this.buildQueryDefinition(parts)
        });
    }
    
    private static getParts(query: string): string[] {
        let parts: string[] = [];
        let str: string = "";
        for(let i=0; i < query.length; i++){
            if(query[i] === " "){
                if(str != ""){
                    parts.push(str);
                    str = "";
                }
            }
            else {
                str += query[i];
            }
        }

        if(str != ""){
            parts.push(str);
            str="";
        }

        return parts;
    }

    private static buildQueryDefinition(parts: string[]): ICreate | IInsert | ISelectAll {
        const name: string = parts[0].toUpperCase();
        
        if(name === "CREATE"){
            return this.buildCREATEdefinition(parts);
        }

        if(name === "INSERT"){
            return this.buildINSERTdefinition(parts);
        }

        if(name === "SELECTALL"){
            return this.buildSELECTALLdefinition(parts);
        }

        throw new Error(`unrecognized query *${parts[0]}*`);
    }

    private static buildCREATEdefinition(parts: string[]): ICreate {
        let size = parts.length;
        if(size === 1){
            throw new Error("see CREATE query syntax!");
        }
        size-=1;
        if(size <= 0){
            throw new Error("Missing *relation name*\nsee CREATE query syntax!");
        }
        const relation = parts[1];
        size-=1;
        if(size <= 0){
            throw new Error("Missing *number of columns*\nsee CREATE query syntax!");
        }
        const count: number = parseInt(parts[2]);
        if(isNaN(count)){
            throw new Error(`Expecting integer for *number of columns* got ${parts[2]}\nsee CREATE query syntax!`);
        }
        size-=1;
        if(size < count || size > count){
            throw new Error(`Having ${count} columns, got ${size} types`);
        }
        let columns: IColumn[] = [];
        for(let i=3; i<parts.length; i++){
            columns[i-3] = {
                index: i-2, // index start on 1
                type: parts[i].toUpperCase()
            };
        }

        return {
            relation: relation,
            count: count,
            columns: columns
        };
    }
    
    private static buildINSERTdefinition(parts: string[]): IInsert {
        let size = parts.length;
        if(size === 1){
            throw new Error("see INSERT query syntax!");
        }
        size-=1;
        if(size <= 0){
            throw new Error("Missing *relation name*\nsee INSERT query syntax!");
        }
        const relation = parts[1];
        size-=1;
        if(size <= 0){
            throw new Error("Missing *value of each column*\nsee INSERT query syntax!");
        }
        const record: IRecord = {
            values: []
        }
        for(let i=2; i<parts.length; i++){
            record.values.push({column: i-1, value: parts[i]});
        }

        return {
            relation: relation,
            record: record
        }
    }

    private static buildSELECTALLdefinition(parts: string[]): ISelectAll {
        let size = parts.length;
        if(size === 1){
            throw new Error("see SELECTALL query syntax!");
        }
        size-=1;
        if(size <= 0){
            throw new Error("Missing *relation name*\nsee SELECTALL query syntax!");
        }
        const relation = parts[1];
        size-=1;
        if(size > 0){
            throw new Error("see SELECTALL query syntax!");
        }

        return {
            relation: relation
        }
    }
}