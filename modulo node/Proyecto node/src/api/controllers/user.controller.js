//! importaciones

const bcrypt = require ("bcrypt");
const dotenv = require ("dotenv");
dotenv.config();
const nodemailer = require ("nodemailer");
const validator = require("validator");

const User = require("../models/user.model");
const Salas = require("../models/salas.model");
const Class = require("../models/clases.model");

const { deleteImgCloudinary } = require("../middleware/file.middleware");
const { generateToken } = require("../utils/token");


//! funciones del utils

const enumOK = require("../utils/enum.G");
const randomCode = require("../utils/randomCode");
const randomPassword = require("../utils/randomPass");


//?++++++++++++++++++++++++++++++++++++
//! -------- register largo -----------
//?++++++++++++++++++++++++++++++++++++

const registerLong = async (req, res, next) => {

     // vemos si hay imagen en la solicitud
    const catchImg = req.file?.path;

    try {
     // indexes   
    await User.syncIndexes();

 // guardamos el código de confirmacion random en una variable
    let code= randomCode();

// destructuring del name y email del req.body
    const { email, name } = req.body;

     // Buscamos en la BD si hay algun usuario ya creado con ese email o ese nombre -->

    const usuarioExistent = await User.findOne(
        {
            email: req.body.email,
        },
        {
            name: req.body.name,
        }
        );

        // sino existe el usuario procedemos a crearlo
        if (!usuarioExistent) {



        const nuevoUsuario = new User({...req.body, code});
// verificamos si hay imagen en la solicitud, y sino hay le ponemos una imagen por defecto

        if(req.file){
            nuevoUsuario.image = req.file.path;
        }else {
            // Le ponemos la imagen por defecto
            nuevoUsuario.image = 
            "https://res.cloudinary.com/dxvasvakp/image/upload/v1707124366/5165bbc3564b4296c70371b75c9774b0_dtwnux.jpg";
        }

         // Tenemos creado el user con los datos, ahora debemos guardarlo
         try {
            const usuarioSave = await nuevoUsuario.save();
            
        // Comprobamos que este usuario se ha guardado y enviamos el código
            if (usuarioSave) {
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
                    text:`su codigo de confimacion es ${ code }, gracias por su confianza`,
                 };
              
                 // enviamos el email
                 transporter.sendMail(mailOptions,(error,info) => {
                    if (error) { 
                        return res
                        .status(409)
                        .json({ error:"correo no enviado", message: error});
                        
                    } else {
                        return res.status(200).json({ user: usuarioSave, code });
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

/*const registerRed = async (req, res, next) => {
    let catchImg = req.file?.path;
    try {

        // indexes
        await User.syncIndexes();

        // guardamos el codigo de confirmación
        let codex = randomCode();

        // buscamos si hay algun user con el email o el name
        const usuarioExistent = await User.findOne(
            { email: req.body.email },
            { name: req.body.name }
        );
         // Comprobamos que este user no existe
        if (!usuarioExistent) {
            // vemos si hay imagen en la solicitud
            const nuevoUser = new User ({...req.body, codex });
            if(req.file) {
                nuevoUser.image = req.file.path;
            } else {
                // Le ponemos una imagen por defecto
            nuevoUser.image = 
            "https://res.cloudinary.com/dxvasvakp/image/upload/v1707124366/5165bbc3564b4296c70371b75c9774b0_dtwnux.jpg";
        }
        try {
          // guardamos al user con esos datos    
            const usuarioSave = await nuevoUser.save();
        // si el user se ha creado hacemos el redirect
            if (usuarioSave) {
                return res.redirect(
                    307,
                    `http://localhost:8081/api/v1/user/register/senMail/${usuarioSave._id}`
                );
            } else {
                // Error no se ha guardado correcto
                req.file && deleteImgCloudinary(catchImg);
                return res.status(404).json({
                    error: "el usuario no se a guardado",
                    message: "el usuario no se ha guardado",
                });  
            }
            
        } catch (error) {
          // error al guardar el user
            req.file && deleteImgCloudinary(catchImg);
          return res
            .status(409)
            .json({ error: "El usuario no se ha guardado", message: error.message });
      
        }
        } else {
            // Error porque ya existe este usuario
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
         // Buscamos al user por su id de los params
    // para buscar el email y el codigo de confirmacion

        const {id} = req.params;

        // Buscamos al user
        const usuarioDB = await User.findById(id);

        // llamamos a las variables de entorno
        const emailENV = process.env.EMAIL;
        const passwordENV = process.env.PASSWORD;

        // creamos el transport
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                user:emailENV,
                pass:passwordENV,
            },
        });

        // creamos las opciones del mensaje
        const mailOptions = {
            from: emailENV,
            to: usuarioDB.email, // se lo enviamos al user registrado
            subject: "code",
            text: `su codigo de confirmacion es ${usuarioDB.code}, gracias por su confianza`,
        };

         // enviamos el email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res 
                .status(409)
                .json({ error:"correo no enviado", message: error});
                
            } else {
                return res 
                .status(200)
                .json({ User: usuarioDB, code: usuarioDB.code });

            }
        });
        
    } catch (error) {
        return res 
                .status(409)
                .json({ error:"error al enviar el email", message: error.message});
    }
}*/

//?+++++++++++++++++++++++++++++++++++++++++++
//! -------- resend code  -------------------
//?++++++++++++++++++++++++++++++++++++++++++

const resendCode = async (req, res, next) => {
    // llamamos a las variables de entorno
    try{
    
    const emailENV = process.env.EMAIL;
    const passwordENV = process.env.PASSWORD;
      const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            User: emailENV,
            pass: passwordENV,
        },
      });

     // Buscamos al usuario por el email que nos trae la solicitud
      const userSave = await User.findOne({ email: req.body.email });

      if(userSave) {
     // creamos las opciones del mensaje 
      const mailOptions = {
        from: emailENV,
        to: req.body.email,// se lo enviamos al user registrado
        subject: " Confirmation Code",
        text: `su codigo de confirmacion es ${userSave.code}, gracias por confiar en nosotros`,
      };

          // enviamos el email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(409)
            .json({error: "correo no enviado", message: error});
        } else {
            return res
            .status(200)
            .json({ussuario: userSave, resend: true }); 
        }
      });
} else {
    // Error no se encuentra al user por el email
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


//* revisar con el video apartir de aqui!!

//?+++++++++++++++++++++++++++++++++++++++++++
//! -------- check new user ------------------
//?+++++++++++++++++++++++++++++++++++++++++++

const checkUsuario = async (req, res, next) => {
    try {

        const { email, code } = req.body;

        const userExist = await User.findOne({ email });

        if(!userExist) {
            return res 
             .status(404)
             .json({ error :"user no encontado", message: "corrobora el correo"})
        } else {

            if (userExist.code === code){

                try {
                    
                    await userExist.updateOne({ check: true});

                    const usuarioAct = await User.findOne({ email });
                    
                    return res.status(200).json({
                        User: usuarioAct ,
                        testCheckUsuario: usuarioAct.check == true ? true : false,
                    });

                } catch (error) {
                    return res
                    .status(409)
                    .json({error: "error al actualizar", message: error.message})
                }
            } else {

                await User.findByIdAndDelete(userExist._id);

                if (
                    userExist.image !==
                    "https://res.cloudinary.com/dxvasvakp/image/upload/v1707124366/5165bbc3564b4296c70371b75c9774b0_dtwnux.jpg"
                )
                    {
                        deleteImgCloudinary(userExist.image);
                    }

                return res.status(409).json({
                    User: userExist,
                    check:false,
                    delete: (await User.findById(userExist._id))
                    ? "usuario no borrado"
                    : "usuario borrado",
                })
                
            }
        }
        
    } catch (error) {
        return res 
         .status(409)
         .json({ error: "error al comprobar usuario", message: error.message});
        
    };
};


//?+++++++++++++++++++++++++++++++++++++++++++
//! --------------- login ------------------
//?+++++++++++++++++++++++++++++++++++++++++++

const login = async (req, res, next) => {
try {
    

    const { email, password } = req.body;

    const usuarioDB = await User.findOne({ email });
    if(usuarioDB) {
        if(bcrypt.compareSync(password, usuarioDB.password)) {
            const token = generateToken(usuarioDB._id, email);
            return res.status(200).json({
                usuario: usuarioDB,
                token,
            });
        } else {
            return res.status(409).json({
                error: "contraseña incorrecta",
                message: "intentalo de nuevo",
            });
        };
    } else {
        return res
        .status(404)
        .json({ error: "usuario no encontrado",
         message: " usuario no registrado"});
    };
} catch (error) {

    return res
    .status(409)
    .json({ error: "error en el login", message: error.message});
    
  };
};

//?+++++++++++++++++++++++++++++++++++++++++++
//! --------------- Auto-login ---------------
//?+++++++++++++++++++++++++++++++++++++++++++

const autoLogin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const userDB = await User.findOne({ email });
        if(userDB) {
            if( password === userDB.password) {
                const token = generateToken(userDB._id, email);
                return res.status(200).json({
                    ussuario: userDB,
                    token,
                });
        } else {
            return res.status(409). json({
                error: "contraseña incorrecta",
                message: "intentalo otra vez",
            });
        }
    } else {
        return res
        .status(404)
        .json({error: "usuario no encontrado", message:"usuario no registrado"});
    }    
    } catch (error) {
        return res
        .status(409)
        .json({error: "error en el login", message: error.message});
    }
};


//?++++++++++++++++++++++++++++++++++++++++++++++++
//! --------------- toggle salas ------------------
//?+++++++++++++++++++++++++++++++++++++++++++++++++

const toggleSalas = async (req, res, next) => {

    try { 
        const { id } = req.params;
        const { Salas } = req.body;

        const userById = await User.findById(id);
        if( userById) {
            const arraySalas = Salas.split(",");

            Promise.all(
                arraySalas.map(async(Sala) =>{
                    if (userById.Salas.includes(Sala)) {
                       
                        try {
                            await User.findByIdAndUpdate(id,{
                                $pull:{ Salas: Sala},
                            });

                            try {
                                await Salas.findByIdAndUpdate(Sala,{
                                    $pull: { User: id },
                                });  
                            } 

                            catch (error) {
                                return res.status(409).json({
                                    error:"error al asignar sala al usuario",
                                    message: error.message,
                                });
                            }
                        } catch (error) {
                            return res.status(409).json({
                                error:"error al asignar el usuario a la sala",
                                message: error.message,
                            }); 
                        }
                        
                    } else{ 

                        try {
                            await User.findByIdAndUpdate(id,{
                                $push: { User: Salas},
                            });
                            try {
                                await Salas.findByIdAndUpdate(Salas,{
                                    $push: { User: id},
                            });
                         } catch (error) {
                            return res.status(409).json({
                                error:"error al enlazar la sala al usuario",
                                message:error.message,
                            });  
                            }
                        } catch (error) {
                            return res.status(409).json({
                                error:"error al enlazar el usuario a la sala",
                                message:error.message,
                            });
                        }
                    }
                })
            ).then(async () => {
                return res 
                 .status(200)
                 .json(await User.findById(id).populate("Salas"));
            });
            
        } else {
            return res .status(404).json("salas no encotnrada por el id, comprueba con otro id");
        }
        
    } catch (error) {
        return res 
        .status(409)
        .json({error:'error al actualizar el usuario'})
    }
};


//?++++++++++++++++++++++++++++++++++++++++++++++++
//! --------------- toggle clases ------------------
//?+++++++++++++++++++++++++++++++++++++++++++++++++

const toggleClass = async ( req, res, next) => {
    try {
        const {id } = req.params;
        const { Class } = req.body;


        const userById = await User.findById(id);
        if (userById) {
            const arrayClass = Class.split(",");
            
            Promise.all(
                arrayClass.map(async (clase) => {
                    if(userById.Class.includes(clase)) {
                    
                        try {
                        await User.findOneAndUpdate(id, {
                            $pull: {Class: clase}, 
                        });

                        try {
                            await Class.findByIdAndUpdate(clase,{
                                $pull: {User: id}, 
                            });
                        }
                            
                         catch (error) {
                            return res.status(409).json({
                                error:"error al asignar la clase",
                                message: error.message,
                            });
                        }
                     } catch (error) {
                            return res.status(409).json({
                                error:"error al asignar el usuario",
                                message: error.message,
                            });  
                        }
                    } else { 

                        try {
                            await User.findByIdAndUpdate(id,{
                                $push: {Class:clase},
                            });
                            try {
                                await Class.findByIdAndUpdate(clase,{
                                    $push: {User :id },
                                });
                            } catch (error) {
                                return res.status(409).json({
                                    error:"error al asignar el usuario",
                                    message: error.message,
                                });  
                            } 
                    } catch (error) {
                        return res.status(409).json({
                            error:"error al asignar la clase",
                            message: error.message,
                        });  
                    }
                }
                         
                })
            ).then(async () => {
                return res
                .status(200)
                .json(await User.findById(id).populate("Class"));
            });
        } else {
            return res.status(404).json("usuario no encontrado, prueba con otro id");
        }
       
    } catch (error) {
        return res
        .status(409)
        .json({ error: 'Error al actualizar el ususario. asegure de escribir bien los datos' , message: error.message });
    
    };
};

//?++++++++++++++++++++++++++++++++++++++++++++++++
//! --------------- forgot password-----------------
//?+++++++++++++++++++++++++++++++++++++++++++++++++

const forgotPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
  
      const usersDB = await User.findOne({ email });
  
      if (usersDB) {
        return res.redirect(
          307,
          `http://localhost:${process.env.PORT}/api/v1/user/forget-email/${usersDB._id}`
        );
      } else {
  
        return res
          .status(404)
          .json({ error: "usuario no encontrado", message: "chekea tu email" });
      }
    } catch (error) {
      return res
        .status(409)
        .json({ error: "error en el cambio de contraseña", message: error.message });
    }
  };

  //! CHANGE PASSWORD
