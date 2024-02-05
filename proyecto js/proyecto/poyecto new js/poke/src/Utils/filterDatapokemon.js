export const filterDataPokemon = (data,palabraDelInput) =>{
     return data.filter((pokemon) =>
     pokemon.name.toLowerCase().includes(palabraDelInput.toLowerCase())
     );
};
