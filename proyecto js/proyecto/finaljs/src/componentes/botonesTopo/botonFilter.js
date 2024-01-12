import{filterPokemon} from"../../utils";
import'./botonFilter.css'

export const PrintButton = (types) => {
types.forEach((type) => {
    const buttonType= `<button class="botonFilter ${type}">
    ${type}
    </button>`;
    const containerFilter=document.getElementById("filterButton");
    containerFilter.innerHTML += buttonType;
});

addlisteners(types);
};

const addlisteners=(types) => {
    types.forEach((type)=> {
        const buttonType= document.querySelector(`.${type}`);
        buttonType.addEventListener("click",(e)=>{
            
            filterPokemon(type,"type");
        });
    });
};


