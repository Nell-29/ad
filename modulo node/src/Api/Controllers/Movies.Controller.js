const Character = require("../Models/Character.Models");
const Comment = require("../Models/Coment.Models");
const Movie = require("../Models/Movies.Models");
const User = require("../Models/User.models");

const{deleteImgCloudinary} = require("../../Api/Middleware/file.middleware")

//! ---post_create---

const createMovie = async (req,res, next) => {

    //let catchImg = req.file?.path;

    console.log(req.body);
    try {
        await Movie.syncIndexes();

     //creamos nueva instancia de Movie 
      
     const newMovie = new Movie(req.body);

     /*if (catchImg) {
        newMovie.Image = catchImg;
     } else {
    // si no se ha guardado hay un error y lo lanzamos en la respuesta
    newMovie.Image =
    "https://res.cloudinary.com/dxvasvakp/image/upload/v1708100990/100-Greatest-Movies-Variety_dmxed0.jpg"
     }

     // guardamos el registro en la db
     */const saveMovie = await newMovie.save();

     // si existe es que ha guardado de forma correcta -->200
     if (saveMovie) {
        return res.status(200).json(saveMovie);
     } else{
        //sino existe es que no ha guardado -->409
        return res.status(409).json("No se ha podido crear La Movie");
     }
    } catch (error) {
        //req.file?.path && deleteImgCloudinary(catchImg);
       // next(error);

        return res.status(409).json({
            error: "Error en la creacion de nueva Movie",
            message: error.message,
        });
        
    }
};




//! ---- patch - toogle----

const toggleCharacters = async (req, res, next) => {
    try {
        // cogemos el id de los params 
      const {id} = req.params;

      // recogemos los characters del body
      const { characters } = req.body; // --> esto nos devuelve un array de id [ "12345","7890"]
      console.log("characters", characters);

      // buscamos la pelicula a actualizar por el id

      const movieById = await Movie.findById(id);

      // comprobamos si esta movie existe en la db y sino lanzamos un 404
      if(movieById) {
        //cogemos lo traido por req.body y lo convertimos en array .split(",") --> js
        // Separando las posiciones del string

        // Separamos por comas y convertimos en array
        const arrayCharacters = characters.split(",");

        console.log("array characters", arrayCharacters);

      // Recorremos el array de characters que son Id para comprobar si estan en la movie (sacarlos) o sino estan (meterlos)

      // Lo metemos en una promesa debido al mapeo que es asincrono y asi no tenemos problemas
       Promise.all(
        arrayCharacters.map(async(character) => {
            console.log("character",character);
            if(movieById.characters.includes(character)){
               // Si lo incluye hay que quitarlo ( character al array de characters de movie)
               //** LO QUITAMOS PORQUE LO INCLUYE */

                try {// buscamos la movie que queremos actualizar
                    await Movie.findByIdAndUpdate(id, {
                      // quitamos el character del array de characters
                      $pull: { characters: character },
                    });
      
                    try {
                      // Buscamos el character y le quitamos la pelicula
                      await character.findByIdAndUpdate(character, {
                        $pull: { movies: id },
                      });
                    } catch (error) {
                      return res.status(409).json({
                        error: "Error al actualizar el character, quitarle la movie",
                        message: error.message,
                      });
                    }
                  } catch (error) {
                    return res.status(409).json({
                      error: "Error al actualizar la movie, quitarle el character",
                      message: error.message,
                    });
                  }
                } else {
                  // Sino lo incluye lo añadimos ( character al array de characters de movie)
                  //** LO AÑADIMOS */
                  try {
                    // actualizamos la movie añadiendole el character
                    await Movie.findByIdAndUpdate(id, {
                      $push: { characters: character },
                    });
      
                    try {
                      // Actualizamos nuestro character metiendo en el campo de movies la movie
      
                      await character.findByIdAndUpdate(character, {
                        $push: { movies: id },
                      });
                    } catch (error) {
                      return res.status(409).json({
                        error: "Error al actualizar el character, añadirle la movie",
                        message: error.message,
                      });
                    }
                  } catch (error) {
                    return res.status(409).json({
                      error: "Error al actualizar la movie, al añadirle el character",
                      message: error.message,
                    });
                  }
                }
              })
            ).then(async () => {
              return res
                .status(200)
                .json(await Movie.findById(id).populate("characters"));
            });
          } else {
            // Lanzamos un 404 porque no existe la pelicula a actualizar
            return res.status(404).json("Movie no encontrada, prueba con otro id");
          }
        } catch (error) {
          return res
            .status(409)
            .json({ error: "Error al actualizar la movie", message: error.message });
        }
      };
      module.exports = { createMovie, toggleCharacters };

