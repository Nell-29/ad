

import { PrintLogin } from "../pages/login/login";

import { PrintJuego } from "../pages/juego/juego";
import { printPokemonPage } from "../pages/pokemon/pokemon";
export const initControler =(page) => {
    localStorage.getItem("username")?  PrintJuego():
     PrintLogin();
} 