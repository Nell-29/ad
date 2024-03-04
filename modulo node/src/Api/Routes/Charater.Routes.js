//! nos traemos del middleware el upload

const{upload} = require("../Middleware/file.middleware");

//! importamos los controladores 

const {create,
    getAll,
    getById,
    getByName,} = require ("../Controllers/Character.Controller");

//! creamos un router especifico para Character

const express = require("express");

const CharacterRouter = express.Router();

//!--- añadimos nuestras rutas 

// En medio de la ruta y del controlador (funión create)
// Se encuentra el middleware de subida de ficheros a cloudinary
// multer tiene el metodo SINGLE para subir una sola imagen
//* por el req.file va a recibir una clave que se llama image y con esa
//  * clave quiero que el midddleware upload me lo suba a cloudinary para este disponible cuando entre
//  * al controlador mediante la req.file.path ===> esto es igual a la URL de la imagen en cloudinary
CharacterRouter.post("/create",upload.single("image"),create);
CharacterRouter.get("/getAll", getAll);
CharacterRouter.get("/getById",getById);
CharacterRouter.get("/getByName",getByName);

//! exportamos la funcion creada arriba

module.exports = CharacterRouter;