//!importamos
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const validator = require("validator");

//! modelos
const { deleteImgCloudinary } = require("../middleware/file.middleware");
const Class = require("../models/clases.model");
const User = require("../models/user.model");
const Salas = require("../models/salas.model");
const teacher = require("../models/teacher.model");
const{ enumOK, enumDays, enumSalas,enumClass } = require("../utils/enum.G");


//?++++++++++++++++++++++++++++++++
//! -----------create ------------
//?+++++++++++++++++++++++++++++++

const createClass = async (req, res, next) => {
    let catchImg = req.file?.path;
    try {
      await Class.syncIndexes();

      const newClass = new Class(req.body);
    
      if (catchImg) {
     newClass.image = catchImg;
      } else {
        newClass.image = 
        "https://res.cloudinary.com/dxvasvakp/image/upload/v1709224011/home-story_goailt.jpg";
    
      }
      const saveClass = await newClass.save();
      if (saveClass) {
        return res.status(200).json(saveClass);
      } else{
        return res.status(409).json("No se ha podido crear la clase");
      }
    } catch (error) {
        next(error)
      return res.status(409).json({
        error:"Error en la creación de nueva clase",
        message: error.message,
      });
      }
    };

    //?++++++++++++++++++++++++++++++++
    //! -----------create ------------
    //?+++++++++++++++++++++++++++++++
    
    const createClases = async (req, res, next) => {
        try {
          await Class.syncIndexes();
      
          // Creamos nueva instancia de class
          const newClass = new Class(req.body);
      
          const saveClass = await newClass.save();
          if (saveClass) {
            return res.status(200).json(saveClass);
          } else{
            return res
            .status(404)
            .json("No se ha podido crear la clase");
          }
        } catch (error) {
          return res.status(409).json("Error en la creación de nueva clase");
          }
        };
      


//?+++++++++++++++++++++++++++++++++++++++++++
//! --------------get all -------------------
//?+++++++++++++++++++++++++++++++++++++++++++
  

const getAllClass = async (req, res, next) => {
  try {
    
    const allClass = await Class.find();
    // Find nos devuelve un array con todos los elementos coincidentes

    if (allClass.length > 0) {
      // Si hay registros lanzamos una respuesta correcta
      return res.status(200).json(allClass);
    } else {
      // si no hay registros lanzamos una respuesta 404
      return res.status(404).json("No se han encontrado la clase");
    }
  } catch (error) {
    // capturtamos el error
    return res
      .status(409)
      .json({ error: "Error al buscar la clase", message: error.message });
  }
};




//?+++++++++++++++++++++++++++++++++++++++++++
//! --------------get by ID -----------
//?+++++++++++++++++++++++++++++++++++++++++++


const getByIdClass = async (req, res, next) => {
  try {
    
    const { id } = req.params;

    // Encontramos la class que tenga ese ID
    //! POPULATE Nos permite obtener los datos de los campos populados
    const ClassById = await Class.findById(id).populate("class");

    // Comprobamos si se ha encontrado a la class
    if (ClassById) {
      return res.status(200).json(ClassById);
    } else {
      return res.status(404).json("No se ha encontrado el teacher");
    }
  } catch (error) {
    return res
      .status(409)
      .json({ error: "Error al buscar por Id", message: error.message });
  }
};

//?+++++++++++++++++++++++++++++++++++++++++++
//! --------------get by Name-----------
//?+++++++++++++++++++++++++++++++++++++++++++

const getByNameClass = async (req, res, next) => {

  try {
    // Hacemos destructuring del name traido por params
    const { clase } = req.params;

    // Buscamos al teacher que coincida en el name
    const classByName = await Class.find({ clase }).populate;
   
    // Si la longitud del array es mayor a 0 hay character con ese name y la respuesta es 200
    if (classByName.length !== 0) {
      return res.status(200).json(classByName);
    } else {
      return res.status(404).json("No se han encontrado registros");
    }
  } catch (error) {
    return res
      .status(409)
      .json({ error: "error durante la búsqueda", message: error.message });
  }
};
  
//?+++++++++++++++++++++++++++++++++++++++++++
//! --------------Update-----------
//?+++++++++++++++++++++++++++++++++++++++++++

