import "./BotonesTopo.css";
import { TopoFuncion } from "../../Utils/TopoFunciones";


// Genero el texto y los botones en HTML dentro de un div con clase BotonesTopo
// El segundo tiene una clase diferente porque es donde sale el topo inicialmente
// El grid es donde ban los div dentro
const template =   `<div id="BotonesTopo">

<div id="customCursor"></div>

<h2 id="punto">Puntuación:</h2> 
<h2 id="puntuacion">0</h2>
<div id="tiempo">Cuenta atrás:</div>
<h2 id="cuentaatras">30</h2>
  
<div class="grid">
        <div class="square" id="1"></div>
        <div class="square mole" id="2"></div> 
        <div class="square" id="3"></div>
        <div class="square" id="4"></div>
        <div class="square" id="5"></div>
        <div class="square" id="6"></div>
        <div class="square" id="7"></div>
        <div class="square" id="8"></div>
        <div class="square" id="9"></div>
</div>
</div>`

// Imprimo el HTML y las funciones del juego del topo
  export const PrintBotonesTopo = () => {
    document.querySelector("#TopoPage").innerHTML += template;
    TopoFuncion()
  };

  
