import axios from "axios";

require("dotenv").config();

const apiUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3001'

const keys = require("../keys.js");



export default {
    getFirstOneHundredPetitions: function () {
        console.log("Tested an API Function...");
        const axios = require("axios");

        axios({
            "method": "GET",
            "url": "https://community-we-the-people.p.rapidapi.com/petitions",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "community-we-the-people.p.rapidapi.com",
                "x-rapidapi-key": "841a202dc2mshbc0ce5168dd0f42p17a864jsna0d5ce9d0d22",
                "useQueryString": true
            }, "params": {
                "limit": "100"
            }
        })
            .then((response) => {
                console.log(response);
                return(response);
            })
            .catch((error) => {
                console.log(error)
            })
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