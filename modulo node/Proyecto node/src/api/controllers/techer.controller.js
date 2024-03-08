const { deleteImgCloudinary } = require("../middleware/file.middleware");

//! modelos---
const Class = require("../models/clases.model");
const Salas = require("../models/salas.model");
const teacher = require("../models/teacher.model");
const user = require("../models/user.model");
const enumOk = require("../utils/enum.G");
const enumClass = require("../utils/enum.G");

//?+++++++++++++++++++++++++++++++++++++++++++
//! --------------create ----
//?+++++++++++++++++++++++++++++++++++++++++++

const createTeacher = async (req, res, next) => {
    let catchImg = req.file?.path;
    try {
      await teacher.syncIndexes();
  
      // Creamos nueva instancia de Movie
      const newTeacher = new teacher(req.body);

      // Si existe es que ha guardado de forma correcta --> 200
      if (catchImg) {
     newTeacher.image = catchImg;
      } else {
        newTeacher.image = 
        "https://res.cloudinary.com/dxvasvakp/image/upload/v1709224011/home-story_goailt.jpg";
    
      }
  
      // Guardamos ese registro en la db
      const saveTeacher = await newTeacher.save();
  
      // Si existe es que ha guardado de forma correcta --> 200
      if (saveTeacher) {
        return res.status(200).json(saveTeacher);
      } else {
        // Sino existe es que no se ha guardado --> 409
        return res
        .status(404)
        .json("No se ha podido crear el teacher");
      }
    } catch (error) {
      req.file?.path && deleteImgCloudinary(catchImg);
       next(error)
      return res.status(409).json("Error en la creación de nuevo teacher",)
    }
  };


//?+++++++++++++++++++++++++++++++++++++++++++
//! --------------create ----
//?+++++++++++++++++++++++++++++++++++++++++++

  const createTeaches = async (req, res, next) => {
    let catchImg = req.file?.path;
    try {
      await teacher.syncIndexes();
  
      // Creamos nueva instancia de Movie
      const newTeaches = new teacher(req.body);

      // Si existe es que ha guardado de forma correcta --> 200
      if (catchImg) {
     newTeaches.image = catchImg;
      } else {
        newTeaches.image = 
        "https://res.cloudinary.com/dxvasvakp/image/upload/v1709224011/home-story_goailt.jpg"; 
    
      }
  
      // Guardamos ese registro en la db
      const saveTeaches = await newTeaches.save();
  
      // Si existe es que ha guardado de forma correcta --> 200
      if (saveTeaches) {
        return res.status(200).json(saveTeaches);
      } else {
        // Sino existe es que no se ha guardado --> 409
        return res
        .status(404)
        .json("No se ha podido crear el teacher");
      }
    } catch (error) {
      req.file?.path && deleteImgCloudinary(catchImg);
       next(error)
      return res.status(409).json("Error en la creación de nuevo teacher",)
    }
  };

//?+++++++++++++++++++++++++++++++++++++++++++
//! --------------get all ----
//?+++++++++++++++++++++++++++++++++++++++++++
  

  const getAllTeacher = async (req, res, next) => {
    try {
      
      const allTeacher = await teacher.find();
      // Find nos devuelve un array con todos los elementos coincidentes
  
      if (allTeacher.length > 0) {
        // Si hay registros lanzamos una respuesta correcta
        return res.status(200).json(allTeacher);
      } else {
        // si no hay registros lanzamos una respuesta 404
        return res.status(404).json("No se han encontrado al teacher");
      }
    } catch (error) {
      // capturtamos el error
      return res
        .status(409)
        .json({ error: "Error al buscar al teacher", message: error.message });
    }
  };


//?+++++++++++++++++++++++++++++++++++++++++++
//! --------------get by ID -----------
//?+++++++++++++++++++++++++++++++++++++++++++


