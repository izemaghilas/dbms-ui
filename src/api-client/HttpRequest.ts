import IHttpRequest from "./interfaces/IHttpRequest";

export default class HttpRequest {
    private static readonly APIurl: string = process.env.API_URL || "http://127.0.0.1:8080/dbms/api";

    public static send(arg: IHttpRequest): void {
        
        let url: string = "";
        if(arg.relation){
            url = HttpRequest.APIurl+"/"+arg.resource+"?relation="+arg.relation;
        }
        else{
            url = HttpRequest.APIurl+"/"+arg.resource;
        }

        fetch(url, {
            method: arg.httpMethod,
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: arg.query ? JSON.stringify(arg.query) : null
        })
        .then(async res=> {
            if(res.ok){
                const data = await res.json();
                arg.onSuccess(data);
            }
            else {
                const message = await res.json();
                arg.onFail(message['message']);
            }
        })
        .catch(err=>{
            arg.onFail(`Error while processing query!`);
        })
    }
}