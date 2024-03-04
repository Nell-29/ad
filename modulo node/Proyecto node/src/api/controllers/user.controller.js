//! importaciones

const bcrypt = require ("bcrypt");
const dotenv = require ("dotenv");
const nodemailer = require ("nodemailer");
const validator = require("validator");
dotenv.config();

const user =require ("../models/user.model");

const { deleteImgCloudinary } = require("../middleware/file.middleware");
const { generateToken } = require("../utils/token");


//! funciones del utils

const enumG = require("../utils/enum.G");
const randomCode = require("../utils/randomCode");
const randomPassword = require("../utils/randomPass");

//! modelos

const Class = require ("../models/clases.model");
const Salas = require ("../models/salas.model");
const teacher = require ("../models/teacher.model");

//?++++++++++++++++++++++++++++++++++++
//! -------- register largo -----------
//?++++++++++++++++++++++++++++++++++++

const registerLong = async (req, res, next) => {

     // vemos si hay imagen en la solicitud
    const catchImg = req.file?.path;

    try {
     // indexes   
    await user.syncIndexes();

 // guardamos el código de confirmacion random en una variable
    let confirmationCode = randomCode();

// destructuring del name y email del req.body
    const { email, name } = req.body;

     // Buscamos en la BD si hay algun usuario ya creado con ese email o ese nombre -->
    //** FINDONE metodo de mongoose para encontrar elementos coincidentes
    const userExist = await user.findOne(
        {
            email: req.body.email,
        },
        {
            name: req.body.name,
        }
        );

        // sino existe el usuario procedemos a crearlo
        if (!userExist) {

  //** LO CREAMOS */ --> con el código random y con lo que trae el req.body

        const newUser = new user({...req.body, confirmationCode});
// verificamos si hay imagen en la solicitud, y sino hay le ponemos una imagen por defecto

        if(req.file){
            newUser.image = req.file.path;
        }else {
            // Le ponemos la imagen por defecto
            newUser.image = 
            "https://res.cloudinary.com/dxvasvakp/image/upload/v1707124366/5165bbc3564b4296c70371b75c9774b0_dtwnux.jpg";
        }

         // Tenemos creado el user con los datos, ahora debemos guardarlo
         try {
            const userSave = await newUser.save();
            
        // Comprobamos que este usuario se ha guardado y enviamos el código
            if (userSave) {
              // Todo ---> ENVIAMOS EL CÓDIGO
             // llamamos a las variables de entorno

                 const emailENV = process.env.EMAIL;
                 const passwordENV = process.env.PASSWORD;

                  // creamos el transport
                 const transporter = nodemailer.createTransport({
                    service:"gmail",
                    auth: {
                        user: emailENV,
                        pass: passwordENV,
                    },
                });

                 // creamos las opciones del mensaje
                const mailOptions = {
                    from: emailENV,
                    to: email,// se lo enviamos al user registrado
                    subject: "Confirmation code",
                    text:`su codigo de confimacion es ${confirmationCode}, gracias por su confianza`,
                 };
              
                 // enviamos el email
                 transporter.sendMail(mailOptions,(error,info) => {
                    if (error) { 
                        return res
                        .status(409)
                        .json({ error:"correo no enviado", message: error});
                        
                    } else {
                        return res.status(200).json({ user: userSave, confirmationCode});
                    }
                });
            } else {
                // lanzamos un error diciendo que no se guardó el usuario
                req.file && deleteImgCloudinary(catchImg);
                return res.status(409).json("error al guardar el usuario",);
            }
         } catch (error) {
            req.file && deleteImgCloudinary(catchImg);
            return res.status(409)
            .json({error: "Problema al guardar el usuario",message: error.message,
          });
         }
         } else {

            req.file && deleteImgCloudinary(catchImg);
            return res
            .status(409)
            .json("el usuario ya existe");
         }
    } catch (error) {
        req.file && deleteImgCloudinary(catchImg);
        return res
        .status(409)
        .json({error:"error en el registro", message: error.message});
           
    }
};

