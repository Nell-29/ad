import { axiosUtil } from "../utils/axios";

export const GetInfoPokemon = async(id) =>{
    const optionsRequest={
        method:"GET",
        URL:`https://pokeapi.co/api/v2/pokemon/${id}`
    };

    return await axiosUtil(optionsRequest);
};