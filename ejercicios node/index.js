// *importaciones externas 

const dotenv = require("dotenv")
dotenv.config();

const express = require ("express");

// *traemos cloudinary para poder usarlo 

const {configCloudinary} = require("./src/Middelware/fielsMiddleware");
configCloudinary();

//? traemos la funcion de conexion a la bd y la ejecutamos -> archivo interno 

const {connect} = require("./src/utils/db");
//ejecutamos
connect();

//* treaemos las variables de entorno 

const PORT = process.env.PORT;

//* creamos el servidor web 

const app = express();

//*limitaciones 

app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({limit:"5mb", extended:false}));

//?rutas

const CharacterRouter = require("./src/Api/Routes/CharacterRouter");
app.use("/api/v1/characters",CharacterRouter);

//! cuando no encontremos la ruta - generamos un error

app.use("*",(req, res, next) =>{
    const error = new error ("route not found");
    error.status = 404;
    return next(error);
});

//! error cuando el servidor crashea 500 --> recojo el error 

app.use((error, req, res) => {
    return res 
    .status(error.status || 500)
    .json(error.massage || "error inesperado");
});
// revela la tecnologia con la que se esta realizando el back
app.disabled("x-powered-by");

//? escuchamos en el puerto el servidor 

app.listen(PORT,() => {
    console.log(`servidor escuchando en el puerto http://localhost:${PORT} `);
});