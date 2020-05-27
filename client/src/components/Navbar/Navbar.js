import React from "react";
import WhiteHouseIcon from "../../images/white-house.png";
import "./style.css";

function Navbar(props) {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container">
                <a class="navbar-brand" href="/"><img id="white-house-icon" src={WhiteHouseIcon}></img><span id="navbar-title">Petition the POTUS</span></a>
            </div>
        </nav>
    )
};

export default Navbar;
