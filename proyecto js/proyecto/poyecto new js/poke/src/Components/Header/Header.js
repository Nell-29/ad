import { changeColorRGB } from '../../Utils';


import'./Header.css'





 
const template = () => `
   <img
     src="https://res.cloudinary.com/dxvasvakp/image/upload/v1704897097/175861052-botones-de-juego-de-p_C3_ADxeles-interfaz-de-usuario-de-juegos-flechas-del-controlador-de-juegos-y_ucf3oo.jpg"
     alt="title hub game website (app)"
     class="logo"
   />
   <nav>
     <img
       src="https://res-console.cloudinary.com/dxvasvakp/thumbnails/v1/image/upload/v1704808909/ZDliYjU2NjcwOTgzOTlhYzkyNzhiMWM4ODgzN2YzODlfbnNudnZt/grid_landscape"
       alt=" change to style mode page"
       id="changeColor"
     />
     <img
       src="https://res-console.cloudinary.com/dxvasvakp/thumbnails/v1/image/upload/v1704809629/MzIyMTYzNjgtanVnYXItaWNvbm8td2ViLWJvdF9DM19CM25fZzJtbHdj/grid_landscape"
       alt=" navigate to home app"
       id="buttonDashboard"
     />
     <img
       src="https://res.cloudinary.com/dxvasvakp/image/upload/v1703846704/53344360-signo-icono-salir-salir-bot%C3%B3n_nwcple.jpg"
       alt="logout"
       id="buttonLogout"
     />
   </nav>
 `;

 /* aqui hago el escuchhador del evento del boton del cambio de color del fondo. que importo arriba 
 en la funcion ChangeColorRBG*/

 const Listeners= () => {
    
    const changeColor = document.getElementById("changeColor");
      changeColor.addEventListener("click",()=> {
        const colorRGB= changeColorRGB();
         //colorRGB es el color que nos devuelve la funcion
        document.body.style.background = colorRGB;
/* esto es una forma de apuntar el color del fondo del body
se puede apuntar asi porque es el body y no hace falta hacer un querySelector*/
    });
   

    const buttonDashboard = document.getElementById("buttonDashboard");
      buttonDashboard.addEventListener("click",() => { 
        console.log("pinto dashboard");
        initControler("Dashboard");
    });

    const buttonLogout = document.getElementById("buttonLogout");

    buttonLogout.addEventListener("click",() => {
        localStorage.removeItem("user");
      initControler();
    });
 };

  //funcion que exporta y pinta
  export const PrintTemplateHeader= () => {
        document.querySelector("header").innerHTML= template();
        Listeners();
      };
      