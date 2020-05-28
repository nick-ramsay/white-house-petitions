import axios from "axios";

require("dotenv").config();

const apiUrl = process.env.NODE_ENV === 'production'? '' : '//localhost:3001'

const keys = require("../keys.js");



export default {
    testFunction: function() {
        //console.log(keys.we_the_people.apiKey);
        console.log("Tested an API Function...");
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