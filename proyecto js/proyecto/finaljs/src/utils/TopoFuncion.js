 
export const funcionTopo = () =>{
    let results= 0;
    let hPosicion = [];
    const square = document.querySelectorAll('.square');
    const score = document.querySelector('#anotacion');
    let currentTime = document.querySelector('#cuenta').textContent;

    const randomSquare = () =>{
        square.forEach((className) =>{
            className.classList.remove('mole');
        });

        let randonPosition= square[Math.floor(Math.random()*9)];
        randonPosition.classList.add('mole');

        hPosicion = randonPosition.id;
    }


    square.forEach(squareElement => {
        squareElement.addEventListener('mouseup',() =>{
            if( squareElement.id==hPosicion){
                results= results+1;
                score.textContent = results ;
            }
        });
    });
}