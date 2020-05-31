import axios from "axios";
import moment from "moment";

require("dotenv").config();

//const apiUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3001'
const keys = require("../keys.js");

export default {
    getFirstOneHundredPetitions: function (createdBefore, createdAfter, offset, limit, title, body, signatureThresholdCeiling, signatureThresholdFloor, signatureCountCeiling, signatureCountFloor, status) {
        //console.log(createdBefore, createdAfter, offset, limit, title, body, signatureThresholdCeiling, signatureThresholdFloor, signatureCountCeiling, signatureCountFloor, status);
        return (
            axios({
                "method": "GET",
                "url": "https://community-we-the-people.p.rapidapi.com/petitions",
                "headers": {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host": "community-we-the-people.p.rapidapi.com",
                    "x-rapidapi-key": keys.we_the_people.apiKey,
                    "useQueryString": true
                }, "params": {
                    "createdBefore": createdBefore,
                    "createdAfter": createdAfter,
                    "offset": offset,
                    "limit": limit,
                    "title": title,
                    "body": body,
                    "signatureThresholdCeiling": signatureThresholdCeiling,
                    "signatureThresholdFloor": signatureThresholdFloor,
                    "signatureCountCeiling": signatureCountCeiling,
                    "signatureCountFloor": signatureCountFloor,
                    "status": status
                }
            })
                .then((response) => {
                    return response.data.results
                })
                .catch((error) => {
                    console.log(error)
                })
        )
    }

    /*getBookResults: function (query) {
        return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query + "&key="+keys.google_books.apiKey)
    },
    getSavedBooks: function() {
        return axios.get(apiUrl + "/api/books/saved");
    },
    deleteBook: function(deletedBook) {
        return axios({method:"delete", url: apiUrl + "/api/books/delete/" + deletedBook});
    },
    saveBook: function(bookData) {
        return axios({method:"post", url: apiUrl + "/api/books", data: bookData })
    }
    */
};