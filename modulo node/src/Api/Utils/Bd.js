//! requerido dotenv
const dotenv = require("dotenv");
dotenv.config();//lo ejecutamos

//* requerimos mongoose
const mongoose = require("mongoose");

//? traemos la mongo_uri de .env
const MONGO_URI = process.env.MONGO_URI;

//! funcion que conecta con nuestra base de datos 

const connect = async () => {
    try { // conectamos con la base de datos
        const db = await mongoose.connect(MONGO_URI);
        // hacemos destruturing de nombre y host de nuestra base de datos, entrando en la constante
        const {name, host} = db.connection;

        console.log (`conectados ala db ✌️ con el nombre:${name} en el host ${host}`);

    } catch (error) {
        console.log("Hay en un error en la conexion ❌,",error);
    }
};

module.exports = {connect};
