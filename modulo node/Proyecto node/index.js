//! importaciones

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const {connect} = require("./src/api/utils/db");
connect();

const { configCloudinary } = require("./src/api/middleware/file.middleware");
configCloudinary()

const app = express();

const cors = require("cors");
app.use(cors());

//!limitaciones

app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({limit:"5mb",extended:false}));

//?++++++++++++++++++++++++++++++++++++
//!----------rutas-------------
//?++++++++++++++++++++++++++++++++++++++++++

const SalasRouter = require("./src/api/routes/salas.routes");
app.use("/api/v1/salas",SalasRouter);

const ClassRouter = require("./src/api/routes/class.routes");
app.use("/api/v1/class",ClassRouter);

const teacherRouter = require("./src/api/routes/teacher.routes");
app.use("/api/v1/teacher",teacherRouter);

const UserRouter = require("./src/api/routes/user.routes");
app.use("/api/v1/user", UserRouter);

//! funcion que captura los errores

app.use("*", (req, res, next) => {
    const error = new Error("Ruta no encontrada");
    error.status = 404;
    return next(error);
  });
  
  //! ----------------- capturamos el error cuando el server crashea
  
  app.use((error, req, res) => {
    return res
      .status(error.status || 500)
      .json(error.message || "Error inesperado");
  });
  
  app.disable("x-powered-by");
  
  //! ------------- traemos variable de entorno
  
  const PORT = process.env.PORT;
  
  //! ---------------- escuchamos en el puerto el servidor web
  
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
  });
  
