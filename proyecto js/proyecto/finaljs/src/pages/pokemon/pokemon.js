import'./pokemon.css'

const template = () =>
  `
  <div id="pokemon">
    <div id="containerFilter">
      <div id="spinnerButtonFilter"></div>
      <div id="filterButton"></div>
      <input
        type="text"
        id="inputPokemon"
        placeholder="Busca tu pokemon favorito"
      />
    </div>
    <div id="paginacion"></div>
    <div id="spinner"></div>
    <div id="galleryPokemon"></div>
  </div>
`;

const getDataService= async () =>{
  PrintSpiner();
  const Data= await getDataPokemonB();

  const types=typePOkemon(Data);
  
  PrintSelectTypePOkemom(types,Data);

  listeners(Data);
  console.log(Data);
  printGallery = (Data);
  document.getElementById("spinner").innerHTML="";
};

export const printGallery=(dataPrint) =>{
  document.getElementById("galleryPokemon").innerHTML="";
  dataPrint.map((pokemon)=>
  printFigurePokemon(pokemon.name,pokemon.id,pokemon.image,pokemon.type) 
  );
};

const listeners=(totalData)=>{
  const inputPokemon=document.getElementById("inputPokemon");

  inputPokemon.addEventListener("input",(e) =>{
    const filterPokemon=filterPokemon(totalData,e.target.value);
    printGallery(filterPokemon);
  });
};

export const printPokemonPage=()=>{
  document.querySelector("main").innerHTML=template();
  getDataService();
};
























/*const listaPokemon=document.querySelector("#listaPokemon");
 let url="https://pokeapi.co/api/v2/pokemon/";

 for (let i= i; i <=151; i++) {
    fetch(URL+i)
      .then((response) =>response.json())
      .then(Data => mostrarPokemon(Data))
 }

 const mostrarPokemon(poke)=>{
    const div=document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML=`
    <p class="pokemon-id-back">#${poke.id}</p>
      <div class="pokemon-imagen">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" 
      lt="Pikachu">
      </div>
      <div class="pokemon-info">
        <div class="nombre-contenedor">
          <p class="pokemon-id">#${poke.id}</p>
          <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
          <p class="tipo"> Electric</p>
          <p class="tipo"> Fighting</p>
        </div>
        <div class="pokemon-stats">
          <p class="stat"> 3 m</p>
          <p class="stat"> 5 kg</p>
        </div>
      </div>`;
      listaPokemon.append(div);
 }*/
