//!importaciones 

const { upload } = require("../middleware/file.middleware");
const { isAuth, isAuthAdmin } = require("../middleware/auth.middelware");


const { registerLong, registerRed, sendCode, resendCode } = require("../controllers/user.controller");
const UserRouter = require("express").Router();

//!rutas 

UserRouter.post("/registerLong",upload.single("image"), registerLong);
UserRouter.post("/registerRed",upload.single("image"), registerRed);
UserRouter.post("/resend", resendCode);


//! rutas autenticadas

UserRouter.post("/register/sendMail/:id", sendCode)

//! exportamos 
module.exports = UserRouter;
