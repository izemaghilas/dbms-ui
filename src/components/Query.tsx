import React, { ReactElement } from "react";

import Editor from "./Query/Editor";
import Title from "./Query/Title";

import "./styles/Query.css";

const Query: React.FC = ():ReactElement => {
   
    return(
        <div className="dbms-terminal" >
            <Title />
            <Editor />
        </div>
    );
}

export default Query;