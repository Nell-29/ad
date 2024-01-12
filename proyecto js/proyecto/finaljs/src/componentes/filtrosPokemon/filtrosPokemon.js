import './filtrosPokemon.css'

const template =`<div id="Filtros">
<input class="FiltroPoke" id="FiltroPokeNombre" placeholder= "¿cual es tu pokemon?"/>
</div>
<div id="gallery"></div>`

    export const PrintButtonPoke= () => {
        document.querySelector("#PokeApiPage").innerHTML += template;
    };