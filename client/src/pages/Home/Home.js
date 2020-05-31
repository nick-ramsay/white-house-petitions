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

    const useInput = (initialValue) => {
        const [value, setValue] = useState(initialValue);

        function handleChange(e) {
            setValue(e.target.value);
        }

        return [value, handleChange];
    } //This dynamicaly sets react hooks as respective form inputs are updated...

    var unixOneMonthAgo = moment().subtract(30, "day").format("X");

    var [loading, setLoadingStatus] = useState([true]);
    var [initialPetitions, setInitialPetitions] = useState([]);
    var [petitionSearchResults, setPetitionSearchResults] = useState([]);

    var [inputTitle, setInputTitle] = useInput("");
    var [inputLimit, setInputLimit] = useInput(25);


    const petitionSearch = () => {
        console.log("Searched!");
        API.getFirstOneHundredPetitions("", unixOneMonthAgo, "", inputLimit, inputTitle, "", "", "", "", "", "")
            //createdBefore, createdAfter, offset, limit, title, body, signatureThresholdCeiling, signatureThresholdFloor, signatureCountCeiling, signatureCountFloor, status
            .then(res => { if (res !== undefined) { setPetitionSearchResults(res); console.log(res) } else { setPetitionSearchResults([]) } });
    }


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
                <div id="searchParameters" className="mt-3">
                    <h4 className="text-center">Search for Petitions</h4>
                    <form>
                        <div className="form-row text-center">
                            <div className="form-group col-md-12 mt-1">
                                <input className="form-control" type="text" id="inputTitle" name="inputTitle" onChange={setInputTitle} placeholder="Search for terms in petition titles..." />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12 mt-1 text-center">
                                <button className="btn btn-primary m-1" type="button" onClick={petitionSearch}>Search</button>
                                <button className="btn btn-dark text-left m-1" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    Advanced Search
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="accordion" id="advancedSearchParameters">
                        <div className="card">
                            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div className="card-body">
                                    <form>
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <label for="inputPetition">Petition Description</label>
                                                <input type="text" className="form-control" placeholder="Search for terms in petition descriptions..." />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-3">
                                                <label for="inputCreatedBefore">Created Before</label>
                                                <input type="date" className="form-control" id="inputCreatedBefore" />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label for="inputCreatedAfter">Created After</label>
                                                <input type="date" className="form-control" id="inputCreatedAfter" />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label for="inputStatus">Status</label>
                                                <select id="inputStatus" className="form-control">
                                                    <option selected>Any</option>
                                                    <option>Open</option>
                                                    <option>Closed</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label for="inputResultLimit">Result Limit</label>
                                                <input type="number" className="form-control" id="inputResultLimit" defaultValue="25" onChange={setInputLimit} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-3">
                                                <label for="inputMinSignatureThreshold">Minimum Signature Threshold</label>
                                                <input type="number" className="form-control" id="inputMinSignatureThreshold" />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label for="inputMaxSignatureThreshold">Maximum Signature Threshold</label>
                                                <input type="number" className="form-control" id="inputMaxSignatureThreshold" />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label for="inputMinSignatureCollected">Minimum Signatures Collected</label>
                                                <input type="number" className="form-control" id="inputMinSignatureCollected" />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label for="inputMaxSignatureCollected">Minimum Signatures Collected</label>
                                                <input type="number" className="form-control" id="inputMaxSignatureCollected" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="searchResults">
                    {petitionSearchResults.map((searchResult, index) => (
                        <p>{searchResult.title}</p>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;