//?+++++++++++++++++++++++++++++++++++++++++++
//! -------- register con redirect -----------
//?++++++++++++++++++++++++++++++++++++++++++

const registerRed = async (req, res, next) => {
    let catchImg = req.file?.path;
    try {

        await user.syncIndexes();

        let confirmationCode = randomCode();

        const userExist = await user.findOne(
            { email: req.body.email },
            { name: req.body.name }
        );
        if (!userExist) {

            const newUser = new user ({...req.body, confirmationCode });

            if(req.file) {
                newUser.image = req.file.path;
            } else {
            newUser.image = 
            "https://res.cloudinary.com/dxvasvakp/image/upload/v1707124366/5165bbc3564b4296c70371b75c9774b0_dtwnux.jpg";

        }
        try {

            const userSave = await newUser.save();

            if (userSave) {
                return res.redirect(
                    307,
                    `http://localhost:8081/api/v1/user/register/senMail/${userSave._id}`
                );

            } else {

                req.file && deleteImgCloudinary(catchImg);
                return res.status(404).json({
                    error: "el user no se a guardado",
                    message: "el user no se ha guardado",
                });  
            }
            
        } catch (error) {

            req.file && deleteImgCloudinary(catchImg);
          return res
          .status(409)
          .json({ error: "El user no se ha guardado", message: error.message });
      
        }
        } else {
            req.file && deleteImgCloudinary(catchImg);
            return res.status(409).json({
                error: "el usuario ya existe",
                message: "el usuario ya existe",
            });
        }
        
    } catch (error) {
      req.file && deleteImgCloudinary(catchImg);
      return res
      .status(409)
      .json({error:"error en el registro", message: error.message});
        
    }
};

//?+++++++++++++++++++++++++++++++++++++++++++
//! -------- send code confirmation  ---------
//?+++++++++++++++++++++++++++++++++++++++++++

const sendCode = async (req, res, next) => {
    try {

        const {id} = req.params;

        const userDB = await user.findById(id);

        const emailENV = process.env.EMAIL;
        const passwordENV = process.env.PASSWORD;

        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                user:emailENV,
                pass:passwordENV,
            },
        });

        const mailOptions = {
            from: emailENV,
            to: userDB.email,
            subject: "Confirmation Code",
            text: `su codigo de confirmacion es ${userDB.confirmationCode}, gracias por su confianza`,
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res 
                .status(409)
                .json({ error:"correo no enviado", message: error});
                
            } else {
                return res 
                .status(200)
                .json({ user:userDB,confirmationCode: userDB.confirmationCode});

            }
        });
        
    } catch (error) {
        return res 
                .status(409)
                .json({ error:"error al enviar el email", message: error.message});
    }
}




//?+++++++++++++++++++++++++++++++++++++++++++
//! -------- resend code  -------------------
//?++++++++++++++++++++++++++++++++++++++++++

const resendCode = async (req, res, next) => {
    
    try{
    
    const emailENV = process.env.EMAIL;
    const passwordENV = process.env.PASSWORD;

      const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: emailENV,
            pass: passwordENV,
        },
      });

      const userSave = await user.findOne({ email: req.body.email });

      if(userSave) {

      const mailOptions = {
        from: emailENV,
        to: req.body.email,
        subject: " Confirmation Code",
        text: `su codigo de confirmacion es ${userSave.confirmationCode}, gracias por confiar en nosotros`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(409)
            .json({error: "correo no enviado", message: error});
        } else {
            return res
            .status(200)
            .json({user: userSave, resend: true }); 
        }
      });
} else {
    return res
    .status(404)
    .json({ error: "correo no enviado", message: "introduzca otro email"});
}
    } catch(error){
        return res
    .status(409)
    .json({ error: "error al enviar el codigo", message: error.message});
    }
};



//!importamos 

module.exports ={ registerLong, registerRed, sendCode, resendCode };


