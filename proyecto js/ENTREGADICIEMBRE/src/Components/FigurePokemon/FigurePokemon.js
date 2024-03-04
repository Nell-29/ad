import "./FigurePokemon.css"

 
// genero el html donde voy a pintar con los datos pasados por variable desde 
// PrintGallery del Component Pokepai
// El tipo lo paso con la primera en mayúscula
const template = (imageFigure, nameFigure, Id, Type) => `
 <figure class="${Type[0].type.name}" id="PrintPokemon">
     <img id="ImgPokemon" src=${imageFigure} alt=${nameFigure}/>
    <h3>${nameFigure}</h3>
    <h3>${Id}</h3>
    <h3>${Type[0].type.name.charAt(0).toUpperCase() + Type[0].type.name.slice(1)}</h3>
    
 </figure> 
 `;

 export const PrintFigurePokemon = (name, image, Id, Type) =>{

  (document.getElementById("Gallery").innerHTML += template(
     image,
    name, 
    Id,
    Type
   ))
 };

