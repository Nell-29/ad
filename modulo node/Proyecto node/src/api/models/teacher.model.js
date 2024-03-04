const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teacherSchema = new Schema(
    {
      name: { type: String, required: false, unique: false },
      gender: {
        type: String,
        enum: ["hombre", "mujer", "otro"],
        required: false,
      },
      image: { type: String, required: false },
     
      class: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
      salas: [{ type: mongoose.Schema.Types.ObjectId, ref: "salas" }],
    },
    
    {
      timestamps: true,
    }
  );
  
  //!--- con la definición de datos 
  
  const teacher = mongoose.model("teacher",teacherSchema);
  
  
  module.exports = teacher;