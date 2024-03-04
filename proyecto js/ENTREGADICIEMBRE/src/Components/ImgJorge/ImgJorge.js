
import "./ImgJorge.css"


// Pinto el botón de logout
const template = () => `
<img id="jorge" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Octicons-sign-out.svg/600px-Octicons-sign-out.svg.png"></img>`;



  // Pinto el botón 
export const PrintImgJorge =()=>{
    document.querySelector("header").innerHTML += template();
 
}


