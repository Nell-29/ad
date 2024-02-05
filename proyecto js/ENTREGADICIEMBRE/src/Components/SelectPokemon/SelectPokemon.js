import "./SelectPokemon.css";
import { PrintGallery } from "../../Pages/PokeApi/Pokeapi";
import { filterDataPokemonSelect } from "../../Utils/TipoPokemon";


//! No lo entiendo, no me sale
const listeners = (allData) => {
    const select = document.querySelector("select");
  
    select.addEventListener("change", (e) => {
      const filterInfoPokemon = filterDataPokemonSelect(allData, e.target.value);
      PrintGallery(filterInfoPokemon);
    });
  }; 

  export const PrintSelectTypePokemon = (types, allData) => {
    const selectType = document.createElement("select");
    const optionType = document.createElement("option");
    optionType.textContent = "All pokemon";
    selectType.appendChild(optionType);
  
    types.map((type) => {
      const optionType = document.createElement("option");
      optionType.textContent = type;
      selectType.appendChild(optionType);
    });
  
    document.getElementById("filterButton").appendChild(selectType);
  
    listeners(allData);
  };
  