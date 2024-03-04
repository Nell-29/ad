//! controladores

const { createTeacher, 
    createTeaches,
     getAllTeacher,
      getByIdTeacher,
       getByNameTeacher,
        UpdateTeacher,
        UpdateSalas,
        deleteTeacher } = require("../controllers/techer.controller");
const { upload } = require("../middleware/file.middleware");
const teacherRouter =require("express").Router();

//! rutas 

teacherRouter.post("/create",upload.single("image"), createTeacher);
teacherRouter.post("/create",upload.single("image"), createTeaches);
teacherRouter.get("/getAll", getAllTeacher);
teacherRouter.get("/getById/:id", getByIdTeacher);
teacherRouter.get("/getByName/:name", getByNameTeacher);
teacherRouter.patch("/update/:id",upload.single("image"), UpdateTeacher);
teacherRouter.patch("/update/:id",upload.single("image"), UpdateSalas);
teacherRouter.delete("/delete/:id", deleteTeacher);

//! exportar

module.exports = teacherRouter;