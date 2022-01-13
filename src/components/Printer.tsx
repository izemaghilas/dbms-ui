import React, { ReactElement } from "react";
import AppContext from "../AppContext";
import ActivityIndicator from "./Printer/ActivityIndicator";

import "./styles/Printer.css";

const Printer: React.FC = ():ReactElement => {
    return(
        <AppContext.Consumer>
            {value=>(
                <div className="result-set-printer">
                    {
                        value.loading ?
                            <ActivityIndicator />
                        :
                            <pre>{value.resultSet}</pre>
                    }
                </div>                
            )}
        </AppContext.Consumer>
    );
}

export default Printer;