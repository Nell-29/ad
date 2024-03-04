//! importaciones

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

//! conectamos con nuestra base de datos

const connect = async () => {
    try {
        
        const db = await mongoose.connect(MONGO_URI);

        const { name,host } = db.connection;
        console.log(`conectados con la db 😊 cn el nombre:${name} en el host:${host}`);
    } catch (error) {
        console.log("hay un error en la conexion 😒,",error);
    }
};

module.exports = {connect};