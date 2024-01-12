import { getUserio } from "../global/globalState";
import { login } from "../pages/login/login";
import{printPokemonPage} from"../pages/pokemon/pokemon";
import{PrintTemplateDashboard} from"../pages/dashboard/dashboard";


export const initControler = (pagesRender) => {
  
    console.log("soy el usuario",getUserio().name);
  
    switch(pagesRender) {
        case undefined:
            localStorage.getItem(getUserio().name) ? PrintTemplateDashboard():login();
            break;
            case"pokemon":
              printPokemonPage();
              break;
            case "Dashboard":
                PrintTemplateDashboard();
                break;
            case "tres":
                "tres()";
                break;
            case"login":
                login();
                break;
            case "ahorcado":
                "ahorcado()";
                break;
    }
    initControler(pagesRender);
    };
