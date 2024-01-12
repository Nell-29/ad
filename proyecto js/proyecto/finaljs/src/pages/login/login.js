
import { initControler } from "../../utils/rutas";
import"./login.css";

const template = () =>
 `<div id="containerlogin">  
    <h1 id="titleLogin"> LOGIN </h1> 
    <input type="text" name="username" id="username" /> 
    <button id="buttonLogin"> SEND </button>
 </div>
 `;


// hago una función donde apunto al botón
 const addlisteners= () => {
    const buttonLogin = document.getElementById("buttonLogin");

//creo el evento click en el botón
    buttonLogin.addEventListener("click", () =>{
 //Cojo lo que he escrito en el input y lo guardo en una variable
      const input=document.querySelector("#username")  
      const valueInput= input.value;


// asigno el valor de la variable al localstorage
         localStorage.setItem("username",valueInput) 
      
        initControler();
    });
 };
// una vez que hay valor, lanzo el init, que evaluará si hay valor para
// devolverme esta página o las otras


export const PrintLogin = () => {
    document.querySelector("main").innerHTML = template ();
    document.querySelector("nav").style.display ="none";
    addlisteners();
};