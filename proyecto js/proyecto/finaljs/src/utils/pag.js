
import { cardsPoke} from "../componentes";
export const Paginacion = (data,numberElement) => {


    const longitud= data.length;
    const numberDigitOfPage= longitud/ numberElement;

    document.getElementById("paginacion").innerHTML = "";

    if (numberDigitOfPage > 1) {
        for (let i=0; i< numberDigitOfPage; i++) {
            const botonNumero= document.createElement("button");
            botonNumero.setAttribute("class", `${i+1} buttonPaginacion`);
            botonNumero.innerHTML = i +1;

            document.getElementById("paginacion").appendChild(botonNumero);

            addEventListener(botonNumero,data,numberElement,i);
    }

    const BotonesTodos = document.querySelectorAll(".buttonPaginacion");
    BotonesTodos.forEach((pag)=> {
        pag.style.border ="solid 3px #1b19196d";
    });
    BotonesTodos[0].style.border = "solid 3px #8cacd2";
    BotonesTodos[0].style.color = "#b3e5c699";
}

cardsPoke(data.slice(0,numberElement));

};

const addlisteners = (botonNumero,data,numberElement,i) => {

    botonNumero.addEventListener("click",() => {
        console.log("entro");


        const BotonesTodosPagina= document.querySelectorAll(".buttonPaginacion");
       
        BotonesTodosPagina.forEach((pag) => {
            pag.style.border ="solid 3px #1b19196d";
        });

        botonNumero.style.border = "solid 3px #8cacd2";
        botonNumero.style.border ="#b3e5c699";

        const fin = (i + 1) * numberElement;
        const inicio = fin - numberElement < 0 ? 0: fin - numberElement;

        cardsPoke(data.slice(inicio,fin));


    });
};