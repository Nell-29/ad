const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const validator = require("validator");

//! ----------- schema datos

const UserSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        trim: true, // quitar espacios
        unique: true,
        validate: [validator.isEmail, "Email no válido"],
      },
      name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
        validate: [validator.isStrongPassword], // { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
      },
      gender: {
        type: String,
        enum: ["hombre", "mujer", "otro"],
        required: true,
      },
      rol: {
        type: String,
        enum: ["admin", "user", "superAdmin"],
        default: "user",
      },
      confirmationCode: {
        type: Number,
        required: true,
      },
      check: {
        type: Boolean,
        default: false,
      },
      image: {
        type: String,
      },
  
      // Id de salas
      SalasFav: [{ type: mongoose.Schema.Types.ObjectId, ref: "salas" }],
  
      // Id de class
      ClassFav: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
  
      // comentarios 
      teacherFav: [{ type: mongoose.Schema.Types.ObjectId, ref: "teacher" }],
  
      // Id de los users
      followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  
      // Id de sers seguidos por el user
      followed: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  
    },
    {
      timestamps: true,
    }
  );
  
  //! hacemos un preguardado donde se va a encriptar la contraseña
  
  UserSchema.pre("save", async function (next) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (error) {
      next("Error encriptando la contraseña", error);
    }
  });
  
  // ! ---------- creamos el modelo en base al Schema
  
  const user = mongoose.model("user", UserSchema);

  module.exports = user;