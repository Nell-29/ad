//! importamos 

const { Error } = require("mongoose");
const user = require ("../models/user.model");
const { verifyToken } = require ("../utils/token");

const dotenv = require("dotenv");
dotenv.config();

const isAuth = async ( req, res, next) => {

    const token = req.headers.authorization?.replace("bearer","");
    console.log("CABECERAS", req.headers.authorization);
    if (!token) {
        return next(new Error("no autorizado"));}

        try {

            const decoded = verifyToken(token, process.env.JWT_SECRET);
            console.log("decoded",decoded);

            req.user =  await user.findById(decoded.id);
           
            next()
        } catch (error) {
            return res
            .status(409)
            .json({error :"problemas con el token", message: error.message});
        }

};

const isAuthAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.replace("bearer", "");
    if(!token){
        return next(new Error("no autorizado"));
    }
    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        
        console.log("decoded",decoded);

        req.user = await User.findById(decoded.id);

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