const {deleteImgCloudinay } = require("../middleware/file.middleware");
const {enumClass, enumDays , enumSalas} = require("../utils/enum.G");

//! modelos 

const Class = require("../models/clases.model");
const Salas = require("../models/salas.model");
const teacher = require("../models/teacher.model");
const User = require("../models/user.model");

//?++++++++++++++++++++++++++++++++
//! -----------create ----------
//?+++++++++++++++++++++++++++++

const createSalas = async (req, res, next) => {
 
    try {
      await Salas.syncIndexes();
  
      // Creamos nueva instancia de Movie
      const newSalas= new Salas(req.body);
  
      // Guardamos ese registro en la db
      const saveSalas = await newSalas.save();
  
      // Si existe es que ha guardado de forma correcta --> 200
      if (saveSalas) {
        return res.status(200).json(saveSalas);
      } else {
        // Sino existe es que no se ha guardado --> 409
        return res.status(404).json("No se ha podido crear la sala");
      }
    } catch (error) {
      next(error)
      return res.status(409).json("error en sala creada");
    }
  };


  //?++++++++++++++++++++++++++++++++
//! -----------create ----------
//?+++++++++++++++++++++++++++++

const createSal = async (req, res, next) => {

  let catchImg = req.file?.path;

  try {
    await Salas.syncIndexes();

    // Creamos nueva instancia de Movie
    const newSalas= new Salas(req.body);

    if(catchImg) {
      newSalas.Image = catchImg;
    } else {
      newSalas.Image =

      "https://res.cloudinary.com/dxvasvakp/image/upload/v1709145423/51_gNM1DNkL._AC_UF894_1000_QL80__odnt4z.jpg";
    }

    // Guardamos ese registro en la db
    const saveSalas = await newSalas.save();

    // Si existe es que ha guardado de forma correcta --> 200
    if (saveSalas) {
      return res.status(200).json(saveSalas);
    } else {
      // Sino existe es que no se ha guardado --> 409
      return res.status(404).json("No se ha podido crear la sala");
    }
  } catch (error) {
    req.file?.path && deleteImgCloudinay(catchImg);
    next(error)
    return res.status(409).json("error en sala creada");
  }
};


