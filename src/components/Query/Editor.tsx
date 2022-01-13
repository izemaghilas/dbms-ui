import React, { ReactElement } from "react";
import {BsPlayFill} from "react-icons/bs";
import AppContext from "../../AppContext";

import "./styles/Editor.css";

const Editor: React.FC = (): ReactElement => {
    return(
        <div className="query-editor">
            <textarea className="editor-line-number" cols={2} rows={1} value=">" readOnly></textarea>
            <AppContext.Consumer>
                {value=>(
                    <textarea 
                        className="editor-input"
                        placeholder="dbms query"
                        autoFocus={true}
                        onChange={event=>value.setQuery(event.target.value)}
                        spellCheck={false}
                    ></textarea>
                )}
            </AppContext.Consumer>
            <AppContext.Consumer>
                {value=>(
                    <BsPlayFill 
                        style={{
                            alignSelf: "flex-start",
                            cursor: "pointer",
                        }}
                        title="execute query"
                        size={50} 
                        color="#c4c4c4"
                        onClick={value.executeQuery}
                    />
                )}
            </AppContext.Consumer>
            
        </div>
    );
}

export default Editor;