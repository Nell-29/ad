import { getUserio } from "../global/globalState";
import{ PrintLogin} from "../pages/login/login";
import{printPokemonPage} from"../pages/pokemon/pokemon";
import{PrintTemplateDashboard} from"../pages/dashboard/dashboard";
import { PrintJuego } from "../pages/juego/juego";


export const initControler = (pagesRender) => {
  
            localStorage.getItem("username") ? PrintTemplateDashboard():PrintJuego();
            PrintLogin(); getUserio(); printPokemonPage();

           /* break;
            case"pokemon":
              printPokemonPage();
              break;
            case "Dashboard":
                PrintTemplateDashboard();
                break;
            case "juego":
                PrintJuego();
                break;
            case"login":
                PrintLogin();
                break;
            case "ahorcado":
                "ahorcado()";
                break;*/
    
    initControler(pagesRender);
    };
