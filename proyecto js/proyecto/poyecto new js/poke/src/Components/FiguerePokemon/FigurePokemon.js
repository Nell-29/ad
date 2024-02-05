import "./FigurePokemon.css";


const template = (name, id, image, Type) => `
<figure class="${Type[0].type.name} figurePokemon" id=${id}>
  <img src=${image}alt=${name}/>
  <h3>${name}</h3>
  <p>${id}</p>
</figure>
`;

export const PrintFigurePokemon= (name,image,id,Type) => {
    document.getElementById("galleryPokemon").innerHTML += template(
        name,
        id,
        image,
        Type);
};

export const printGallery = (dataPrint) => {
    document.getElementById("galleryPokemon").innerHTML = "";
    dataPrint.map((pokemon) =>
    PrintFigurePokemon(pokemon.name, pokemon.id, pokemon.image, pokemon.type)
    );
};