import "./figuremorty.css"
 
// genero el html donde voy a pintar con los datos pasados pro variable desde 
// el PrintGallery de Components/PrintRickandmortyPage
const template = (imageFigure, nameFigure) => `
<figure>
    <img src=${imageFigure} alt=${nameFigure}/>
    <h3>${nameFigure}</h3>
</figure>
`;

export const PrintFigureMorty = (name, image) =>{

  (document.getElementById("RickandmortyPage").innerHTML += template(
    image,
    name
  ))};

