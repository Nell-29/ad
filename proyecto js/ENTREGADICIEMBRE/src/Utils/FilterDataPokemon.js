
  // Le pido que me filtre el nombre de los pokemon pasándolos 
  // a minúscula y me devuelva los datos
export const FilterDataPokemon = (data, textoInputBusqueda) => {
  const dataFiltrada = data.filter((item) =>
    item.name.toLowerCase().includes(textoInputBusqueda.toLowerCase())
  );
  return dataFiltrada;
};


