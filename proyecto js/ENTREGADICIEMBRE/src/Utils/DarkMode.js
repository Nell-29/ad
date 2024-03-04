
// Genero una función que pinta de negro y le asigno el valor primer click
function Primero(){
    document.body.style.background = "rgba(0,0,0)";
  }
  // Genero una función que pinta de blanco y le asigno el valor del segundo click
function Segundo(){
    document.body.style.background = "rgba(255,255,255)"
  }

// Creo la función que pinta de blanco o negro
export const DarkModeFuncion = () => {
//  apunto a la imagén que desencadenará el evento
    let DarkMode= document.querySelector("#DarkMode");
// le doy un valor inicial de true
    DarkMode.setAttribute("data-click",true);
// Evalúo si cuando hago click es true y me lance el primer color
    DarkMode.addEventListener("click",function(){
    if(eval( DarkMode.getAttribute("data-click"))){
      Primero();
//Y cambio el valor a false
      DarkMode.setAttribute("data-click",false);
// Evalúo si cuando hago click es true. No lo es porque lo he cambiado a false, 
// entonces lanza el segundo color
    }else{
      Segundo();
// Repite el proceso desde cero poniendo atrue, lanzando primercolor, 
// poniendo false y lanzando el segudno
      DarkModeFuncion();
    }
    
    }) 
  };