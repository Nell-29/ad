import { PrintImgFooter } from "../../ImgFooter/ImgFooter";
import "./footer.css";

// Genero el template HTML, lo pinto y llamo a la función que lanza la imagen del darkmode
const template = () => `<footer>
</footer>
`;
export const PrintFooter = () =>{
document.querySelector("#app").innerHTML += template();
PrintImgFooter()
}
