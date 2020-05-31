import axios from "axios";

require("dotenv").config();

//const apiUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3001'
const keys = require("../keys.js");

export default {
    getFirstOneHundredPetitions: function (createdBefore, createdAfter, offset, limit, title, body, signatureThresholdCeiling, signatureThresholdFloor, signatureCountCeiling, signatureCountFloor, status) {
        //console.log(createdBefore, createdAfter, offset, limit, title, body, signatureThresholdCeiling, signatureThresholdFloor, signatureCountCeiling, signatureCountFloor, status);
        console.log(status);
        console.log(title);
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
                    "createdBefore": createdBefore ? createdBefore:"",
                    "createdAfter": createdAfter ? createdAfter:"",
                    "offset": offset ? offset:"",
                    "limit": limit ? limit:"",
                    "title": title ? title:"",
                    "body": body ? body:"",
                    "signatureThresholdCeiling": signatureThresholdCeiling ? signatureThresholdCeiling:"",
                    "signatureThresholdFloor": signatureThresholdFloor ? signatureThresholdFloor:"",
                    "signatureCountCeiling": signatureCountCeiling ? signatureCountCeiling:"",
                    "signatureCountFloor": signatureCountFloor ? signatureCountFloor:"",
                    "status": status ? status:""
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