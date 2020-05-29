import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import API from "../../utils/API";
import "./style.css";

const Home = () => {

    var [initialPetitions, setInitialPetitions] = useState([]);


    useEffect(() => {
        API.getFirstOneHundredPetitions().then(res => setInitialPetitions(res));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <div id="carouselExampleControls" className="carousel slide mt-3" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <h3>Slide 1</h3>
                        </div>
                        <div className="carousel-item">
                            <h3>Slide 2</h3>
                        </div>
                        <div className="carousel-item">
                            <h3>Slide 3</h3>
                        </div>
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
                    {initialPetitions.map((petition, index) => (
                        <strong><p key={index}>{petition.title}...</p></strong>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;