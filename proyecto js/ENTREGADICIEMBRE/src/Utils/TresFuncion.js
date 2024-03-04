export const TresFuncion = () => {

// Inicio todas las variables a Cero
    let Turno = 0;
const Casillas = [];
let ColorGanador = ""

// Genero la función del cambio de color del tablero
const BotonPulsado = (EventoClick) => {

// Le voy añadiendo 1 al turno
    Turno++;
//Añado al boton el 
    const Boton1 = EventoClick.target;

// Si el resto de la division del turno entre dos es cero, es true, 
//el turno es par (EMPEZANDO DEN CERO)
// y pinta el borde y el fonde de gris
// si el resto es disitnto a cero, el valor es false y pinta de blanco
    const CambioColorFondo = (Turno % 2) ?
    '#737e8d' : 'white'
    Boton1.style.backgroundColor = CambioColorFondo;
    const CambioColorBorde = (Turno % 2) ?
    'solid white' : 'solid #737e8d'  
    Boton1.style.border = CambioColorBorde;

// Hago un switch para poder mostrar el siguiente mensaje con un color 
// legible en español
   ColorGanador = (CambioColorFondo=='#737e8d')?"Gris":"Blanco"
   switch (ColorGanador){
    case '#737e8d':'Gris';
    break;
    default: 'Blanco'
}
// Si la función ganador es true, pinta en el main un mensaje
   if(Ganador())  document.querySelector("main").innerHTML = `
   <div id="MensajeTresEnRaya"><h2 class="ClaseTres">Fin del Juego</h2>
   <h2 class="ClaseTres">Color Ganador:  ${ColorGanador}  </h2>
   </div>`;
}

// Función que evalúa si tres casillas tienen el mismo color 
// Estableciendo como valores de las casillas, en este orden,
// 0 1 2
// 3 4 5
// 6 7 8
const Ganador = () =>{
    if(Casillas[0] == Casillas[1] && Casillas[0] == Casillas[2] 
        && Casillas[0]){
            return true;
        } else if
        (Casillas[3] == Casillas[4] && Casillas[3] == Casillas[5] 
            && Casillas[3]){
                return true;
            }else if
            (Casillas[6] == Casillas[7] && Casillas[6] == Casillas[8] 
                && Casillas[6]){
                    return true;
                }else if
                (Casillas[0] == Casillas[3] && Casillas[0] == Casillas[6] 
                    && Casillas[0]){
                        return true;
                    }else if
                    (Casillas[1] == Casillas[4] && Casillas[1] == Casillas[7] 
                        && Casillas[1]){
                            return true;
                        }else if
                        (Casillas[2] == Casillas[5] && Casillas[2] == Casillas[8] 
                            && Casillas[2]){
                                return true;
                            }else if
                            (Casillas[0] == Casillas[4] && Casillas[0] == Casillas[8] 
                                && Casillas[0]){
                                    return true;
                                }else if
                                (Casillas[2] == Casillas[4] && Casillas[2] == Casillas[6] 
                                    && Casillas[2]){
                                        return true;
                                    }return false
}
// Apunto a los botones y con un bucle les añado el evento click que lanzará,
// a cada click el cambio de color
document.querySelectorAll('.BotonTres').forEach(
    (cuadro1) => cuadro1.addEventListener('click', 
    (EventoClick)=> BotonPulsado(EventoClick)));
}
