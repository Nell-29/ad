const csv = require("cvs_parser");
const fs = require("fs");
 
const movie = [] ;

fs.readFile("src/data/movie.json", (error,data) => {
    error ? console.log (error) : movie.push (JSON.parse(data));

    console.log(movie);
});