const enumClass = (clases) => {
    const enumClass = ["yoga", "pilates", " taichi", "boxeo", "kararte", "ciclo", "crossfit", "bodypump"];
    if (enumClass.includes(clases)) {
      return { check: true, clases };
    } else {
      return { check: false };
    }
  };
  
  module.exports = enumClass;