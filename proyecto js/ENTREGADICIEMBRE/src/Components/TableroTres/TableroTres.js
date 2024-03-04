import "./TableroTres.css";
import { TresFuncion } from "../../Utils/TresFuncion";


// Pinto 9 botones del tres en raya que desencadenarán las acciones
// Con los estilos de CSS los coloco en tablero
const template =   `<div id="TableroTres">

<body>
<div class="MallaTres">
 <button class="BotonTres"></button>
 <button class="BotonTres"></button>
 <button class="BotonTres"></button>
 <button class="BotonTres"></button>
 <button class="BotonTres"></button> 
 <button class="BotonTres"></button>
 <button class="BotonTres"></button>
 <button class="BotonTres"></button>
 <button class="BotonTres"></button>
</div>
</body>

</div>`

// Pinto el tablero ya las funciones del juego
  export const PrintTableroTres = () => {
    document.querySelector("#TresPage").innerHTML += template;
    TresFuncion()
  };

  
