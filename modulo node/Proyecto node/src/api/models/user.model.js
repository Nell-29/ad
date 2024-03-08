const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const validator = require("validator");

const UserSchema = mongoose.Schema;

//! ----------- schema datos

const SchemaUser = new UserSchema(
  {
    name: {type: String, unique:true, trim: true,},
    Sexo: { type: String,
      enum: ["Hombre", "Mujer", "Otro"],
      default: "Otro",
    },
    image: { type: String, required: false },
    fecha: {type: Date},
    Lugar: {type: String},
    Rol: {type: String, 
      enum: ["Admin", "User", "teacher"],
      default: "User",
    },
    email: {
      type: String,

      trim: true, 
      unique: true,
      validate: [validator.isEmail, "Email no válido"],
    },
    password: {type: String,

      trim: true,
      validate: [validator.isStrongPassword,"Contraseña no válida. Debe incluir Mínimo 8 Caracteres, Mínimo 1 Mayuscula, Mínimo 1 Minúscula, Mínimo 1 Número, Mínimo 1 Caracter Especial."], // { minCaracteres: 8, minMayusculas: 1, minMinuscula: 1, minNumeros: 1, minCaracteresEspeciales: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
    },
    code: {
      type: Number,
      required: true,
    },
        check: {
      type: Boolean,
      default: false,
    },
    
    User: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: "teacher" }],
    Salas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Salas" }],
    Class: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],


  },
 
  {
    timestamps: true,
  }
);

  //! hacemos un preguardado donde se va a encriptar la contraseña
  
  SchemaUser.pre("save", async function (next) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (error) {
      next("Error encriptando la contraseña", error);
    }
  });
  
  // ! ---------- creamos el modelo en base al Schema
  
  const User = mongoose.model("User", SchemaUser);

  module.exports = User;