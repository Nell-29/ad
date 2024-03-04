
    import { AxiosUtil } from "../utils/axios";

// Llamo, a través de Axios, al endpoint de Pokemon, pasándole por variable
// el id del pokemon que luego se lo daré cuando extraiga los datos en 
// BuclePokemon en el util MapeoDataPokemon

    export const GetAllPokemon = async (Id) => {
      const OptionRequest = {
        method: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${Id}`,
      };
    
      return await AxiosUtil(OptionRequest);
    };
    
    
    