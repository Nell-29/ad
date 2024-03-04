//!importaciones
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

//! traemos la funcion de sembrado
const createSeed = require("./src/Api/Utils/Seeds/Movies.seed")
createSeed();

//! traemos y ejecutamos la conexion ala base de datos
 const {connect} = require("./src/Api/Utils/Bd");
 connect(); 

//! configuramos cloudinary
const{configCloudinary} = require("./src/Api/Middleware/file.middleware");
configCloudinary();

//! Creamos el servidor 

const app = express();

//! damos las cors al servidor

const cors = require("cors")
app.use(cors());

//! limitaciones del archivo

app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({limit:"5mb",extended:false}));

//!---- rutas
/**genramos la url y le decimos que ejecute la accion que establecimos
 * en el archivo character.routes.js const CharacterRouter=express.Router();
 * en el fichero de rutas le hemos puesto las terminaciones. estas rutas de po si no llevan a ningun sitio
 * ademas van precedidas del local host http://localhost:8081/
 */
const CharacterRouter = require("./src/Api/Routes/Character.Routes");

app.use("/api/v1/character", CharacterRouter);

const MovieRoutes = require("./src/Api/Routes/Movies.routes")
app.use("/api/v1/movie", MovieRoutes);

//! generamos el error cuando no se encuentre la ruta 

app.use("*",(req, res, next) => {
    const error = new Error("Ruta no encontrada");
    error.status = 404;
    return next(error);
});

//! cogemos el error cuando crashea el servidor 

app.use((error, req, res)=> {
    return res 
    .status(error.status || 500)
    .json(error.massage || "Error inesperado");
});

app.disable("x-powered-by");

//! escuchamos en el puerto del servidor web

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto http://localhost:${PORT}`);
});




