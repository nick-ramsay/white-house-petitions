import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import "./style.css";

const Home = () => {

    /*
    var [comments, setComments] = useState(CommentData);
    var [unacknowledgedCount, setUnacknowledgedCount] = useState(0)

    useEffect(() => {
        setComments(CommentData);
        getUnacknowledgedCount();
    }, []);

    const getUnacknowledgedCount = () => {
        setUnacknowledgedCount(unacknowledgedCount = 0);
        for (var i = 0; i < comments.length; i++) {
            if (comments[i].acknowledged === false) {
                setUnacknowledgedCount(unacknowledgedCount += 1);
            }
        }
    }

    const setCommentRead = event => {
        event.preventDefault();
        var currentComments = comments;
        var selectedCommentIndex = event.currentTarget.dataset.commentIndex;
        currentComments[selectedCommentIndex].acknowledged = true;
        setComments(comments => currentComments);
        getUnacknowledgedCount();
    }

    */

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
            </div>
        </div>
    )
}

export default Home;