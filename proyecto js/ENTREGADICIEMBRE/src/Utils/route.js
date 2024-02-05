

import { PrintLogin } from "../Pages/Login/Login";
import { Inittemplate } from "./InitTemplate";

// evalua si local storage tiene valor en usuario. Si tiene, lanza el initemmplate
// con las pantallas, si no, la página de login
export const initControler = (pagina) => {

          localStorage.getItem("usuario") ? Inittemplate() : PrintLogin();

      }

    