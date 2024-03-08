const { upload } = require("../middleware/file.middleware");

//! controladores

const { createSalas,
     createSal, 
     getAllSalas,
     getByNameSalas, 
     UpdateSalas,
     toggleClass, 
     deleteSalas } = require("../controllers/salas.controller");

const express = require("express");
const SalasRouter = express.Router();

//! rutas 

SalasRouter.post("/create",createSalas);
SalasRouter.post("/create",upload.single("image"),createSal);
SalasRouter.get("/getAll",getAllSalas);
SalasRouter.get("/getByName/:name",getByNameSalas);
SalasRouter.patch("/update/:id",UpdateSalas);
SalasRouter.patch("/toggleclass/:id",toggleClass);
SalasRouter.delete("/delete/:id",deleteSalas);

//! exportar
module.exports = SalasRouter;