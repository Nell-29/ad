//! Este código no lo he desarrollado de cero, he partido el que usamos en clase y
//! he quitado cosas, creado otras, camiado otras, lo he probado, adaptado, etc.
//! lo dejo en la entrega porque he trabajado en él bastante tiempo


export const TopoFuncion = ()=>{

  
// inicio todas las funciones a cero y a punto a los cuadrados y a los mensajes en HTML
    let results = 0;
    let hitPosicion = [];
    const square = document.querySelectorAll('.square');
    const score = document.querySelector('#puntuacion');
    let currentTime = document.querySelector('#cuentaatras').textContent;
 
    function randomSquare() {
// Uno de lso div tiene la clase 'mole' con el topo pintado, inicia en el dos
//Aquí le pido que borre la clase del que está
        square.forEach((className) => {
            className.classList.remove('mole');
        });
// Y se la asigne a uno de los 9 botones
    let randomPosition = square[Math.floor(Math.random() *9)];
    randomPosition.classList.add('mole');
// Y el id de la posicion que va a signando, lo guarde en el hitposicion para 
// luego evaluar si cuando haces click, el mouse estaba en la misma posición
    hitPosicion = randomPosition.id;
    }

// A través de un bucle de los cuadrados (clase square)
// Evalua si cuando haces click en uno de esos cuadrados, 
// el mouse estaba en la misma posición que el hitposicion (que tiene la clase square mole)
// y añade un al contador de resultados (results, que luego pintará abajo por variable)
    square.forEach(squareElement => {
        squareElement.addEventListener('mouseup', () => {
            if (squareElement.id === hitPosicion) {
                results = results + 1;
                score.textContent = results;
            }
        });
    });
  
// Inicia  la funcion que mueve el topo randomSquare, y la repite cada medio segundo 
    function moveMole() {
        let timerId = setInterval(randomSquare, 500);
    }
    
    moveMole();
    
    function countdown() {
// Le resta 1 al contador de tiempo según le hemos pasado en el html en #cuentaatras
        currentTime--;
        document.querySelector('#cuentaatras').textContent = currentTime;
// Si el tiempo es igual a cero, para el contador que iniciamos en setinterval y
// pinta una pantalla de mensaje y 
        if(currentTime===0){
            clearInterval(timerId);
       
            document.querySelector("main").innerHTML = `
            <div id="MensajeTopo"><h2 class="ClaseTopo">Fin del Juego</h2>
            <h2 class="ClaseTopo">Topos Descubiertos:  ${results}</h2>
            </div>`;
// Ponemos un mensaje de alerta para poder iniciar la cuenta atrás
        }   if (currentTime===29) {   
            alert('Iniciar Cuenta Atrás')
        }  
    }
// Repite la función countdown (resta 1 al contador de tiempo inciial del HTML) cada segundo
    let timerId = setInterval(countdown, 1000);
    
    
    };






    