import React from "react";
import WhiteHouseIcon from "../../images/white-house.png";
import "./style.css";

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <a className="navbar-brand" href="/"><img id="white-house-icon" src={WhiteHouseIcon}></img><span id="navbar-title">Petition the POTUS</span></a>
            </div>
        </nav>
    )
};

export default Navbar;
