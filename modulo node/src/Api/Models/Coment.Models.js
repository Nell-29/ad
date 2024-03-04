//! requiero mongoose
const mongoose= require("mongoose");

const Schema = mongoose.Schema;

//! traemos el schema de mongoose

//? creo el esquema de los datos

//! todo el comentario solo puede ir dirigido a un registro ya sea character,movies o user

const CommentSchema = new Schema(
    {
        //user que crea el comentario
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        content:{type:String, required:true},
        //array de ids de user que les gusta el comentatio
        likes:[{type:mongoose.Schema.Types.ObjectId, ref: "User"}],
        // id del character al que va dirigido el comentario
        recipientCharacter:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    },
    {timestamps:true}
);

//! creamos el modelo con la definicion de datos y su esquema 

const ModelComment= mongoose.model("ModelComment",CommentSchema);


 module.exports = ModelComment;

