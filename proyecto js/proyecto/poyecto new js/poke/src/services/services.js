import { axiosUtil } from "../Utils/axios";

export const getByIdPokemon = async(id) => {
    const optionRequest = {
        method: "GET",
        URL: `https://pokeapi.co/api/v2/pokemon/${id}`
    };

    return await axiosUtil(optionRequest);
};