
import { initControler } from "../../Utils/route";
import "./Login.css";

// Pinto el botón y los mensajes del login
const template = () => `
  <div id="containerLogin">
    <h3 id="titleLogin">Usuario</h1>
    <input type="text" name="username" id="username" />
    <button id="buttonLogin">enviar</button>
  </div>
`;

// Genero una función donde apunto al botón
const listeners2 = () => {
  const buttonLogin = document.querySelector("#buttonLogin");
//Al hacer click en el botón
  buttonLogin.addEventListener("click", () => {
//Cojo lo que he escrito en el input y lo guardo en una cariable
    const input = document.querySelector("#username");
    const valueInput = input.value;
// asigno el valor de la variable al localstorage
    localStorage.setItem("usuario", valueInput);
// una vez que hay valor, lanzo el init, que evaluará si hay valor para
// devolverme esta página o las otras
   initControler();
  });   
};

// Lo pinto y llamo a la función
export const PrintLogin = () => {
  document.querySelector("main").innerHTML = template();
  document.querySelector("nav").style.display = "none";
  listeners2();
};
