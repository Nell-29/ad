
import { PrintTableroTres } from "../../Components/TableroTres/TableroTres";


// Pinto el contendor de la página y llamo a la función que pinta el tablero
const template = () => `<div id="TresPage">

 </div>
`;


export const PrintTres = () =>{
 document.querySelector("main").innerHTML = template();

 PrintTableroTres();

  }

  