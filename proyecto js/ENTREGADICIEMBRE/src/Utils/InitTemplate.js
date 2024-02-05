import  {PrintHeader} from "../Components/Estructura/Header/Header"
import  {PrintMain} from "../Components/Estructura/Main/Main"
import  {PrintFooter} from "../Components/Estructura/Footer/Footer"
import { Listeners } from "../Components/Nav/Nav"

// Llama las funciones que pintan el header, main y footer, adema´s de las funciones
export const Inittemplate =()=>{
PrintHeader();
PrintMain();
PrintFooter();
Listeners();
}

