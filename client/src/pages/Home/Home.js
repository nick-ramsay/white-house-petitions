import React, { useState, useEffect } from 'react';
import { css } from "@emotion/core";
import moment from "moment";
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
                <div id="carouselExampleControls" className="carousel slide carousel-fade mt-3" data-ride="carousel">
                    <ClipLoader
                        css={override}
                        size={150}
                        color={"#B22234"}
                        loading={loading}
                    />
                    <div className="carousel-inner pr-1 pl-1">
                        {initialPetitions.map((petition, index) => (
                            <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"}>
                                <h4 className="col-md-10 offset-md-1"><strong>{petition.title}</strong></h4>
                                <p>{moment(moment.unix(petition.created)).format("LL")}</p>
                                <p>{petition.signatureCount} of {petition.signatureThreshold} signatures received</p>
                                <p>Due by {moment(moment.unix(petition.deadline)).format("LL")}</p>
                                <p>{moment(moment.unix(petition.deadline)).diff(moment(),'days')} day(s) remaining</p>
                                <a href={petition.url} class="btn btn-dark btn-sm active" role="button" aria-pressed="true" target="_blank" rel="noopener noreferrer">View Petition</a>
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