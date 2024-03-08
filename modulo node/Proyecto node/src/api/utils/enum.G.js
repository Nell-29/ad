const enumOK = (gender) => {
    const enumGender = ["hombre", "mujer", "otro"];
    if (enumGender.includes(gender)) {
      return { check: true, gender };
    } else {
      return { check: false };
    }
  };

  const enumClass = (clases) => {
    const enumClass = ["yoga", "pilates", " taichi", "boxeo", "ciclo","karate", "crossfit", "bodyjum", "otro"];
    if (enumClass.includes(clases)) {
      return { check: true, clases };
    } else {
      return { check: false };
    }
  };

  const enumSalas = (salas) => {
    const enumSala = ["sala A", "sala B", " sala C", "otra"];
    if (enumSala.includes(salas)) {
      return { check: true, salas };
    } else {
      return { check: false };
    }
  };
  
  const enumDays = (days) => {
    const enumDay = ["lunes", "martes", " miercoles", "jueves", "viernes", "otro"];
    if (enumDay.includes(days)) {
      return { check: true, days };
    } else {
      return { check: false };
    }
  };

  const enumUsers = (users) => {
    const enumUser = ["Admin", "User", "teacher"];
    if (enumUser.includes(users)) {
      return { check: true, users };
    } else {
      return { check: false };
    }
  };

  
  module.exports = {enumOK, enumClass, enumSalas, enumDays,enumUsers };