
import "./imagenNell.css"


// Pinto el botón de logout
const template = () => `
<img id="nell" src="https://res.cloudinary.com/dxvasvakp/image/upload/v1703846704/53344360-signo-icono-salir-salir-bot%C3%B3n_nwcple.jpg"></img>`;



  // Pinto el botón 
export const PrintImgNell =()=>{
    document.querySelector("header").innerHTML += template();
 
}
