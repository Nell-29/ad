

import { AxiosUtil } from "../utils/axios";

// Llamo, a través de Axios, al endpoint de RickAndMorty

export const GetAll = async () =>{
const OptionRequest1 ={
  method: "GET",
  url: "https://rickandmortyapi.com/api/character",
};

return await AxiosUtil(OptionRequest1)

}