//?+++++++++++++++++++++++++++++++++++++++++++
//! --------------get all ----
//?+++++++++++++++++++++++++++++++++++++++++++
  

  const getAllSalas = async (req, res, next) => {
    try {
      
      const allSalas = await Salas.find();
      // Find nos devuelve un array con todos los elementos coincidentes
  
      if (allSalas.length > 0) {
        // Si hay registros lanzamos una respuesta correcta
        return res.status(200).json(allSalas);
      } else {
        // si no hay registros lanzamos una respuesta 404
        return res.status(404).json("No se han encontrado la sala");
      }
    } catch (error) {
      // capturtamos el error
      return res
        .status(409)
        .json({ error: "Error al buscar la sala", message: error.message });
    }
  };

  const getByNameSalas = async (req, res, next) => {
    console.log(req);
    try {
      // Hacemos destructuring del name traido por params
      const { name } = req.params;
  
      // Buscamos al teacher que coincida en el name
      const salasByName = await Salas.find({ name });
      console.log(salasByName);
  
      // Si la longitud del array es mayor a 0 hay character con ese name y la respuesta es 200
      if (salasByName.length > 0) {
        return res.status(200).json(salasByName);
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
//! --------------Update de salas-----------
//?+++++++++++++++++++++++++++++++++++++++++++

const UpdateSalas = async (req, res, next) => {
  try {
  // comprobamos si en la solicitud hay una imagen (si hay nos van a cambiar la imagen del teacher)
   
    await Salas.syncIndexes();
// Traemos el ID de los params de este character a actualizar
    const { id } = req.params;

    // buscamos el teacher
    const salasById = await Salas.findById(id);

    if (salasById) {
      const bodyCustom = {
       _id: salasById._id,
       name: req.body?.name ? req.body?.name : salasById.name,
      };

      // comprobamos si recibimos por el body el genero
      if (req.body?.class) {
        // Si lo recibimos llamamos a la función de utils que valida el genero
        const resultEnumclass = enumClass(req.body?.class);
        bodyCustom.class = resultEnumclass.check
        ? req.body?.class
        : salasById.class;
      }

      if (req.body?.salas) {
        // Si lo recibimos llamamos a la función de utils que valida el genero
        const resultEnumSalas = enumSalas(req.body?.salas);
        bodyCustom.salas = resultEnumSalas.check
        ? req.body?.salas
        : salasById.salas;
      }

      try {
        // busque por id el teacher y lo actualize con el customBody
        await Salas.findByIdAndUpdate(id, bodyCustom);

          //! testeo tiempo real 
          const salasByIdUpdate = await Salas.findById(id);
          const elementUpdate = Object.keys(req.body);
          let test = {};

          elementUpdate.forEach((item) => {
            
            if( req.body[item] == salasByIdUpdate[item]) {
              test[item] = true;

            } else {
              test[item] = false;
            }
          });

           let acc = 0;

           for (const key in test) {
            // si esto es false añadimos uno al contador
            test[key] == false && acc++;
           }


            // si acc es mayor que 0 lanzamos error porque hay alguna clave en false y eso es que no se ha actualizado
           if (acc > 0) {
            return res.status(409).json({ error:"no se a podido asignar la sala" });
           } else {
            return res
            .status(200)
            .json({update: salasByIdUpdate });
          }

      } catch (error) {
        return res.status(409).json({
          error:"no se a podido actualizar",
          message:error.message,
        });
        
      }
    } else {
      // si el teacher con ese id no existe
      return res.status(404).json(" la sala no ha sido encontrado");
    }
    
  } catch (error) {
    return res 
      .status(409)
      .json({error:"no se ha podido actualizar", message: error.message});
  }
};


//?+++++++++++++++++++++++++++++++++++++++++++
//! --------------toggle class-----------
//?+++++++++++++++++++++++++++++++++++++++++++

const toggleClass = async (req, res, next) => {
  try {
// Traemos el ID de los params de este character a actualizar
    const { id } = req.params;
    const {clase} = req.params
    // buscamos el teacher
    const classById = await Salas.findById(id);
    if (classById) {
      const arrayClass = clase.split(",");

      Promise.all(
        arrayClass.map(async (clase) => {
          if (classById.class.includes(clase)) {

            try {
              await Salas.findByIdAndUpdate(id, {
                $pull: { Class: clase},
              });

              try {
                await Class.findByIdAndUpdate(multa, {
                  $pull: { Salas: id },
                });
              } 
              
              
              catch (error) {
                return res.status(409).json({
                  error: "Error al desvincular la clase",
                  message: error.message,
                });
              }
            } catch (error) {
              return res.status(409).json({
                error: "Error al desvincular al profesor",
                message: error.message,
              });
            }
          } else {


            try {

              await Salas.findByIdAndUpdate(id, {
                $push: { Class: clase},
              });

              try {


                await Class.findByIdAndUpdate(multa, {
                  $push: { Salas: id },
                });
              } catch (error) {
                return res.status(409).json({
                  error: "Error en desvincular al profesor de la clase",
                  message: error.message,
                });
              }
            } catch (error) {
              return res.status(409).json({
                error: "Error al desvincular la clase sdel porfesor ",
                message: error.message,
              });
            }
          }
        })
      ).then(async () => {
        return res
          .status(200)
          .json(await Salas.findById(id).populate("Class"));
      });
    } else {

      return res.status(404).json("teacher no encontrado, prueba con otro id");
    }
  } catch (error) {
    return res
      .status(409)
      .json({ error: 'Error al actualizar la clase, por favor preuba con otro id', message: error.message });
  }
};


//?+++++++++++++++++++++++++++++++++++++++++++
//! --------------delete-----------
//?+++++++++++++++++++++++++++++++++++++++++++

const deleteSalas = async (req, res, next) => {
  try {
    // cogemos el id de los params
    const { id } = req.params;
    const salas = await Salas.findByIdAndDelete(id);
    // buscamos y borramos el teacher
    if (salas) {
      // Si existe el teacher --> borramos los registros donde aparece
  
      const salasDelete = await Salas.findById(id);
     
      try {
        await Class.updateMany(
          { Salas: id },
          { $pull: { Salas: id } }
        );

        await teacher.updateMany(
          { Salas: id },
          { $pull: { Salas: id } }
        );

        await User.updateMany(
          { Salas: id },
          { $pull: { Salas: id } }
        );

        // verificamos que el character borrado no tengo la imagen por defecto para borrarla
        // Lanzamos una respuesta dependiendo de si se ha encontrado el teacher borrado
        return res.status(salasDelete ? 409 : 200).json({
          deleteTest: salasDelete ? false : true,
        });
      } catch (error) {
        return res.status(409).json({
          error: "Error al borrar la sala",
          message: error.message,
        });
      }
    } else {
      // lanzamos una respuesta 404 que el teacher no ha sido encontrado
      return res.status(404).json("la sala no ha sido encontrado");
    }
  } catch (error) {
    return res.status(409).json({
      error: "Error al borrar la sala",
      message: error.message,
    });
  }
};


  module.exports = 
  {   createSalas,
      createSal, 
      getAllSalas,
      getByNameSalas, 
      UpdateSalas,
      toggleClass,
      deleteSalas };