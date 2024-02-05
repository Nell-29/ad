
import { PrintBotonesTopo} from "../../Components/BotonesTopo/BotonesTopo";


// Genero el contenedor de la página
const template = () => `<div id="TopoPage">

 </div>
`;

// Lo pinto y llamo a la función que pinta los cuadrados del topo
export const PrintTopoPage = () =>{
 document.querySelector("main").innerHTML = template();

 PrintBotonesTopo();

  }

  


//! CÓDIGO DEL AHORCADO QUE NO CONSEGUÍ HACER FUNCIONAR
  // const template = () => `<div id="AhorcadoPage">

// <img id="ImagenAhorcado" src="https://media.istockphoto.com/id/1196954772/es/vector/ilustraci%C3%B3n-simple-del-juego-del-verdugo.jpg?s=612x612&w=0&k=20&c=UIMYP1RUISQl0162ApU7TECcjs2sKnWdDPJ3yhmuEOI="></img>
// </div>`;
// export const PrintAhorcadoPage = () =>{
// document.querySelector("main").innerHTML = template();
// }


// const template = () => `<div id="AhorcadoPage">

// <img id="ImagenAhorcado" src="https://media.istockphoto.com/id/1196954772/es/vector/ilustraci%C3%B3n-simple-del-juego-del-verdugo.jpg?s=612x612&w=0&k=20&c=UIMYP1RUISQl0162ApU7TECcjs2sKnWdDPJ3yhmuEOI="></img>
// </div>`;
// export const PrintAhorcadoPage = () =>{
// document.querySelector("main").innerHTML = template();
// }

// import { JuegoAhorcado } from "../../Components/FigureAhorcado/FigureAhorcado";

// const template = () => `<div id="AhorcadoPage">
// <input id="letra" type="text" placeholder="Dame una letra" maxlength="1">
// <button id="boton">Comprobar</button>
// <div id="resultado"></div>
// <h2>Intentos</h2>
// <div id="intentos"></div>
// <h2>Historial</h2>
// <div id="historial"></div>
// </div>

// `;
// export const PrintAhorcadoPage = () =>{
// document.querySelector("main").innerHTML = template();
// JuegoAhorcado()
//  }