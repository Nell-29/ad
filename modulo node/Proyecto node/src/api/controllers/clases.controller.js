//!importamos
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const validator = require("validator");

//! modelos
const user = require("../models/user.model")
const { deleteImgCloudinary } = require("../middleware/file.middleware");
const Class = require("../models/clases.model");
const teacher = require("../models/teacher.model");
const Salas = require("../models/salas.model");


//?++++++++++++++++++++++++++++++++
//! -----------create ------------
//?+++++++++++++++++++++++++++++++

const createClass = async (req, res, next) => {
    //let catchImg = req.file?.path;
    try {
      await Class.syncIndexes();
  
      // Creamos nueva instancia de class
      const newClass = new Class(req.body);
    
      // Si existe es que ha guardado de forma correcta --> 200
      /*if (catchImg) {
     newClass.image = catchImg;
      } else {
        newClass.image = 

        "https://res.cloudinary.com/dxvasvakp/image/upload/v1709224011/home-story_goailt.jpg";
    
      }*/

      const saveClass = await newClass.save();
      if (saveClass) {
        return res.status(200).json(saveClass);
      } else{
        return res.status(404).json("No se ha podido crear la clase");
      }
    } catch (error) {
        //req.file?.path && deleteImgCloudinary(catchImg);
       // next(error)
      return res.status(409).json("Error en la creación de nueva clase")
      }
    };

    //?++++++++++++++++++++++++++++++++
    //! -----------create ------------
    //?+++++++++++++++++++++++++++++++
    
    const createClases = async (req, res, next) => {
        //let catchImg = req.file?.path;
        try {
          await Class.syncIndexes();
      
          // Creamos nueva instancia de class
          const newClass = new Class(req.body);
        
          // Si existe es que ha guardado de forma correcta --> 200
          /*if (catchImg) {
         newClass.image = catchImg;
          } else {
            newClass.image = 
    
            "https://res.cloudinary.com/dxvasvakp/image/upload/v1709224011/home-story_goailt.jpg";
        
          }*/
    
          const saveClass = await newClass.save();
          if (saveClass) {
            return res.status(200).json(saveClass);
          } else{
            return res.status(404).json("No se ha podido crear la clase");
          }
        } catch (error) {
            //req.file?.path && deleteImgCloudinary(catchImg);
           // next(error)
          return res.status(409).json("Error en la creación de nueva clase")
          }
        };


//?+++++++++++++++++++++++++++++++++++++++++++
//! --------------get all ----
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
    const ClassById = await Class.findById(id).populate("Class");

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
  console.log(req);
  try {
    // Hacemos destructuring del name traido por params
    const { name } = req.params;

    // Buscamos al teacher que coincida en el name
    const classByName = await Class.find({ name });
    console.log(classByName);

    // Si la longitud del array es mayor a 0 hay character con ese name y la respuesta es 200
    if (classByName.length > 0) {
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
  // comprobamos si en la solicitud hay una imagen (si hay nos van a cambiar la imagen del clase)
    let catchImg = req.file?.path;
    await Class.syncIndexes();
// Traemos el ID de los params de este clases a actualizar
    const { id } = req.params;

    // buscamos la clase
    const classById = await Class.findById(id);

    if (classById) {
      // guardamos la imagen que tiene la clase en base de datos
      const oldImage = classById.image;

       // Creamos un body custom con los datos , si los hay, del body
      const bodyCustom = {
       _id: classById._id,
       image: req.file?.path ? catchImg : oldImage,
       name: req.body?.name ? req.body?.name : classById.name,
      };

      // comprobamos si recibimos por el body el genero
      if (req.body?.gender) {
        // Si lo recibimos llamamos a la función de utils que valida el genero
        const resultEnumG = enumG(req.body?.gender);
        bodyCustom.gender = resultEnumG.check
        ? req.body?.gender
        : classById.gender;
      }

      try {
        // busque por id el teacher y lo actualize con el customBody
        await Class.findByIdAndUpdate(id, bodyCustom);

        // Miramos si han actualizado la imagen por si esto es asi, borrar la antigua
        if(req.file?.path) {
// Si la imagen antigua es diferente a la que ponemos por defecto la borramos
          oldImage !==
          "https://res.cloudinary.com/dxvasvakp/image/upload/v1709224011/home-story_goailt.jpg" &&
          deleteImgCloudinary(oldImage);
        }

          //! testeo tiempo real 

          //Buscamos el elemento character YA actualizado mediante el id
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

          
        // Comprobamos que la imagen del teacher Actualizado coincide con la imagen nueva si la hay
        // Si coinciden creamos una copia de test con una nueva clave que será file en true y sino estará en false

          if (catchImg) {
            classByIdUpdate.image === catchImg
            ? (test = {...test, file: true})
            : (test = {...test, file: false});
            
          }


        //** Comprobamos que ninguna clave del test este en false, si hay alguna lanzamos un 409 porque alguna
        //**  clave no se ha actualizado de forma correcta , si estan todas en true lanzamos un 200 que esta todo correcto*/


           let acc = 0;

           for (const key in test) {
            // si esto es false añadimos uno al contador
            test[key] === false && acc++;
           }


            // si acc es mayor que 0 lanzamos error porque hay alguna clave en false y eso es que no se ha actualizado
           if (acc > 0) {
            return res.status(409).json({ dataTest: test, update: false });
           } else {
            return res
            .status(200)
            .json({ dataTest: test, update: classByIdUpdate });
          }

      } catch (error) {
        return res.status(409).json({
          error:"no se a podido actualizar",
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

// Borramos el character cuyo ID traemos por params --> //! INCONISTENCIA --> borrar el registro de este id en los campos donde aparece
//! en este caso aparece en ele array de teachers en Class

const deleteClass = async (req, res, next) => {
  try {
    // cogemos el id de los params
    const { id } = req.params;

    const classes = await Class.findByIdAndDelete(id);


    // buscamos y borramos el teacher

    if (classes) {
      // Si existe el teacher --> borramos los registros donde aparece
      //! comprobamos si ese character ha sido borrado

      const classDelete = await Class.findById(id);

      //! --> borramos los registros de character en los arrys de class donde aparece

      try {
        // UpdateMany --> actualiza todos los registros que contengan en teacher el id del teacher
        // 1º parametro es el filtro
        // 2º acción --> en Movie sacar del array de characters el id de ese teacher borrado
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