//! traemos mongoose

const mongoose = require("mongoose")


//*creamos una variable que ecute esquemas con un procedimiento almacenado 

const Schema1 = mongoose.Schema;

//* creamos el modelo de datos que lanzara la constante de arriba 
/**tenemos que poner a cada clave el tipo de dato
 * definimos otras propiedades que limitan la informacion que se puede incluir en esa clase 
 * si es obligatoria , longuitud maxima y minima..
 */

const CharacterSchema = new Schema1 (
   {
      name:{type:String, required:false, unique:false},
      gender: {
         type:String,
         enum:["hombre", "mujer", "otro"],
         required:false,
      },
      image: [{type:mongoose.Schema.Types.ObjectId,ref:"Movie"}],
   }
)
const MovieSchema = new mongoose.Schema (

     {
        name: { type:String, required: true, unique: true },
        year: {type: Number, require: true}, 
        characters :[{type:mongoose.Schema.Types.ObjectId, ref:"characters"}],
     },
     {
        timestamps:true,
     }
);

const Movies = mongoose.model ("Movies", MovieSchema);

module.exports = Movies;