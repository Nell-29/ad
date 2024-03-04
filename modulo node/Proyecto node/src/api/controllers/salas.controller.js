const {deleteImgCloudinay } = require("../middleware/file.middleware");
const enumClass = require("../utils/enum.Class");

//! modelos 

const salas = require("../models/salas.model");
const user = require("../models/user.model");
const teacher = require("../models/teacher.model");
const Class = require("../models/clases.model");
const Salas = require("../models/salas.model");

//?++++++++++++++++++++++++++++++++
//! -----------create ----------
//?+++++++++++++++++++++++++++++

const createSalas = async (req, res, next) => {

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
        await Salas.findByIdAndUpdate(id, bodyCustom);

        // Miramos si han actualizado la imagen por si esto es asi, borrar la antigua
        if(req.file?.path) {
// Si la imagen antigua es diferente a la que ponemos por defecto la borramos
          oldImage !==
          "https://res.cloudinary.com/dxvasvakp/image/upload/v1709145423/51_gNM1DNkL._AC_UF894_1000_QL80__odnt4z.jpg" &&
          deleteImgCloudinay(oldImage);
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
//! --------------Update class-----------
//?+++++++++++++++++++++++++++++++++++++++++++

const UpdateClass = async (req, res, next) => {
  try {
  // comprobamos si en la solicitud hay una imagen (si hay nos van a cambiar la imagen del teacher)
    let catchImg = req.file?.path;
    await Class.syncIndexes();
// Traemos el ID de los params de este character a actualizar
    const { id } = req.params;

    // buscamos el teacher
    const classById = await Class.findById(id);

    if (classById) {
      // guardamos la imagen que tiene el teacher en base de datos
      const oldImage = classById.Image;

       // Creamos un body custom con los datos , si los hay, del body
      const bodyCustom = {
       _id: classById._id,
       image: req.file?.path ? catchImg : oldImage,
       name: req.body?.name ? req.body?.name : classById.name,
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
        await Class.findByIdAndUpdate(id, bodyCustom);

        // Miramos si han actualizado la imagen por si esto es asi, borrar la antigua
        if(req.file?.path) {
// Si la imagen antigua es diferente a la que ponemos por defecto la borramos
          oldImage !==
          "https://res.cloudinary.com/dxvasvakp/image/upload/v1709145423/51_gNM1DNkL._AC_UF894_1000_QL80__odnt4z.jpg" &&
          deleteImgCloudinay(oldImage);
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

const deleteSalas = async (req, res, next) => {
  try {
    // cogemos el id de los params
    const { id } = req.params;
    const sala = await Salas.findByIdAndDelete(id);


    // buscamos y borramos el teacher

    if (sala) {
      // Si existe el teacher --> borramos los registros donde aparece
      //! comprobamos si ese character ha sido borrado

      const salasDelete = await Salas.findById(id);

      //! --> borramos los registros de character en los arrys de class donde aparece

      try {
        // UpdateMany --> actualiza todos los registros que contengan en teacher el id del teacher
        // 1º parametro es el filtro
        // 2º acción --> en Movie sacar del array de characters el id de ese teacher borrado
        await Salas.updateMany(
          { Class: id },
          { $pull: { Class: id } }
        );

        // verificamos que el character borrado no tengo la imagen por defecto para borrarla
        sala.Image!==
          "https://res.cloudinary.com/dxvasvakp/image/upload/v1709145423/51_gNM1DNkL._AC_UF894_1000_QL80__odnt4z.jpg" &&
          deleteImgCloudinay(Teacher.image);

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
      UpdateClass,
      deleteSalas };