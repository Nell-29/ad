
import "./FiltrosPokemon.css";

// Imprime el input de búsqueda de Pokemon
const template = `<div id="Filtros">
<input class="FiltroPokemon" id="FiltroPokemonNombre" placeholder="¿Qué Pokemon Buscas?"/>
</div>
<div id="Gallery"></div>`

  export const PrintBotonesPokemon = () => {
   
    document.querySelector("#PokeApiPage").innerHTML += template;
    
  };


  



