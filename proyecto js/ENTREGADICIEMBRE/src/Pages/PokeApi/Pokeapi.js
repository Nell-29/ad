

import "./PokeApi.css"
import { PrintFigurePokemon } from "../../Components/FigurePokemon/FigurePokemon";
import { BuclePokemon } from "../../Utils/Mapeodatapokemon";
import {PrintBotonesPokemon } from "../../Components/FiltrosPokemon/FiltrosPokemon";
import { FilterDataPokemon } from "../../Utils/FilterDataPokemon";
import { TipoPokemon } from "../../Utils/TipoPokemon";
//import { PrintSelectTypePokemon } from "../../Components/SelectPokemon/SelectPokemon";


 // Genero el contendeor de la pagina
const template = () => `
<div id="PokeApiPage">
</div>`;

// Hago un bucle y voy imprimiendo en html los datos a través de la funcion
// PrintFigurePokemon pasándole por variable el nombre, image, etc. 
export const PrintGallery = (Data) => {
  Data.map((item) => PrintFigurePokemon(item.name, item.image, item.id, item.type))

  };
  
 

const listeners = (DataAfiltrar) =>{
  // Apunto al input
  const input = document.querySelector("#FiltroPokemonNombre");
  // a través de un evento change,
  input.addEventListener("change", (event) =>{
  // me filtre todos los pokemon que coincidan con el valor que le he dado en el input
    const DataFiltrada = FilterDataPokemon(DataAfiltrar, event.target.value);
  // le digo que me borre el contenedro
   document.querySelector("#Gallery").innerHTML = "";
   // y me imprima (PrintGallery,PrintFigurePokemon )
    PrintGallery(DataFiltrada)
  })
}



  // Imprimo el contenedor y llamo a la función que lanza todas las funciones GETDATA
export const PrintPokeApiPage = () => {
  document.querySelector("main").innerHTML = template();
  GetData();
};



// Lanzon todas las funciones 
const GetData = async () => {
  const Data = await BuclePokemon();
 const Tipos = TipoPokemon(Data);

  PrintBotonesPokemon();
  PrintGallery(Data);
  listeners(Data); 
 // PrintSelectTypePokemon(Tipos,Data);
};
