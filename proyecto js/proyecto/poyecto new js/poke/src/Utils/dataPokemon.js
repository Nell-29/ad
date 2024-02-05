import {getByIdPokemon} from "../services/services";

export const getDataPokemonBucle = async () => {
    const rawData = [];
    for (let i =1; i < 151; i++){
        rawData.push(await getByIdPokemon(i));
    }


    return dataMap(rawData);
}; 


const dataMap = (data) => {
      const filterData = data.map((pokemon) => ({
        name:pokemon.name,
        image:pokemon.sprites.other.dream_world.front_default,
        type: pokemon.types,
        id:pokemon.id,
      }));

      return filterData;
};