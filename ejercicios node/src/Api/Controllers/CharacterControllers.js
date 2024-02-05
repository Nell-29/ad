const {deleteImgCloudinary} = require("../../Middelware/fielsMiddleware")

// nos traemos el modelo 

const characters = require("../Models/CharacterModel");

//* post- create 

const create = async (req, res, next) => {
    // guardamos la url de la imagen que se sube a cloudinary 
    // archivos (imagen) --> req.file

    let catchImg = req.file?.path;

    console.log("req body",req.body);
    console.log("req file",req.file);

    try {
        //* actualizar indexes
        // los indexes de forman cuando la clave es unica
        // es importante por si es modificado posteriormente a la creacion del controlador 
        await characters.syncIndexes();
        // creamos una nueva instacia de character con los datos del body

        const newCharacters = new characters(req.body);

        // creamos una nueva instacia de character con los datos del body

        if(catchImg){
            newCharacters.image = catchImg;
        } else {
            // sino trae imagen la solicitud , le ponemos al character una imagen por defecto 

            newCharacters.image=
            "https://res.cloudinary.com/dxvasvakp/image/upload/v1707124366/5165bbc3564b4296c70371b75c9774b0_dtwnux.jpg";
        }

        //* guardamos el character creado 

        const saveCharacters = await newCharacters.save();
        // comprobamos si el character se ha guardado para lanzar una respuesta 
        if (saveCharacters) {
            // si se ha guardado lanzamos una respuesta correcta con los datos del character generados
            return res.status(200).json(saveCharacters);
        } else {
            // si no se ha guardado hay un error y lo lanzamos en la respuesta
            return res 
            .status(404)
            .json("no se ha podido guardar en la base de datos");
        }
        
    } catch (error) {
        //* solo entramos aqui en el catch cuando ha habido un error 
        /**si ha habido un error
         * tenemos que borrar la imagen en cloudinary porque se sube antes de que nos metamos en 
         * el controlador  --> porque es un middleware que esta entre la peticion del cliente y el controlador 
         */
        //comprobar si hay imagen en req.file porque si es asi se ha subido a cloudinary y hay que borrarla

        req.file?.path && deleteImgCloudinary(catchImg);
        next(error);
        return res.status(409).json("error en el creado del character");

        
    }

};

module.exports = {create};