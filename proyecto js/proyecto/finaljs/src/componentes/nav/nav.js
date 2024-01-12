
import { initControler } from '../../utils/rutas';
import { printPokemonPage } from '../../pages/pokemon/pokemon';
import'./nav.css'

const template = () =>`
<nav>
<button id="NavegaPokeApi" class="btn-nav"> Pokedex </button>
<button id="topo" class="btn-nav"> Topo </button>
<button id="tres" class="btn_nav"> Tres en Raya </button>
</nav>`;

export const listeners = () => {
    const pokeDex = document.querySelector("#NavegaPokeApi");
    pokeDex.addEventListener("click",() => {
        printPokemonPage();

    });
    const topo = document.querySelector("#topo");
    topo.addEventListener("click",()=>{
        printTopo()
    });

    const tres = document.querySelector("#tres");
    tres.addEventListener("click",() => {
        printTres()
    });

    const buttonLogout= document.getElementById("nell");
    buttonLogout.addEventListener("click",()=>{
        localStorage.removeItem("usuername");
        initControler();
    });

}

export const printNav = () =>{
    document.querySelector("header").innerHTML += template ();
}