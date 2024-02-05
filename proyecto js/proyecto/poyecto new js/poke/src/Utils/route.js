import{PrintDashboard,PrintLogin} from"../Pages";


export const initControler = (paginaQueVamosAPintar) => {
    switch (paginaQueVamosAPintar) {
        /*la primera opcion es saber si el usuario esta rn rl local sotorage ,
         si tengo pinto la primera pag principal que es el dashboard y si no pinto login*/
         case undefined:
            localStorage.getItem("user") ? PrintDashboard() : PrintLogin();
            case "Pokemon":
              PrintPagePokemon()
            break;
            case "Dashboard":
                    //funcion que pinta la pag PrintPageDash()
            break;
            case "Topo":
                    // funcion que pinta la pag PrintPageTopo()
            break;
            case"Memory":
            //fubcion que pinta la pag PrintPageMemoryGame()
            break;

            default:
                break;        
    }
};