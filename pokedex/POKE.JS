import'./POKE.CSS'


const listaPokemon=document.querySelector("#listaPokemon");

const botonesHeader=document.querySelectorAll("button-header")
const GetAllPokemon = async (Id) => {
    const OptionRequest = {
      method: "GET",
      url: `https://pokeapi.co/api/v2/pokemon/${Id}`,
    };

     (OptionRequest);

 for (let i= 1; i <= 151; i++) {
    fetch(URL+i)
      .then((response) =>response.json())
      .then(Data => mostrarPokemon(Data))
 }

 const mostrarPokemon=(poke)=>{

    let tipos=poke.types.map((type) =>`<p class="${type.type.name} tipo"> ${type.type.name}</p>`);
    tipos=tipos.join('');

    let pokeId=poke.id.tostring();
    if(pokeId.length===1){
        pokeId="00"+pokeId;
    }else if (pokeId.length===2){
        pokeId="0"+pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML =`
    <p class="pokemon-id-back">#${pokeId}</p>
      <div class="pokemon-imagen">
        <img src="${poke.sprites.other["offical-atwork"].front_default}" alt="${poke.name}">
      </div>
      <div class="pokemon-info">
        <div class="nombre-contenedor">
          <p class="pokemon-id">#${pokeId}</p>
          <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
          ${tipos}
        </div>
        <div class="pokemon-stats">
          <p class="stat"> ${poke.height}m</p>
          <p class="stat"> ${poke.weight} kg</p>
        </div>
      </div>`;
      listaPokemon.append(div);
     }

botonesHeader.forEach(boton=>boton.addEventListener("click",(event) => {
    const botonId=event.currentTarget.id;

    listaPokemon.innerHTML="";
    
 for (let i= 1; i <= 151; i++) {
    fetch(URL+i)
      .then((response) =>response.json())
      .then(Data => {
        if(botonId==="ver-todos") {
            mostrarPokemon(Data);
        } else{

        const tipos=Data.types.map(type=>type.type.name);
        if (tipos.some(tipo=>tipo.includes(botonId))){
            mostrarPokemon(Data);
        };
      };

    });
}}))};