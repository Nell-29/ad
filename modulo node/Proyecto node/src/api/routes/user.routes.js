//!importaciones 

const { upload } = require("../middleware/file.middleware");
const {isAuth, isAuthAdmin } = require("../middleware/auth.middelware");

const {
     registerLong,
     registerRed,
     sendCode, 
     resendCode,
     checkUsuario, 
     login,
     autoLogin, 
     toggleSalas , 
     toggleClass,
     forgotPassword, changePassword} = require("../controllers/user.controller");
const User = require("../models/user.model");


     const UserRouter = require("express").Router();

//!rutas 

UserRouter.post("/registerLong",upload.single("image"), registerLong);
UserRouter.post("/registerRed",upload.single("image"), registerRed);

UserRouter.post("/register/senMail/:id",sendCode);
UserRouter.post("/resend", resendCode);
UserRouter.post("/check", checkUsuario);

UserRouter.post("/login", login);
UserRouter.post("/AutoLogin", autoLogin);
UserRouter.patch("/toggle-salas/:id",[isAuth], toggleSalas);
UserRouter.patch("/toggle-class/:id",[isAuthAdmin], toggleClass);
UserRouter.patch("/forget-email", forgotPassword);
UserRouter.patch("/changePassword",[isAuth], changePassword);




//! rutas autenticadas


//UserRouter.post("/register/sendMail/:id", sendCode);


//! exportamos 
module.exports = UserRouter;
