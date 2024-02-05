// requerimos dotenv y moongoose 

const dotenv = require("dotenv")

const moongoose = require("mongoose")

dotenv.config();

// nos traemos la mongo_uri de . env 

const MONGO_URI = process.env.MONGO_URI;

// creamos la funcion que conecta con nuestra base de datos 

const connect = async () => {
    //try:intenta hacer algo .. y sino lo capturas en catch 
    try{
        //conectamos con nuestra base de datos 
        const db = await moongoose.connect(MONGO_URI,{
             //parsea la url de mongo
             useNewUrlParse:true,
             // convertir los caracteres , especiales 
             useUnifiedTopology:true,
       
            });

            // hacemos destructuring de nombre y host de nuestra base de datos 

            const {name, host} = db.connection; 

            console.log(`conectados a la bd con el nombre: ${name} en el host: ${host}`
            );
   }catch (error){
    console.log("hay un error de la conexion ", error);
   }
};

module.exports= {connect};