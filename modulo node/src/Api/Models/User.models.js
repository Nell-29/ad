//! traemos mongoose 

const mongoose= require("mongoose");

//! importamos las librerias 

const bcrypt = require("bcrypt");
const validator = require("validator");
 
//! Schema datos

const UserSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
            validate:[validator.isEmail, "Email no valido"],
        },
        name:{
            type:String,
            required:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
            trim:true,
            validate:[validator.isStrongPassword],
        },
        gender:{
            type:String,
            enum:["hombre","mujer","otro"],
            required:true,
        },
        rol:{
            type:String,
            enum:["admmin","user","superAdmin"],
            default:"user",
        },
        confirmationCode:{
            type:Number,
            required:true,
        },
        check:{
            type:Boolean,
            default:false,
        },
        Image:{
            type:String,
        },

        rol: {
            type:String,
            enum:["admmin","user","superAdmin"],
            default:"user",
        }
    },

    {
        timestamps: true,
    }
);

//! hacemos un preguardado donde se va encriptar la contraseña 

UserSchema.pre("save",async function(next){
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error){
        next("error encriptado la contraseña", error)
    };
});

//! creamos el modeloen base al schema

const User= mongoose.model("User",UserSchema);

//!exportamos 

module.exports = User;
