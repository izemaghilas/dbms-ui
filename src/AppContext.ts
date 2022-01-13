import React from "react";

export interface AppContextInterface {
    query: string,
    resultSet: string,
    loading: boolean,
    setQuery(query: string): void,
    executeQuery(): void
}

const AppContext = React.createContext<AppContextInterface>({
    query: "",
    resultSet: "",
    loading: false,
    setQuery: (query)=>{},
    executeQuery: ()=>{}
});

export default AppContext;