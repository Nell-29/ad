import {getUserData} from"../../global/globalState"
import { setUserData } from '../../global/globalState'

import'./cartasPoke.css'

export const cardsPoke = (data) => {
    
  let appUser= getUserData();

    document.getElementById("galleryPokemon").innerHTML = "";

    data.forEach((pokemon) => {
        const classCustonType= `"figurePokemon${pokemon.type[0].type.name}"`;

        const templateFigure =`<figure class=${classCustonType} id=${pokemon.id}>
        <img src=${pokemon.image} alt=${pokemon.name} />
        <h2>${pokemon.name}</h2>
         <span class="material-symbols-outlined ${
            appUser.fav.includes(pokemon.id.toString()) ? "like" : ""
         }"> favorite </span>
        </figure>`;

        document.getElementById("galleryPokemon").innerHTML += templateFigure;
        addListeners(data);
    });
};
const addListeners = (data) => {
    let appUser= getUserData (data);

    const spanAll= document.querySelectorAll("span");
     spanAll.forEach((span) => {
      span.addEventListener("click",(e) => {
        if(appUser.fav.includes(e.target.parentNode.id)){
            let appUser = getUserData();

            let newFavArray= [];

            appUser.fav.forEach((id)=> {
                if (e.target.parentNode.id !=id)
                newFavArray.push(id);
            });
            setUserData({
                ...appUser,
                fav:newFavArray,
        });
        span.classList.toggle("like");

      } else{
        let appUser= getUserData();
        appUser.fav.push(e.target.parentNode.id);
        setUserData(appUser);

        span.classList.toggle("like");
      }
     });
  });
};

/*Para corregir estos problemas, se deben realizar los siguientes cambios:
Reemplazar data.map por data.forEach.
Eliminar las comillas dobles adicionales en classCustonType.
Utilizar textContent para establecer texto y createElement junto con appendChild para construir y añadir elementos al DOM de manera segura.
Asegurarse de que los atributos HTML en templateFigura estén entre comillas.
Llamar a getUserData una sola vez por función y reutilizar el valor.
Mover la llamada a addListeners fuera del bucle para que solo se ejecute una vez después de que todos los elementos se hayan agregado al DOM.
Convertir explícitamente los tipos al comparar IDs, por ejemplo, usando toString() o parseInt() según sea necesario.*/

