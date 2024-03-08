//! controladores

const { createClass,
     createClases,
      getAllClass, 
      getByIdClass,
       getByNameClass, 
       UpdateClass,
        deleteClass} = require("../controllers/clases.controller")
const {upload} = require("../middleware/file.middleware")
const express = require("express");
const ClassRouter = express.Router();

//! rutas

ClassRouter.post("/create",upload.single("image"),createClass);
ClassRouter.post("/create",createClases);
ClassRouter.get("/getAll",getAllClass);
ClassRouter.get("/getById/:id",getByIdClass);
ClassRouter.get("/getByName/:name",getByNameClass);
ClassRouter.patch("/update/:id",upload.single("image"),UpdateClass);
ClassRouter.delete("/delete/:id",deleteClass);


//! exportar
module.exports = ClassRouter;