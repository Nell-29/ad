
 

import { GetAllPokemon } from "../services/Pokeapi.service";


// Hago in bucle que recorra el endpoint de pokemon GetAllPokemon 150 veces
export const BuclePokemon = async()=>{
  const RawData1 =[];
  for (let i=1; i<151; i++){
    RawData1.push(await GetAllPokemon(i))
  }
  return MapeoDataPokemon(RawData1);
  
}

// Y me guarde en un objeto el nombre con la primera en mayúscula, la imagen, tipo, etc,
export const MapeoDataPokemon = (Data1) => {
  const DataFiltrada =  Data1.map((item) => ({
    name:  item.name.charAt(0).toUpperCase() + item.name.slice(1),
    image: item.sprites.front_default,
    type: item.types,
    id: item.id,
  }));
  return DataFiltrada;
};


