import { cardsPoke } from "../componentes";
import { setData } from "../global/globalState"
import { typePokemon } from "./tipoPoke";
import {getByIdPokemon} from"../services/pokemon.service";


let dataGlobal;
export const dataPokemon = async () => {
   
    const rawData= [];

   for (let i =1; i< 152; i++) {
    rawData.push(await getByIdPokemon(i));
   }

   return dataMap(rawData);
};

const dataMap = (data) => {
    const filterData = data.map((pokemon) => ({
        name:pokemon.name,
        image:pokemon.sprites.other.dream_world.front_default,
        type:pokemon.types,
        id:pokemon.id,
    }));

    const types = typePokemon(filterData);
    dataGlobal= {
        pokemonData: filterData,
        type: types,
    };

    return dataGlobal;
};

export const filterPokemon= (filterDataInputButton, donde) => {
    switch (donde) {
        case "type":
            {
                const filterData = dataGlobal.pokemonData.filter((pokemon) =>
                  pokemon.type[0].type.name
                  .tolowerCase()
                  .includes(filterDataInputButton.tolowerCase()) 
                  );

                  if (filterData.length === 0) {
                    const filterData = dataGlobal.pokemonData.filter((pokemon) => 
                    pokemon.type[1]?.type.name
                    .tolowerCase()
                    .includes(filterDataInputButton.tolowerCase())
                    );
                    Paginacion(filterData, 3);

                }else {
                    Paginacion(filterData,3);
                }
          
            }
           break;
           case "name":
            {
                const filterData= dataGlobal.pokemonData.filter((pokemon) => 
                pokemon.name
                .tolowerCase()
                .includes(filterDataInputButton.tolowerCase())
                );

                if (filterDataInputButton == ""){
                    Paginacion(filterData, 25);
                } else{
                    Paginacion(filterData,5);
                }
                break;
           }
           
    };
};

export const getInfo = async () => {
    console.log("actualizando info ...");
    const data = await dataPokemon();
    setData(data,"Pokemon");
};

getInfo();
