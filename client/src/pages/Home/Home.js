import React, { useState, useEffect } from 'react';
import { css } from "@emotion/core";
import carouselImages from "../../images/carousel-images/white-house-day.jpg";
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
    var unixOneMonthAgo = moment().subtract(30, "day").format("X");

    var [loading, setLoadingStatus] = useState([true]);
    var [initialPetitions, setInitialPetitions] = useState([]);


    useEffect(() => {
        API.getFirstOneHundredPetitions("", unixOneMonthAgo, "", 25, "", "", "", "", "", "", "")
            //createdBefore, createdAfter, offset, limit, title, body, signatureThresholdCeiling, signatureThresholdFloor, signatureCountCeiling, signatureCountFloor, status
            .then(res => { if (res !== undefined) { setInitialPetitions(res); setLoadingStatus(false); console.log(res) } else { setInitialPetitions([]) } });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="openingCarouselContainer">
                    <div id="carouselExampleControls" className="carousel slide carousel-fade mt-3" data-ride="carousel">
                        <ClipLoader
                            css={override}
                            size={150}
                            color={"#B22234"}
                            loading={loading}
                        />
                        <div className="carousel-inner pr-1 pl-1">
                            {initialPetitions.map((petition, index) => (
                                <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"} style={{ backgroundImage: `url(${carouselImages})` }}>
                                    <h4 className="col-md-10 offset-md-1"><strong>{petition.title}</strong></h4>
                                    <p>{moment(moment.unix(petition.created)).format("LL")}</p>
                                    <p>{petition.signatureCount} of {petition.signatureThreshold} signatures received</p>
                                    <p>Due by {moment(moment.unix(petition.deadline)).format("LL")}</p>
                                    <p>{moment(moment.unix(petition.deadline)).diff(moment(), 'days')} day(s) remaining</p>
                                    <a href={petition.url} className="btn btn-custom btn-sm active carouselViewPetitionBtn" role="button" aria-pressed="true" target="_blank" rel="noopener noreferrer">View Petition</a>
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
                </div>
                <div className="searchContainer mt-3">
                    <h2 className="text-center">Search for Petitions</h2>
                    <form>
                        <div className="form-row text-center">
                            <div className="form-group col-md-11 mt-1">
                                <input className="form-control" type="text" placeholder="Search for terms in petition descriptions" />
                            </div>
                            <div className="form-group col-md-1 mt-1">
                                <button className="btn btn-primary">Search</button>
                            </div>
                            <div className="form-group col-md-2 mt-1">
                                <button class="btn text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    Advanced Search
                                    </button>
                            </div>
                        </div>
                    </form>

                    <div class="accordion" id="advancedSearchParameters">
                        <div class="card">
                            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div class="card-body">
                                    <form>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label for="inputEmail4">Email</label>
                                                <input type="email" className="form-control" id="inputEmail4" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label for="inputPassword4">Password</label>
                                                <input type="password" className="form-control" id="inputPassword4" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label for="inputAddress">Address</label>
                                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                                        </div>
                                        <div className="form-group">
                                            <label for="inputAddress2">Address 2</label>
                                            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label for="inputCity">City</label>
                                                <input type="text" className="form-control" id="inputCity" />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label for="inputState">State</label>
                                                <select id="inputState" className="form-control">
                                                    <option selected>Choose...</option>
                                                    <option>...</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label for="inputZip">Zip</label>
                                                <input type="text" className="form-control" id="inputZip" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="gridCheck" />
                                                <label className="form-check-label" for="gridCheck">
                                                    Check me out
                                                </label>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Sign in</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;