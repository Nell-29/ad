import { PrintTemplateFooter,PrintTemplateHeader } from "../componentes/estructura";

/* invoco las funciones que pintan*/
export const initTemplate = () => {
  const app = document.getElementById("app");
  
// creamos los elementos de la estructura.
  
   const header = document.createElement("header");
   const main = document.createElement("main");
   const footer = document.createElement("footer");
  
   app.append(header,main,footer);

    PrintTemplateHeader();
    PrintTemplateFooter();

};
