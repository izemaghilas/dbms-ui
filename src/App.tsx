import React, { ReactElement, useState } from "react";
import Main from "./components/Main";
import Header from "./components/Header";
import AppContext from "./AppContext";
import APIClient from "./api-client/APIClient";

import "./App.css";

const App: React.FC = (): ReactElement => {

  const [query, setQuery] = useState<string>("");
  const [resultSet, setResultSet] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  const editQuery = (value: string): void => {
    value = value.replaceAll("\n", " ");
    setQuery(value);
  };

  const showQueryResult = (resultSet: string): void => {
    setLoading(false);
    setResultSet(resultSet);
  }
  
  const executeQuery = (): void => {
    setLoading(true);
    APIClient.processQuery(query, showQueryResult);
  };

  return(
    <div className="App">
      <AppContext.Provider value={{
        query: query, 
        resultSet: resultSet,
        loading: loading,
        setQuery: editQuery, 
        executeQuery: executeQuery
      }}>
        <Header />
        <Main />
      </AppContext.Provider>
    </div>
  );
}

export default App;
