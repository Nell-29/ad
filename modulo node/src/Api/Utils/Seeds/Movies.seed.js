//! datos a insertar de forma masiva

const moviesDataSet = [
    {
      title: "The Batman",
      poster:
        "https://xl.movieposterdb.com/22_02/2022/1877830/xl_1877830_764432ad.jpg?v=2023-02-19%2023:41:01",
      year: 2022,
      released: true,
    },
    {
      title: "Dune",
      poster:
        "https://xl.movieposterdb.com/21_08/2021/1160419/xl_1160419_565d3d10.jpg?v=2023-01-06%2017:55:10",
      year: 2022,
      released: true,
    },
    {
      title: "Jaws",
      poster:
        "https://xl.movieposterdb.com/08_01/1975/73195/xl_73195_04c15a8a.jpg?v=2023-02-25%2009:28:24",
      year: 1975,
      released: false,
    },
  ];

//! importaciones de mongoose y dotenv y su configuracion

const mongoose = require("mongoose");

const dotenv = require("dotenv");
const Movies = require("../../Models/Movie.Seeds");
dotenv.config();

//!  funcion de sembrado de semilla

const MONGO_URI = process.env.MONGO_URI;

const createSeed = () => {
     // Conectamos a la mongouri mediante mongoose.connect
     mongoose.connect(MONGO_URI, {
        useNewURLParser: true,
        useUnifiedTopology: true,
     })
     .then(async () => {
      // Vamos a buscar si hay algún registro de Movie en la DB y si hay alguno serán borrados
      // --> FIND (mongoose) --> encuentra todas las coincidencias -- no confundir con ES6

        const allMovie = await Movies.find();

    // Miramos si hay registros para borrarlos mediante drop()
        if (allMovie.length > 0) {

            await Movies.collection.drop();

            console.log("registros borrados de la coleccion de Movie");
        }
     })
     .catch((error) => console.log("error en l siembra", error.massage))
     .then(async() => {
      // Vamos a rrecorrer el array y por cada elemento vamos a crear un nuevo registro de Movie
        const allMovieModel = moviesDataSet.map((movie) => new Movies(movie));
        
        // Los insertamos todos los registros creados en la base de datos
        await Movies.insertMany(allMovieModel);

        console.log("base de datos sermbrada 🐸")

     })
     .catch((error) => console.log("error en el sembrado", error.massage))

      // Por último nos desconectamos de la base de datos
     .finally(() => {
        mongoose.disconnect();
     });
};

module.exports = createSeed;