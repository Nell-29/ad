const mongoose = require("mongoose");

const classSchema = mongoose.Schema;

const SchemaClass = new classSchema(
    {
      name: { type: String, immutable: true },
      hora: { type: Number,  immutable: true},
      dia : {
        type: String,
        enum: ["lunes", "martes", " miercoles", "jueves", "viernes", "otro"],
        default: "otro",
      required: false,
      immutable: true
    },
    salas: {
      type: String,
      enum: ["sala A", "sala B", " sala C", "otra"],
      default: "otra",
      required: false,
  },
  clase: {
    type: String,
    enum: ["yoga", "pilates", " taichi", "boxeo", "ciclo","karate", "crossfit", "bodyjum","otra"],
    default: "otra",
    required: false,
    immutable: true
},
      teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: "teacher" }],
      user: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
      
    },
    {
      timestamps: true,
    }
  );
  
  const Class = mongoose.model("Class",SchemaClass);

  module.exports = Class;
  