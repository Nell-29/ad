import { PrintPokeApiPage } from "../../Pages/PokeApi/Pokeapi";
import { PrintRickandmortyPage } from "../../Pages/Rickandmorty/Rickandmorty";
import { PrintTopo } from "../../Pages/Topo/TopoInicio";
import { PrintTres } from "../../Pages/Tres/Tres";
import { initControler } from "../../Utils/route";
import "./Nav.css";

// Pinto los cuatro botones
// EL logout lo pinto a parte para darle otros estilos y metiéndolo aquí no me funciona
const template = () => ` 
<nav>
    <button id="NavegaPokeApi" class="btn-nav">PokeApi</button>
    <button id="NavegaRickandMorty" class="btn-nav">Rick & Morty</button>
    <button id="Topo" class="btn-nav">Topo</button>
    <button id="Tres" class="btn-nav">Tres en Raya</button>
</nav>`;
 
// Asigno las funciones que pintan cada página
// Apuntando a cada botón con el queryselector
export const Listeners = () =>{

    const PokeApi = document.querySelector("#NavegaPokeApi");
    PokeApi.addEventListener("click", () =>{
        PrintPokeApiPage();
    });
    const Rickandmorty = document.querySelector("#NavegaRickandMorty");
    Rickandmorty.addEventListener("click",()=>{
        PrintRickandmortyPage()
    });
    const Topo = document.querySelector("#Topo");
    Topo.addEventListener("click",()=>{
        PrintTopo()
    });
    const Tres = document.querySelector("#Tres");
    Tres.addEventListener("click",()=>{
        PrintTres()
    });
    // Le digo que cuando haga click en el boton de logout,
    //   me borre el usuario del local storage y lance el init inicial
    const buttonLogout = document.getElementById("jorge");
    buttonLogout.addEventListener("click", () => {
      localStorage.removeItem("usuario");
      initControler();
    });
 
}


export const PrintNav =()=>{
    document.querySelector("header").innerHTML += template();
}

