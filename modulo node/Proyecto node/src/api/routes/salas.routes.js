const { upload } = require("../middleware/file.middleware");

//! controladores

const { createSalas,
     createSal, 
     getAllSalas,
     getByNameSalas, 
     UpdateSalas,
     UpdateClass, 
     deleteSalas } = require("../controllers/salas.controller");

const express = require("express");
const SalasRouter = express.Router();

//! rutas 

SalasRouter.post("/create",upload.single("image"),createSalas);
SalasRouter.post("/create",upload.single("image"),createSal);
SalasRouter.get("/getAll",getAllSalas);
SalasRouter.get("/getByName/:name",getByNameSalas);
SalasRouter.patch("/update/:id",upload.single("image"),UpdateSalas);
SalasRouter.patch("/update/:id",upload.single("image"),UpdateClass);
SalasRouter.delete("/delete/:id",deleteSalas);

//! exportar
module.exports = SalasRouter;