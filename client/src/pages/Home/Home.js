import React, { useState, useEffect } from 'react';
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
            <p>Testing React Router Rendering...</p>
        </div>
    )
}

export default Home;