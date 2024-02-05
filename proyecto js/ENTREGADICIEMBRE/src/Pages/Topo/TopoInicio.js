import { PrintTopoPage } from "./Topo";

// Pinto una página inicial con un botón, que al pinchar, llama a la función que imprime
// la página del juego del topo

  const template = () => `
  
      <button id="TopoInicio" class="btn-topo">Iniciar Juego</button>
  `;
   
  
  export const Listeners = () =>{
  
      const PokeApi = document.querySelector("#TopoInicio");
      PokeApi.addEventListener("click", () =>{
          PrintTopoPage();
      })};
      
  
  export const PrintTopo =()=>{
      document.querySelector("main").innerHTML = template();
      Listeners()
  }
  