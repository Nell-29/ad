const {createMovie,toggleCharacters} = require("../Controllers/Movies.Controller");

const MovieRoutes = require("express").Router();

MovieRoutes.post("/create",createMovie);
MovieRoutes.patch("/toggle:id",toggleCharacters);

module.exports = MovieRoutes;