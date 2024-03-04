const mongoose = require("mongoose");

const Schema1 = new mongoose.Schema(
    {
      name: { type: String },
      hora: { type: Number },
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
      dia : {
        type: String,
        enum: ["lunes", "martes", " miercoles", "jueves", "viernes"],
        required: false,
    },
    salas: {
      type: String,
      enum: ["sala A", "sala B", " sala C"],
      required: false,
  },
      teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: "teacher" }],
      user: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    },
    {
      timestamps: true,
    }
  );
  
  const Class = mongoose.model("Class",Schema1);

  module.exports = Class;
  