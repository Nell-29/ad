

import { PrintLogin } from "../pages/login/login";

import { PrintJuego } from "../pages/juego/juego";
export const initControler =(page) => {
    localStorage.getItem("username")?  PrintJuego():
     PrintLogin();
} 