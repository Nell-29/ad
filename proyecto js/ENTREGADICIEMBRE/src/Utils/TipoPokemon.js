// export const  TipoPokemon = (PokemonTodos) => {
// const NombreRepetirEliminar = []
// PokemonTodos.forEach((elementos, indice) => {
//     elementos.type.forEach((Tipo)=>{
//         !NombreRepetirEliminar.includes(Tipo.type.name)
//         && NombreRepetirEliminar.push(Tipo.type.name);
//     })
// });
// return NombreRepetirEliminar
// }

//! No lo entiendo, no me sale
export const TipoPokemon = (totalPokemon) => {
    const nameTypeNoReapet = [];
  
    totalPokemon.forEach((item, index) => {
      item.type.forEach((typeSingle) => {
        !nameTypeNoReapet.includes(typeSingle.type.name) &&
          nameTypeNoReapet.push(typeSingle.type.name);
      });
    });
  
    return nameTypeNoReapet;
  };
  

export const filterDataPokemonSelect = (data, typeOnchangeSelect) => {

    const filterPokemon = data.filter((pokemon) =>
      pokemon.type[0].type.name
        .toLowerCase()
        .includes(typeOnchangeSelect.toLowerCase())
    );
  
    const filterPokemonPositionOne = data.filter((pokemon) =>
      pokemon.type[1]?.type.name
        .toLowerCase()
        .includes(typeOnchangeSelect.toLowerCase())
    );
  
    if (typeOnchangeSelect == "All pokemon") {
      return data;
    } else if (filterPokemon.length == 0) {
      return filterPokemonPositionOne;
    } else {
      return filterPokemon;
    }
  };
  
  