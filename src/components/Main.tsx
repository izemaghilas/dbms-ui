import React, { ReactElement } from "react";
import Printer from "./Printer";
import Query from "./Query";

import "./styles/Main.css";

const Main: React.FC = (): ReactElement => {
    return(
        <main>
            <Query />
            <div className="dbms-seperator"></div>
            <Printer />
        </main>
    );
}

export default Main;