//^ INTRODUCIENDO LA CONTRASEÑA ACTUAL Y LA NUEVA CONTRASEÑA POR EL BODY
//^ Y EL TOKEN , PORQUE ES AUTENTICADA
const changePassword = async (req, res, next) => {
    try {
  
      const { password, NewPassword } = req.body;
  
  
  
      const validate = validator.isStrongPassword(NewPassword);
  
      if (validate) {
  
        const { _id } = req.User;
  
        if (bcrypt.compareSync(password, req.User.password)) {
  
          const newPasswordHashed = bcrypt.hashSync(NewPassword, 10);
  
          try {
  
            await User.findByIdAndUpdate(_id, { password: newPasswordHashed });
  
            const userSave = await User.findById(_id);
  
            if (bcrypt.compareSync(NewPassword, userSave.password)) {
              return res.status(200).json({ User: userSave, testUpdate: true });
            } else {
    
              return res.status(409).json({ testUpdate: false });
            }
          } catch (error) {
            return res.status(409).json({
              error: "Error al actualizar al user",
              message: error.message,
            });
          }
        } else {
          return res.status(409).json({
            error: "contraseña incorrecta",
            message: "intente con otra contraseña",
          });
        }
      } else {
        return res.status(409).json({
          error: "La contraseña nueva es debil",
          message:
            "debe tener al menos 8 caracteres, 1 simbolo, 1 mayuscula, 1 minuscula y un numero",
        });
      }
    } catch (error) {
      return res.status(409).json({
        error: "por favor al cambiar la contraseña",
        message: error.message,
      });
    }
  };

//!importamos 

module.exports ={ 
     registerLong,
     resendCode, 
     checkUsuario, 
     login, 
     autoLogin, 
     toggleSalas,
     toggleClass,
     forgotPassword,
    changePassword };


