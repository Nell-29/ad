import { PrintImgJorge } from "../../ImgJorge/ImgJorge";
import { PrintNav } from "../../Nav/Nav";
import "./Header.css"

// Pinto el título del header, le añado los botones de la nav y el botón del logout
const template = () => `<header>
<a id="titulo" href="main.css">
<h1 >Ejercicios Jorge</h1>
</a>
</header>`;

export const PrintHeader = () =>{
document.querySelector("#app").innerHTML = template();
PrintNav();
PrintImgJorge();
}
 


