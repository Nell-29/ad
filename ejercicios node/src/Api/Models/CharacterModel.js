// traemos moongoose 

const moongoose = require("mongoose");
const { schema } = require("../../../../Teoria/Servidor-ApiRest/7-ModeloDatos-Cloudinary/src/api/models/Character.model");

// nos traemos de moongose los esquemas de datos 
const Schema = moongoose.Schema;

// creamos el modelo de datos 
//* tenemos que poner a cada clave el tipo de dato 
//* definimos otras propiedades que limitan la informacion que se pueden incluir esa clase
//* si es obligatoria, ongitud maxima, minima..

const CharacterSchema = new Schema (
    {
        name:{ type:String, required: false, unique:false},
        gender:{
            type: String,
            enum: ["hombre", "mujer", "otro"],
            require:false,
        },
        image:{type:String, required:false },
        //array de object id que hace referencia a mi modelo movie 
        movies: [{type:moongoose.Schema.Types.ObjectId,ref:"movie"}],
    },
    // Para que sala la feca de la creacion
{
    timestamps:true,
}
);

//* con la definicion de datos vamos y su esquema vamos a definir nuestro modelo character 
const character = moongoose.model("character",CharacterSchema);

// exportamos el modulo 

module.exports = character;
