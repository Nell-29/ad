import"./login.css";
import { initControler } from "../../Utils/route";

const template = () => `<div id="containerLogin">  
<h1 id="titleLogin"> LOGIN </h1> 
<input type="text" name="username" id="username" /> 
<button id="buttonLogin"> SEND </button>
</div>
`;


// hago una función donde apunto al botón
const listeners = () => {
const buttonLogin = document.getElementById("buttonLogin");

//creo el evento click en el botón
buttonLogin.addEventListener("click", () =>{
//Cojo lo que he escrito en el input y lo guardo en una variable
  const input = document.getElementById("username")  
  const valueInput = input.value;


// asigno el valor de la variable al localstorage
     localStorage.setItem("user",valueInput) 
  
    initControler();
});
};
// una vez que hay valor, lanzo el init, que evaluará si hay valor para
// devolverme esta página o las otras


export const PrintLogin = () => {
   document.querySelector("main").innerHTML = template ();
   document.querySelector("nav").style.display ="none";
// esto es para wue no me aparezca la nav hasta que no este logado
   listeners();
};

