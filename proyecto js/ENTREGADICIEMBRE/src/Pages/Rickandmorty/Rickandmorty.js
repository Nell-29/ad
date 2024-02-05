
  import { PrintFigureMorty } from "../../Components/Figure/figuremorty";
  import { MapeoData } from "../../Utils/MapeodataRickandmorty";  
  import "./Rickandmorty.css/";


  const template = () => `<div id="RickandmortyPage">
  </div>`;
  
// Cojo los datos del service y llamo a la función que lo pinta, mintroduciéndole los datos por 
// opciones (Data)
  const GetData = async () => {
    const Data = await MapeoData();
    PrintGallery(Data);
  };
  
// hago un bucle tipo map de la data py llamo a la función que pinta las figuras
// y les paso los valores de  name y image del json del que hago el bucle
  const PrintGallery = (Data) => {
 
    Data.map((item) => PrintFigureMorty(item.name, item.image));
  };
  
  // Pinto la pagina y los datos
  export const PrintRickandmortyPage = () => {
    document.querySelector("main").innerHTML = template();
    GetData();
  }; 