const getByIdTeacher = async (req, res, next) => {
  try {
    
    const { id } = req.params;

    // Encontramos al teacher que tenga ese ID
    //! POPULATE Nos permite obtener los datos de los campos populados
    const teacherById = await teacher.findById(id).populate("class");

    // Comprobamos si se ha encontrado al teacher
    if (teacherById) {
      return res.status(200).json(teacherById);
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

const getByNameTeacher = async (req, res, next) => {
  console.log(req);
  try {
    // Hacemos destructuring del name traido por params
    const { name } = req.params;

    // Buscamos al teacher que coincida en el name
    const teacherByName = await teacher.find({ name });
    console.log(teacherByName);

    // Si la longitud del array es mayor a 0 hay character con ese name y la respuesta es 200
    if (teacherByName.length > 0) {
      return res.status(200).json(teacherByName);
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
//! --------------Update de teacher -----------
//?+++++++++++++++++++++++++++++++++++++++++++

const UpdateTeacher = async (req, res, next) => {
  try {
  // comprobamos si en la solicitud hay una imagen (si hay nos van a cambiar la imagen del teacher)
    let catchImg = req.file?.path;
    await teacher.syncIndexes();
// Traemos el ID de los params de este character a actualizar
    const { id } = req.params;

    // buscamos el teacher
    const teacherById = await teacher.findById(id);

    if (teacherById) {
      // guardamos la imagen que tiene el teacher en base de datos
      const oldImage = teacherById.image;

       // Creamos un body custom con los datos , si los hay, del body
      const bodyCustom = {
       _id: teacherById._id,
       image: req.file?.path ? catchImg : oldImage,
       name: req.body?.name ? req.body?.name : teacherById.name,
      };

      // comprobamos si recibimos por el body el genero
      if (req.body?.gender) {
        // Si lo recibimos llamamos a la función de utils que valida el genero
        const resultEnumG = enumOk(req.body?.gender);
        bodyCustom.gender = resultEnumG.check
        ? req.body?.gender
        : teacherById.gender;
      }

      try {
        // busque por id el teacher y lo actualize con el customBody
        await teacher.findByIdAndUpdate(id, bodyCustom);

        // Miramos si han actualizado la imagen por si esto es asi, borrar la antigua
        if(req.file?.path) {
// Si la imagen antigua es diferente a la que ponemos por defecto la borramos
          oldImage !==
          "https://res.cloudinary.com/dxvasvakp/image/upload/v1709224011/home-story_goailt.jpg" &&
          deleteImgCloudinary(oldImage);
        }

          //! testeo tiempo real 

          //Buscamos el elemento character YA actualizado mediante el id
          const teacherByIdUpdate = await teacher.findById(id);

           // Cogemos el req.body y le sacamos las CLAVES para saber que elementos han actualizado
          const elementUpdate = Object.keys(req.body);

          // Creamos un objeto vacío donde vamos a meter este test
          let test = {};

           // Recorremos las claves del body y rellenamos el objeto test
          elementUpdate.forEach((item) => {
            // Compruebo el valor de las claves del body con los valores del character actualizado
            if( req.body[item] === teacherByIdUpdate[item]) {
              test[item] = true;

            } else {
              test[item] = false;
            }
          });

          
        // Comprobamos que la imagen del teacher Actualizado coincide con la imagen nueva si la hay
        // Si coinciden creamos una copia de test con una nueva clave que será file en true y sino estará en false

          if (catchImg) {
            teacherByIdUpdate.image === catchImg
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
            .json({ dataTest: test, update: teacherByIdUpdate });
          }

      } catch (error) {
        return res.status(409).json({
          error:"no se a podido actualizar",
          message:error.message,
        });
        
      }
    } else {
      // si el teacher con ese id no existe
      return res.status(404).json(" el teacher no ha sido encontrado");
    }
    
  } catch (error) {
    return res 
      .status(409)
      .json({error:"no se ha podido actualizar", message:error.message});
  }
};

//?+++++++++++++++++++++++++++++++++++++++++++
//! --------------Update de salas-----------
//?+++++++++++++++++++++++++++++++++++++++++++

const UpdateSalas = async (req, res, next) => {
  try {
  // comprobamos si en la solicitud hay una imagen (si hay nos van a cambiar la imagen del teacher)
    let catchImg = req.file?.path;
    await Salas.syncIndexes();
// Traemos el ID de los params de este character a actualizar
    const { id } = req.params;

    // buscamos el teacher
    const salasById = await Salas.findById(id);

    if (salasById) {
      // guardamos la imagen que tiene el teacher en base de datos
      const oldImage = salasById.Image;

       // Creamos un body custom con los datos , si los hay, del body
      const bodyCustom = {
       _id: salasById._id,
       image: req.file?.path ? catchImg : oldImage,
       name: req.body?.name ? req.body?.name : salasById.name,
      };

      // comprobamos si recibimos por el body el genero
      if (req.body?.clases) {
        // Si lo recibimos llamamos a la función de utils que valida el genero
        const resultEnumclass = enumClass(req.body?.clases);
        bodyCustom.clases = resultEnumclass.check
        ? req.body?.clases
        : salasById.class;
      }

      try {
        // busque por id el teacher y lo actualize con el customBody
        await salas.findByIdAndUpdate(id, bodyCustom);

        // Miramos si han actualizado la imagen por si esto es asi, borrar la antigua
        if(req.file?.path) {
// Si la imagen antigua es diferente a la que ponemos por defecto la borramos
          oldImage !==
          "https://res.cloudinary.com/dxvasvakp/image/upload/v1709145423/51_gNM1DNkL._AC_UF894_1000_QL80__odnt4z.jpg" &&
          deleteImgCloudinary(oldImage);
        }

          //! testeo tiempo real 

          //Buscamos el elemento character YA actualizado mediante el id
          const salasByIdUpdate = await Salas.findById(id);

           // Cogemos el req.body y le sacamos las CLAVES para saber que elementos han actualizado
          const elementUpdate = Object.keys(req.body);

          // Creamos un objeto vacío donde vamos a meter este test
          let test = {};

           // Recorremos las claves del body y rellenamos el objeto test
          elementUpdate.forEach((item) => {
            // Compruebo el valor de las claves del body con los valores del character actualizado
            if( req.body[item] === salasByIdUpdate[item]) {
              test[item] = true;

            } else {
              test[item] = false;
            }
          });

          
        // Comprobamos que la imagen del teacher Actualizado coincide con la imagen nueva si la hay
        // Si coinciden creamos una copia de test con una nueva clave que será file en true y sino estará en false

          if (catchImg) {
            salasByIdUpdate.image === catchImg
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
            .json({ dataTest: test, update: salasByIdUpdate });
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
      .json({error:"no se ha podido actualizar", message:error.message});
  }
};


//?+++++++++++++++++++++++++++++++++++++++++++
//! --------------delete-----------
//?+++++++++++++++++++++++++++++++++++++++++++

// Borramos el character cuyo ID traemos por params --> //! INCONISTENCIA --> borrar el registro de este id en los campos donde aparece
//! en este caso aparece en ele array de teachers en Class

const deleteTeacher = async (req, res, next) => {
  try {
    // cogemos el id de los params
    const { id } = req.params;
    const Teacher = await teacher.findByIdAndDelete(id);


    // buscamos y borramos el teacher

    if (Teacher) {
      // Si existe el teacher --> borramos los registros donde aparece
      //! comprobamos si ese character ha sido borrado

      const teacherDelete = await teacher.findById(id);

      //! --> borramos los registros de character en los arrys de class donde aparece

      try {
        // UpdateMany --> actualiza todos los registros que contengan en teacher el id del teacher
        // 1º parametro es el filtro
        // 2º acción --> en Movie sacar del array de characters el id de ese teacher borrado
        await Class.updateMany(
          { Teacher: id },
          { $pull: { Teacher: id } }
        );

        // verificamos que el character borrado no tengo la imagen por defecto para borrarla
        Teacher.image !==
          "https://res.cloudinary.com/dxvasvakp/image/upload/v1709224011/home-story_goailt.jpg" &&
          deleteImgCloudinary(Teacher.image);

        // Lanzamos una respuesta dependiendo de si se ha encontrado el teacher borrado
        return res.status(teacherDelete ? 409 : 200).json({
          deleteTest: teacherDelete ? false : true,
        });
      } catch (error) {
        return res.status(409).json({
          error: "Error al borrar el teacher",
          message: error.message,
        });
      }
    } else {
      // lanzamos una respuesta 404 que el teacher no ha sido encontrado
      return res.status(404).json("El teacher no ha sido encontrado");
    }
  } catch (error) {
    return res.status(409).json({
      error: "Error al borrar el teacher",
      message: error.message,
    });
  }
};


//! exportamos
  
  module.exports =
      {createTeacher,
       createTeaches,
       getAllTeacher,
        getByIdTeacher, 
        getByNameTeacher, 
        UpdateTeacher,
        UpdateSalas,
        deleteTeacher};

