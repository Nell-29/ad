import "./ImgFooter.css"
import { DarkModeFuncion } from "../../Utils/DarkMode";

// Añado la imagen del DarkMode y la función que la desencadena
const template = () => `
<img id="DarkMode" src="https://www.hp.com/us-en/shop/app/assets/images/uploads/prod/What%20is%20Dark%20Mode%20and%20How%20to%20Turn%20it%20On%20or%20Off1648514558189227.jpg"></img></a>
`


export const PrintImgFooter = () => {
document.querySelector("footer").innerHTML+= template ();
DarkModeFuncion()
}





