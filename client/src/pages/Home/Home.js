import React, { useState, useEffect } from 'react';
import { css } from "@emotion/core";
import carouselImage from "../../images/carousel-images/white-house-day.jpg";
import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";
import BarLoader from "react-spinners/BarLoader";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../utils/API";
import "./style.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #B22234;
  color: #B22234;
  `;

const carouselImages = [carouselImage, carouselImage, carouselImage, carouselImage, carouselImage];

const Home = () => {

    const decode = (str) => {
        return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    }

    const useInput = (initialValue) => {
        const [value, setValue] = useState(initialValue);

        function handleChange(e) {
            setValue(e.target.value);
        }

        return [value, handleChange];
    } //This dynamicaly sets react hooks as respective form inputs are updated...

    const carouselImages = [carouselImage, carouselImage, carouselImage, carouselImage, carouselImage];

    var [carouselImageIndex, setCarouselImageIndex] = useState(0);
    var [loading, setLoadingStatus] = useState([true]);
    var [searching, setSearchingStatus] = useState("");
    var [firstSearchExecuted, setFirstSearchExecuted] = useState("")
    var [initialPetitions, setInitialPetitions] = useState([]);
    var [petitionSearchResults, setPetitionSearchResults] = useState([]);

    var [inputTitle, setInputTitle] = useInput("");
    var [inputBody, setInputBody] = useInput("");
    var [inputCreatedBefore, setInputCreatedBefore] = useInput("");
    var [inputCreatedAfter, setInputCreatedAfter] = useInput("");
    var [inputStatus, setInputStatus] = useInput("");
    var [inputLimit, setInputLimit] = useInput("");
    var [inputMinSignatureThreshold, setInputMinSignatureThreshold] = useInput("");
    var [inputMaxSignatureThreshold, setInputMaxSignatureThreshold] = useInput("");
    var [inputMinSignatureCollected, setInputMinSignatureCollected] = useInput("");
    var [inputMaxSignatureCollected, setInputMaxSignatureCollected] = useInput("");


    const petitionSearch = () => {
        setPetitionSearchResults([]);
        setSearchingStatus(true);
        API.getFirstOneHundredPetitions(moment(inputCreatedBefore, "YYYY-MM-DD").format("X"), moment(inputCreatedAfter, "YYYY-MM-DD").format("X"), "", inputLimit, inputTitle, inputBody, inputMaxSignatureThreshold, inputMinSignatureThreshold, inputMaxSignatureCollected, inputMinSignatureCollected, inputStatus)
            //createdBefore, createdAfter, offset, limit, title, body, signatureThresholdCeiling, signatureThresholdFloor, signatureCountCeiling, signatureCountFloor, status
            .then(res => { if (res !== undefined) { setPetitionSearchResults(res); setSearchingStatus(false); setFirstSearchExecuted(true); console.log(res) } else { setPetitionSearchResults([]) } });
    }


    useEffect(() => {
        API.getFirstOneHundredPetitions("", moment().subtract(7, "day").format("X"), "", "", "", "", "", "", "", "", "open")
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
                            size={240}
                            color={"#B22234"}
                            loading={loading}
                        />
                        <div className="carousel-inner pr-1 pl-1">
                            {initialPetitions.map((petition, index) => (
                                <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"} style={{ backgroundImage: `url(${carouselImages[carouselImageIndex]})` }}>
                                    <a href={petition.url} target="blank" className="carouselPetitionLink" role="button"><h4 className="col-md-10 offset-md-1"><strong>{decode(petition.title)}</strong></h4></a>
                                    <div className="carouselSlideInfo">
                                        <p>{(petition.signatureCount < petition.signatureThreshold) ? (petition.signatureThreshold - petition.signatureCount) + " signatures are still needed..." : "Threshold met with " + petition.signatureCount + " signatures!"}</p>
                                        <p>{moment(moment.unix(petition.deadline)).diff(moment(), 'days') !== 0 ? moment(moment.unix(petition.deadline)).diff(moment(), 'days') + (moment(moment.unix(petition.deadline)).diff(moment(), 'days') === 1 ? " day remaining" : " days remaining") : "Due Today"}</p>
                                    </div>
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
                        <div className="accordion" id="advancedSearchParameters">
                            <div className="card">
                                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="inputPetition">Petition Description</label>
                                                <input type="text" className="form-control" placeholder="Search for terms in petition descriptions..." onChange={setInputBody} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputCreatedAfter">Created After</label>
                                                <input type="date" className="form-control" id="inputCreatedAfter" name="inputCreatedAfter" onChange={setInputCreatedAfter} />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputCreatedBefore">Created Before</label>
                                                <input type="date" className="form-control" id="inputCreatedBefore" onChange={setInputCreatedBefore} />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputStatus">Status</label>
                                                <select id="inputStatus" className="form-control" defaultValue="open" onChange={setInputStatus}>
                                                    <option value="">Any</option>
                                                    <option value="open">Open</option>
                                                    <option value="closed">Closed</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputResultLimit">Result Limit</label>
                                                <input type="number" min="0" max="1000" className="form-control" id="inputResultLimit" onChange={setInputLimit} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputMinSignatureThreshold">Minimum Signature Threshold</label>
                                                <input type="number" min="0" className="form-control" id="inputMinSignatureThreshold" onChange={setInputMinSignatureThreshold} />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputMaxSignatureThreshold">Maximum Signature Threshold</label>
                                                <input type="number" min="0" className="form-control" id="inputMaxSignatureThreshold" onChange={setInputMaxSignatureThreshold} />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputMinSignatureCollected">Minimum Signatures Collected</label>
                                                <input type="number" min="0" className="form-control" id="inputMinSignatureCollected" onChange={setInputMinSignatureCollected} />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputMaxSignatureCollected">Maximum Signatures Collected</label>
                                                <input type="number" min="0" className="form-control" id="inputMaxSignatureCollected" onChange={setInputMaxSignatureCollected} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12 mt-1 text-center">
                                <button className="btn search-btn m-1" type="button" onClick={petitionSearch}>Search</button>
                                <button className="btn btn-dark text-left m-1" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    Advanced Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div id="searchResults">
                    <p className="text-center">{(firstSearchExecuted === true && searching === false) ? petitionSearchResults.length + " " + (petitionSearchResults.length === 1 ? "result" : "results") + " returned" : " "}</p>
                    <BarLoader
                        css={override}
                        color={"#B22234"}
                        loading={searching}
                    />
                    {petitionSearchResults.map((searchResult, index) => (
                        <div key={index} className="card mt-3">
                            <div className="card-body">
                                <p className="search-result-details"><strong>{decode(searchResult.title)}</strong></p>
                                <div className="pb-2">
                                    {searchResult.issues.map((resultIssue, index) => (
                                        <span key={index} className="badge petition-category-badge mr-1">{decode(resultIssue.name)}</span>
                                    ))
                                    }
                                </div>
                                <p className="search-result-details">{moment(moment.unix(searchResult.created)).format("LL")}</p>
                                <a href={searchResult.url} target="_blank" rel="noopener noreferrer"><button type="button" className="btn btn-sm btn-outline view-petition-result-btn mt-2">View Petition</button></a>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;