// función que crea un numero random que será enviado al email como el codigo de confirmacion y guardado en el user
const randomCode = () => {
    let code = Math.floor(Math.random() * (999999 - 100000) + 1000000);
    return code;
  };
  
  module.exports = randomCode;
  