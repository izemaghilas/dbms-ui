import Query from "../Query";

export default interface IHttpRequest {
    resource: string,
    query?: Query,
    relation?: string
    httpMethod: string,
    onSuccess: (arg: any)=>void,
    onFail: (message: string)=> void,
}