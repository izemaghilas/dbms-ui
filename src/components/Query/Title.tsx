import React, { ReactElement } from "react";

import "./styles/Title.css";


const queries = [
    {
        name: "CREATE",
        description: "create new relation in database",
        syntax: "CREATE relation_name number_of_columns data_type_of_each_column",
        example: "CREATE employee 3 string45 string45 float"
    },
    {
        name: "INSERT",
        description: "insert a record to a relation",
        syntax: "INSERT relation_name value_of_each_column",
        example: "INSERT employee employee_first_name employee_last_name employee_salary"
    },
    {
        name: "SELECTALL",
        description: "select all records of a relation",
        syntax: "SELECTALL relation_name",
        example: "SELECTALL employee"
    },
];

const dataTypes = ["int", "float", "stringL: where L is the length of the string"];

const QueryLanguage: React.FC = (): ReactElement => {
    return(
        <div className="dbms-terminal-query-language">
            <h4>DBMS query language</h4>
            {queries.map((query, index)=>(
                <div className="dbms-terminal-query-language-doc" key={"query"+index}>
                    <pre style={{fontWeight: "bold"}}>{query.name}: {query.description}</pre>
                    <pre style={{marginLeft: "30px"}}>Syntax: {query.syntax}</pre>
                    <pre style={{marginLeft: "30px"}}>Ex: {query.example}</pre>
                </div>
            ))}
            <div className="dbms-terminal-data-types">
                <pre>Data Types: {dataTypes.join(", ")}</pre>
            </div>
        </div>
    );
}

const Title: React.FC = (): ReactElement => {
    const title: string = 
    "######      #######     #       #    #######\n"+
    "#-----#     #------#    ##     ##-  # ------#\n"+
    "#-`````#    #-``````#   #-#   # #-` #- ``````-\n"+
    "#-`     #   #-`    # -  #-`# # -#-` #-`       `\n"+
    "#-`     #-  ####### - ` #-` # - #-`  ######\n"+
    "#-`     #-` #------# `  #-`  - `#-`   -----#\n"+
    "#-`    # -` #-``````#   #-`   ` #-`    `````#\n"+
    "#-`   # - ` #-`    # -  #-`     #-` #      # -\n"+
    "###### - `  ####### - ` #-`     #-`  ###### - `\n"+
    " ------ `    ------- `   -`      -`   ------ `\n"+
    "  ``````      ```````     `       `    ``````\n";

    return (
        <div className="dbms-terminal-title">
            <pre className="dbms-ascii-arts">{title}</pre>
            <QueryLanguage />
        </div>
    );
}

export default Title;