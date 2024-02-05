// nos traemos UPLOAD ( funcion de multer para subida de ficheros)

const {upload} = require("../../Middelware/fielsMiddleware");

//* importamos los controladores

const {create}  = require ("../Controllers/CharacterControllers");

//* creamos un router especifico para character --- al llamarlo disponemos de todas las rutas __> seran llamadas al index

const express = require("express");

const CharacterRouter = express.Router();

//* añadimos nuestras rutas 

/**en el medio de las rutas y del controlador (funcion create) 
 * se encuentra en el middleware de subida de ficheros o cloudinary
 * multer tiene el metodo SINGLE para subir una sola imagen 
*/
//* por el req.file va a recibir una clave que se llama image y con esa clave quiero
//* que el middleware upload me lo suba a cloudinary para qu este disponible cuando entre 
//* al controlador mediante la req.file.path ===> esto es igual ala la URL de la imagen en cloudinary
CharacterRouter.post("/create",upload.single("image"),create);

module.exports = CharacterRouter;

