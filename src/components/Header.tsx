import React, { ReactElement } from "react";
import { BsGithub } from "react-icons/bs";

import "./styles/Header.css";

const Header: React.FC = ():ReactElement => {
    return(
        <header>
            <div className="dbms-title">
                <span>DBMS</span>
            </div>
            <a href="#" className="dbms-source-code">
                <BsGithub
                    style={{
                        alignSelf: "center"
                    }}
                    color="#c4c4c4"
                    size={25}
                />
                <span>Source code</span>
            </a>
        </header>
    );
}

export default Header;