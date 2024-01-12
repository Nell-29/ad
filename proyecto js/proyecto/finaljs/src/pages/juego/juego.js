import { PrintTemplateHeader } from "../../componentes/estructura/header/header";
import { FuncionJuego } from "../../utils/FuncionJuego";
import { PrintLogin } from "../login/login";
import'./juego.css'


// Pinto el contendor de la página y llamo a la función que pinta el tablero
const template = () => `<div id="JuegoPage">

<div class="container" id="tablero">
<button></button>
<button></button>
<button></button>
<button></button>
<button></button>
<button></button>
<button></button>
<button></button>
<button></button>
</div>
</div>
`;


export const PrintJuego = () =>{
  PrintTemplateHeader();
 document.querySelector("main").innerHTML = template();

FuncionJuego();

  }

  