import './botonesTopo.css'
import { funcionTopo } from '../../utils/TopoFuncion';

const template = `<div id="botonTopo"> 
<div id="customCursor"></div>
<h2 id="punto"> Puntuacion: </h2>
<h2 id="puntuacion">0</h2>

<div id="tiempo"> >Cuenta a cero: </div>
<h2 id="cuentacero">30</h2>

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

export const PrintBotonesTopo = () =>{
    document.querySelector("#TopoPage").innerHTML += template;
    funcionTopo();
};