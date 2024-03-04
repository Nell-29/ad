//! traemos mongoose

const mongoose = require("mongoose");

//! creamos una variable que ejecutara esquemas con un procedimiento almacenado

const Schema = mongoose.Schema;
//const bcrypt = require("bcrypt");
//const validator = require("validator");

//! creamos el modelo que lazara los datos 

const CharacterSchema = new Schema({
    name:{ type: String, required: false, unique: false },
    gender: {
        type: String,
        enum: ["hombre", "mujer", "otro"],
        required: false,
    },
    Image: { type: String, required: false },
    //array que hace refencia a mi modelo movie 
    movies:[{type:mongoose.Schema.Types.ObjectId, ref:"Movie"}],
   },
  // para que salga la creaccion
    {
     timestamps: true,
    }
);

const Character = mongoose.model("Character",CharacterSchema);

// exportamos el modulo

module.exports = Character;