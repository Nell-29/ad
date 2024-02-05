import{PrintTemplateFooter,PrintTemplateHeader} from "../Components";

export const initTemplate = () => {
    const app = document.getElementById("app");

// creamos los elemento de la estructura//

const footer = document.createElement("footer");
const header = document.createElement("header");
const main  = document.createElement("main");

app.append(footer,header,main);

PrintTemplateFooter();
PrintTemplateHeader();

}