//! importamos 

const User = require ("../models/user.model");
const { verifyToken } = require ("../utils/token");

const dotenv = require("dotenv");
dotenv.config();

const isAuth = async ( req, res, next) => {

    const token = req.headers.authorization?.replace("Bearer","");
    
    if (!token) {
        return next(new Error("no autorizado"));
    }
        try {
            const decoded = verifyToken(token, process.env.JWT_SECRET);

            req.User =  await User.findById(decoded.id);
           
            next()
        } catch (error) {
            return res
            .status(409)
            .json({error :"problemas con el token", message: error.message});
        }

};

const isAuthAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer", "");
    if(!token){
        return next(new Error("no autorizado"));
    }
    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        
        req.User = await User.findById(decoded.id);

        if(req.user.rol !== "admin") {
            return next(new Error("no autorizado, no eres administrador"));
        }else{
            next();
        }
        
    } catch (error) {
        return res
          .status(409)
          .json({ error: "problemas con el token", message:error.message });
        
    }
};

module.exports = { isAuth, isAuthAdmin };