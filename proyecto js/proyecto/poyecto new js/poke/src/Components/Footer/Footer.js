import'./Footer.css'
/* declaro el template y exporto la funcion que pinta */
const template= () =>`<h3><span> LET´S PLAY </span></h3>`;

export const PrintTemplateFooter = () =>{
document.querySelector("footer").innerHTML = template();
};