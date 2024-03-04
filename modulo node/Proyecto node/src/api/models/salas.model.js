const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");

const validator = require("validator");

const SalasSchema = new Schema({
    name:{ type: String, required: false, unique: false },
    class: {
        type: String,
        enum: ["yoga", "pilates", " taichi", "boxeo", "kararte", "ciclo", "crossfit", "bodypump"],
        required: false,
    },
    class: {
        type: String,
        enum: ["sala A", "sala B", " sala C"],
        required: false,},
    Image: { type: String, required: false },
    //array que hace refencia a mi modelo movie 
    
   },
  // para que salga la creaccion
    {
     timestamps: true,
    }
);

const Salas = mongoose.model("salas",SalasSchema);

module.exports = Salas;
