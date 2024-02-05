import { filterDataPokemon } from "../../Utils";
import "./pokemon.css"



const template = () =>
  `
  <div id="pokemon">
    <div id="containerFilter">
      <div id="spinnerButtonFilter"></div>
      <div id="filterButton"></div>
      <input
        type="text"
        id="inputPokemon"
        placeholder="Busca tu pokemon favorito"
      />
    </div>
    <div id="paginacion"></div>
    <div id="spinner"></div>
    <div id="galleryPokemon"></div>
  </div>
`;

const getDataService = async () => {
    PrintSpinner();
    const data = await getDataPokemonBucle ();
    const types = typePokemon (data);
    PrintSelectTypePokemoBucle(types,data);
    listeners(data);
    printGallery(data);
};

export const PrintPokemonPage = () => {
    document.querySelector("main").innerHTML = template ();
    getDataService();
};

const listeners = (totalData) => {
  const inputPokemon = document.getElementById("inputPokemon");

  inputPokemon.addEventListener("input",(e) => {
    const filterPokemon = filterDataPokemon(totalData, e.target.value);

    console.log(totalData,e.value)
    printGallery(filterPokemon);
  });
};