//! importciones

const jwt = require("jsonwebtoken");
const dotenv = require ("dotenv");
const { Error } = require("mongoose");
dotenv.config();
//** generamos el token  */  --> este TOKEN recibe el id y el email del usuario 
// esta funcion sera urilizada en el login

const genarateToken = (id, email) => {
    // sino tenemos el id o el email mandaderos un error

    if (!id|| !email) {
        throw new Error("Falta el email o Id");
    }
    // si lo recibimos es correcta registramos la peticion
    // utilizamos el metodo sing de jwt
    // params --> palabra secreta (.env) y la expiracion y caducidad 

    return jwt.sign({id, email}, process.env.JWT_SECRET, { expiresIn: "1d"});

    //** verificamos el token */
   // verificamos -- para saber si es valido obtener la info con lo que ha sido creado (email,id)
    const verifyToken = (token) => {
     // verificamos si traemos el token por params , para poder lanzar un error si no es asi 

     if (!token) {
        throw new Error("Sin token");
     }
      }
     return jwt.verify(token, process.env.JWT_SECRET);

     //! exportamos 

     module.exports = {
        genarateToken,
        verifyToken,
     };

};