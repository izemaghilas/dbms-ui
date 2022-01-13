import Parser from "./Parser";
import Query from "./Query";

describe("valid DBMS queries", ()=>{
    test.each<[string, Query]>([
        ["       CREATE    table_name   3    STRING25    FLOAT   INT  ", Query.create({
            name: "CREATE",
            definition: {
                relation: "table_name",
                count: 3,
                columns: [
                    {index:1, type: "STRING25"},
                    {index:2, type: "FLOAT"},
                    {index:3, type: "INT"}
                ]
            }
        })],
        ["CREATE   table_name    1 int", Query.create({
            name: "CREATE",
            definition: {
                relation: "table_name",
                count: 1,
                columns: [{index: 1, type: "INT"}]
            }
        })],
        ["create table_name 2 int string45", Query.create({
            name: "CREATE",
            definition: {
                relation: "table_name",
                count: 2,
                columns: [{index: 1, type: "INT"}, {index: 2, type: "STRING45"}]
            }
        })]
    ])("valid CREATE query", (input: string, query: Query)=>{
        expect(Parser.parse(input)).toStrictEqual<Query>(query);
    });

    test.each([
        ["insert table_name column_1_value column_2_value", Query.create({
            name: "INSERT",
            definition: {
                relation: "table_name",
                record: {
                    values: [{column: 1, value: "column_1_value"}, {column: 2, value: "column_2_value"}]
                }
            }
        })],
        ["  insert     table_name    column_1_value  ", Query.create({
            name: "INSERT",
            definition: {
                relation: "table_name",
                record: {
                    values: [{column: 1, value: "column_1_value"}]
                }
            }
        })],
        ["insert table_name column_1_value column_2_value column_3_value", Query.create({
            name: "INSERT",
            definition: {
                relation: "table_name",
                record: {
                    values: [
                        {column: 1, value: "column_1_value"}, 
                        {column: 2, value: "column_2_value"},
                        {column: 3, value: "column_3_value"}
                    ]
                }
            }
        })]
    ])("valid INSERT queries", (input: string, query: Query)=>{
        expect(Parser.parse(input)).toStrictEqual<Query>(query);
    });

    test.each([
        ["     SELECTALL    table_name  ", Query.create({
            name: "SELECTALL",
            definition: {
                relation: "table_name"
            }
        })],
        ["selectall table_name", Query.create({
            name: "SELECTALL",
            definition: {
                relation: "table_name"
            }
        })]
    ])("valid SELECTALL queries", (input: string, query: Query)=>{
        expect(Parser.parse(input)).toStrictEqual<Query>(query);
    });
});

describe("invalid DBMS queries", ()=>{
    test.each<[string, RegExp]>([
        ["", /^No query to process!$/],
        ["        ", /^No query to process!$/],
        ["select", /^unrecognized query \*select\*$/],
        ["update", /^unrecognized query \*update\*$/],
        ["CREATE", /^see CREATE query syntax!$/],
        ["insert", /^see INSERT query syntax!$/],
        ["SELECTall", /^see SELECTALL query syntax!$/],
        ["create 3 int float int", /^Expecting integer for \*number of columns\* got int\nsee CREATE query syntax!$/],
        ["create table_name 1 int float", /^Having 1 columns, got 2 types$/],
        ["create table_name 3 int float", /^Having 3 columns, got 2 types$/],
        ["insert table_name", /^Missing \*value of each column\*\nsee INSERT query syntax!$/],
        ["selectall table_name int", /^see SELECTALL query syntax!$/]
    ])("testing parsing error", (input: string, errorMessage: RegExp)=>{
        expect(()=>{ Parser.parse(input); }).toThrowError(errorMessage);
    });
});