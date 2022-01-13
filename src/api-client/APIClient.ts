import Printer from "./Printer";
import HttpRequest from "./HttpRequest";
import Parser from "./Parser";
import Query from "./Query";
import { IRecord } from "./interfaces/IInsert";

export default class APIClient {

    public static processQuery(input: string, callback: (resultSet: string)=>void){

        try {
            const query: Query = Parser.parse(input);
            const queryName: string = query.getName();

            if(queryName === "CREATE"){
                this.create(query, callback);
            }
            else if(queryName === "INSERT"){
                this.insert(query, callback);
            }
            else if(queryName === "SELECTALL"){
                this.selectAll(query, callback);
            }
            else {
                callback(`Unrecognized query *${queryName}* !`);
            }

        } catch (error) {
            if(error instanceof Error){
                callback(error.message);
            }
        }
    }

    private static create(query: Query, callback: (resultSet: string)=>void): void {
        const onSuccess = (data: any): void => {
            callback(data.message);
        };
        const onFail = (message: string)=>{
            callback(message);
        }

        HttpRequest.send({
            resource: "relations",
            query: query,
            httpMethod: "POST",
            onSuccess: onSuccess,
            onFail: onFail
        });
    }

    private static insert(query: Query, callback: (resultSet: string)=>void): void {
        const onSuccess = (data: any): void => {
            callback(data.message);
        };
        const onFail = (message: string)=>{
            callback(message);
        }

        HttpRequest.send({
            resource: "records",
            query: query,
            httpMethod: "POST",
            onSuccess: onSuccess,
            onFail: onFail
        });
    }

    private static selectAll(query: Query, callback: (resultSet: string)=>void): void {
        const onSuccess = (data: IRecord[]): void => {
            callback(Printer.print(query.getDefinition().relation, data));
        };
        const onFail = (message: string)=>{
            callback(message);
        }

        HttpRequest.send({
            resource: "records",
            httpMethod: "GET",
            relation: query.getDefinition().relation,
            onSuccess: onSuccess,
            onFail: onFail
        });
    }
}