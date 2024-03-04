//!importamos 

const bcrypt = require ("bcrypt");
// para variable de entorno
const dotenv = require("dotenv");
dotenv.config();
// para el envio de email y contraseñas 
const validator = require("nodemailer");

//? nos traemos el modelo del usuario 

const User = require("../Models/User.models");

//! para borrar imagen de cloudinary
const{deleteImgCloudinary} = require("../../Api/Middleware/file.middleware");

const enumOk = require("../../Api/Utils/enunOk");

//! nos traemos los modelos 
const Character = require("../Models/Character.Models");
const Comment = require("../Models/Coment.Models");
const Movie = require("../Models/Movies.Models");
//const User = require("../Models/User.models");

//!----------------------POST-CREATE------------------------

const create = async(req, res, next) => {
    // guardamos la url de la imagen que se sube a cloudinary y los archivos (imagen) --> req.file

    let catchImg = req.file?.path;

   console.log("req body",req.body);
    console.log("req body",req.file);

    try {
        //! actualizar indexes
        //los indexes de forman cuando la clave es unica 
        // es importante por si es modificado posteriormente a la creacion del controlador
        await Character.syncIndexes();

        // creamos una nueva instacia de Character con los datos del body 

        const newCharacter = new Character(req.body);

        // comprobamos si hay imagen para añadirla al character creado
        if (catchImg) {
           newCharacter.Image = catchImg;
        } else {
       // si no se ha guardado hay un error y lo lanzamos en la respuesta
       newCharacter.Image =
       "https://res.cloudinary.com/dxvasvakp/image/upload/v1707124366/5165bbc3564b4296c70371b75c9774b0_dtwnux.jpg"
        }
       
       //! guardamos el character creado 
       const saveCharacter = await newCharacter.save();
       
       // comprobamos si el character se ha guardado para lanzar la respuesta
       if (saveCharacter) {
        // si se ha guardado lanzamos una respuesta correcta con los datos del Character generados
        return res.status(200).json(saveCharacter);
       } else {
       return res 
         .status(404)
         .json("No se ha podido guardar en la base de datos");
        }
    } catch (error) {
        //! solo en trammos en el catch cuando ha habido algun error
        /**si ha habido algun error 
         * tenemos que borrar la imagen de cloudinary porque se sube antes de que nos pmetamos en el 
         * controlador --> porque es un middleware que esta entre la peticion del cliente y el controlador
         */
        // comrpobamos si hay imagen en req.file porque si es asi se ha subido a cloudinary y hay que borrala

        req.file?.path && deleteImgCloudinary(catchImg);
        next(error);
        return res.status(409).json("Error en el creado del Character");
    }
};


//! get - get all

const getAll = async (req, res, next) => {
    try {
        // Traemos todos los elementos de la coleccion
      const allCharacter = await Character.find();
      // Find nos devuelve un array con todos los elementos coincidentes

      if(allCharacter.length > 0) {
      // Si hay registros lanzamos una respuesta correcta

        return res.status(200).json(allCharacter);
      } else {
      // si no hay registros lanzamos una respuesta 404
        return res.status(404).json("No se han encontrado personajes")
      }

    } catch (error) {
        // capturtamos el error
        return res 
        .status(409)
        .json({ error: "Error al buscar personajes", message: error.message })
        
    }
}


//! get - get by  Id

const getById = async (req, res, next) => {
    try {
         // Hacemos destructuring del id traido por params
        const {id} = req.params;

     // Encontramos al character que tenga ese ID
     //! POPULATE Nos permite obtener los datos de los campos populados
        const characterById = await Character.findById(id).populate("movies");

     // Comprobamos si se ha encontrado el character
        if (characterById) {
            return res.status(200).json(characterById);
        } else {
            return res.status(404).json("no se ha encontrado el character");
        }
    } catch (error) {
        return res 
          .status(409)
          .json({error: "error al buscar por el Id", message:error.message});
        
    }
};


//! get by name 

const getByName = async (req, res, next) => {
    console.log(req);
    try {
        // Hacemos destructuring del name traido por params
        const { name } = req.params;

        // Buscamos al character que coincida en el name
        const charactersByName = await Character.find({ name });
        console.log(charactersByName);

        // Si la longitud del array es mayor a 0 hay character con ese name y la respuesta es 200
        if(characterByName.length > 0){
            return res.status(200).json(charactersByName);
        } else{
          return res.status(404).json("no se han encontrado registros");
        }
    } catch (error) {
        return res 
        .status(409)
        .json({error: "error durante la busqueda", message: error.message});
    }
};



//! exportamos el modulo

module.exports = {create, getAll, getById, getByName};