const UpdateClass = async (req, res, next) => {
  try {
 

    await Class.syncIndexes();
// Traemos el ID de los params de este clases a actualizar
    const { id } = req.params;

    // buscamos la clase
    const classById = await Class.findById(id);

    if (classById) {
  // Creamos un body custom con los datos , si los hay, del body
      const bodyCustom = {
       _id: classById._id,
       name: req.body?.name ? req.body?.name : classById.name,
       hora: req.body?.hora ? req.body?.hora : classById.hora,
       dia: req.body?.dia? req.body?.dia : classById.dia,
       salas: req.body?.salas ? req.body?.salas : classById.salas,
       class: req.body?.class ? req.body?.class : classById.class,
      };

      // comprobamos si recibimos por el body el genero
      if (req.body?.dia) {
        // Si lo recibimos llamamos a la función de utils que valida el genero
        const resultEnumG = enumDays(req.body?.dia);
        bodyCustom.dia = resultEnumG.check
        ? req.body?.dia
        : classById.dia;
      };
      if (req.body?.salas) {
        // Si lo recibimos llamamos a la función de utils que valida el genero
        const resultEnumD = enumSalas(req.body?.salas);
        bodyCustom.salas = resultEnumD.check
        ? req.body?.salas
        : classById.salas;
      }
      if (req.body?.class) {
        // Si lo recibimos llamamos a la función de utils que valida el genero
        const resultEnumC = enumClass(req.body?.class);
        bodyCustom.class = resultEnumC.check
        ? req.body?.class
        : classById.class;
      }

      try {
        // busque por id el teacher y lo actualize con el customBody
        await Class.findByIdAndUpdate(id, bodyCustom);


          const classByIdUpdate = await Class.findById(id);

           // Cogemos el req.body y le sacamos las CLAVES para saber que elementos han actualizado
          const elementUpdate = Object.keys(req.body);

          // Creamos un objeto vacío donde vamos a meter este test
          let test = {};

           // Recorremos las claves del body y rellenamos el objeto test
          elementUpdate.forEach((item) => {
            // Compruebo el valor de las claves del body con los valores del character actualizado
            if( req.body[item] === classByIdUpdate[item]) {
              test[item] = true;

            } else {
              test[item] = false;
            }
          });

           let acc = 0;

           for (const key in test) {
            // si esto es false añadimos uno al contador
            test[key] === false && acc++;
           }


            // si acc es mayor que 0 lanzamos error porque hay alguna clave en false y eso es que no se ha actualizado
           if (acc > 0) {
            return res.status(409).json({error:"no se puede cambiar la clase"});
           } else {
            return res
            .status(200)
            .json({ update: classByIdUpdate });
          }

      } catch (error) {
        return res.status(409).json({
          error:"no se ha podido actualizar",
          message:error.message,
        });
        
      }
    } else {
      // si el teacher con ese id no existe
      return res.status(404).json(" no ha sido encontrado la clase");
    }
    
  } catch (error) {
    return res 
      .status(409)
      .json({error:"no se ha podido actualizar", message:error.message});
  }
};

//?+++++++++++++++++++++++++++++++++++++++++++
//! --------------delete-----------
//?+++++++++++++++++++++++++++++++++++++++++++


const deleteClass = async (req, res, next) => {
  try {
    // cogemos el id de los params
    const { id } = req.params;

    const classes = await Class.findByIdAndDelete(id);


    // buscamos y borramos el teacher

    if (classes) {
  
      const classDelete = await Class.findById(id);

      try {

        await Class.updateMany(
          { teacher: id },
          { $pull: { teacher: id } }
        );

        // verificamos que el character borrado no tengo la imagen por defecto para borrarla
        classes.image !==
          "https://res.cloudinary.com/dxvasvakp/image/upload/v1709224011/home-story_goailt.jpg" &&
          deleteImgCloudinary(classes.image);

        // Lanzamos una respuesta dependiendo de si se ha encontrado la clase borrado
        return res.status(classDelete ? 409 : 200).json({
          deleteTest: classDelete ? false : true,
        });
      } catch (error) {
        return res.status(409).json({
          error: "Error al borrar la clase",
          message: error.message,
        });
      }
    } else {
      // lanzamos una respuesta 404 que la clase no ha sido encontrado
      return res.status(404).json("la clases no ha sido encontrado");
    }
  } catch (error) {
    return res.status(409).json({
      error: "Error al borrar la clase",
      message: error.message,
    });
  }
};





  module.exports = { createClass, createClases, getAllClass, getByIdClass, getByNameClass, UpdateClass, deleteClass };