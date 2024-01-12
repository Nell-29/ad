import"./figuraPokemon.css"


const template =(imageFigure, nameFigure,Id,Type) => `
<figure class="${Type[0].type.name}" id="PrintPokemon">
<img id="ImagPoke" src=${imageFigure}alt=${nameFigure}/>
<h3>${nameFigure}</h3>
<h3>${Id}</h3>
<h3>${Type[0].type.name.charAt(0).toUpperCase()+ Type[0].type.name.slice(1)}</h3>

</figure>`;

export const PrintFigurePoke= (name,image,id,Type) =>{
    (document.getElementById("gallery").innerHTML += template(image,name,id,Type))
};