import{printPokemonPage} from"../Pokemon/pokemon";

const listeners = () =>{
    const navigatePokemon = document.getElementById("navigatePokemon");
    navigatePokemon.addEventListener("click",() => {
        initControler("Pokemon");
    });
};

export const printDashboard = () => {
    document.querySelector("nav").style.display = "flex";
    document.querySelector("main").innerHTML = template();
    listeners();
};