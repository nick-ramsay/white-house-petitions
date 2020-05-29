import React, { useState, useEffect } from 'react';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../utils/API";
import "./style.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #B22234;
  color: #B22234;
  `;

const Home = () => {

    var [loading, setLoadingStatus] = useState([true]);
    var [initialPetitions, setInitialPetitions] = useState([]);


    useEffect(() => {
        API.getFirstOneHundredPetitions()
            .then(res => { if (res !== undefined) { setInitialPetitions(res); setLoadingStatus(false) } else { setInitialPetitions([]) } });
        API.getFirstOneHundredPetitions().then(res => console.log(res));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <div id="carouselExampleControls" className="carousel slide mt-3" data-ride="carousel">
                    <ClipLoader
                        css={override}
                        size={150}
                        color={"#B22234"}
                        loading={loading}
                    />
                    <div className="carousel-inner">
                        {initialPetitions.map((petition, index) => (
                            <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"}>
                                <h3>{petition.title}</h3>
                            </div>

                        ))
                        }
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                <div className="col-md-12">

                </div>
            </div>
        </div>
    )
}

export default Home;