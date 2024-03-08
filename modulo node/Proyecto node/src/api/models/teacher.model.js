const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema;

const SchemaTeacher = new teacherSchema(
    {
      name: { type: String, required: false, unique: false },
      gender: {
        type: String,
        enum: ["hombre", "mujer", "otro"],
        default: "otro",
        required: false,
        immutable: true
      },
      image: { type: String, required: false },
     
      Class: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
      User: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      Salas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Salas" }],
    },
    
    {
      timestamps: true,
    }
  );
  
  //!--- con la definición de datos 
  
  const teacher = mongoose.model("teacher",SchemaTeacher);
  
  
  module.exports = teacher;