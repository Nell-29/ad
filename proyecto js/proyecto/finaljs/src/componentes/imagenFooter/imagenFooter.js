import './imagenFooter.css'
//import { changeColorRGB } from '../../utils';
 
const template= () => `<img
src="https://res.cloudinary.com/dq186ej4c/image/upload/v1682684561/changeColor_tat29q.png"
alt=" change to style mode page"
id="changeColor"
/>`

export const PrintImagFooter = () => {
    document.querySelector("footer").innerHTML += template () ;
    //changeColorRGB();
}