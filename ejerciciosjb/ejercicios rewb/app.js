//!-- INTERACION #1
//Dado el siguiente javascript usa forof para recorrer el array de películas,
// genera un nuevo array con las categorías de las películas e imprime por consola el array de categorías.
/* Ten en cuenta que las categorías no deberían repetirse. Para filtrar las categorías puedes ayudarte de la función .includes()*/

const movies = [
    {title: 'Madaraspar', duration: 192, categories: ['comedia', 'aventura']},
    {title: 'Spiderpan', duration: 122, categories: ['aventura', 'acción']},
    {title: 'Solo en Whatsapp', duration: 223, categories: ['comedia', 'thriller']},
    {title: 'El gato con guantes', duration: 111, categories: ['comedia', 'aventura', 'animación']},
]
const newMovies=[];
     for(const movie of movies) {
        for(const category of movie.categories){
        if(!newMovies.includes(category)){
            newMovies.push(category);
        }
     }
    }
     console.log(newMovies);

    //!-- INTERACION #2
/* Dado el siguiente javascript usa forof y forin para hacer la media del volumen de todos los sonidos favoritos que tienen los usuarios*/
const users = [
    {name: 'Manolo el del bombo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 50},
            rain: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'Mortadelo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 30},
            shower: {format: 'ogg', volume: 55},
            train: {format: 'mp3', volume: 60},
        }
    },
    {name: 'Super Lopez',
        favoritesSounds: {
            shower: {format: 'mp3', volume: 50},
            train: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'El culebra',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 67},
            wind: {format: 'ogg', volume: 35},
            firecamp: {format: 'mp3', volume: 60},
        }
    }
]

let volumenTotal=0;
let sumaSonidos=0;

for(const user of users){
    for(const sound in user. favoritesSounds){
        volumenTotal += user.favoritesSounds[sound].volume;
        sumaSonidos++; 
    }
}

const promedioVolumen= volumenTotal/sumaSonidos;
console.log(promedioVolumen);

 //!-- INTERACION #3
 /* Dado el siguiente javascript usa forof y forin para saber cuantas veces ha sido cada sonido agregado por los usuarios a favorito. 
 Para ello recorre la lista de usuarios y usa forin para recoger el nombre de los sonidos que el usuario tenga como favoritos.
Una vez accedas a ellos piensa en la mejor forma de hacer un conteo de cada vez que ese sonido se repita como favorito en cada usuario.*/
 
const usrs = [
    {name: 'Manolo el del bombo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 50},
            rain: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'Mortadelo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 30},
            shower: {format: 'ogg', volume: 55},
            train: {format: 'mp3', volume: 60},
        }
    },
    {name: 'Super Lopez',
        favoritesSounds: {
            shower: {format: 'mp3', volume: 50},
            train: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'El culebra',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 67},
            wind: {format: 'ogg', volume: 35},
            firecamp: {format: 'mp3', volume: 60},
        }
    },
]

let volumnTotal=0;

let longitud=[];

    for (let user of usrs){
        const{favoritesSounds}=user;
        for(let sonidos in favoritesSounds){
             volumnTotal== favoritesSounds[sonidos].volume;
             longitud.push(volumnTotal);
        }

    }

  let promedio=volumnTotal/longitud.length;
  console.log(promedio);

 //!-- INTERACION #4
 /*   Crea una función llamada findArrayIndex que reciba como parametros un array de textos y 
 un texto y devuelve la posición del array cuando el valor del array sea igual al valor del texto que enviaste como parametro.
  Haz varios ejemplos y compruebalos. */

  let myArray=['Caracol', 'Mosquito', 'Salamandra', 'Ajolote'];
   let text='Salamandra';

    let findArrayIndx=(palabras,texto)=> {
        console.log(palabras.indexOf(texto))
    }

    findArrayIndx(myArray,text);
    //console.log(findArrayIndx);


 //!-- INTERACION #5
 /*Crea una función llamada rollDice() que reciba como parametro el numero de caras que queramos que tenga el dado,
  que deberá silumar el codigo dentro de la función. Como hemos dicho, que la función use el parametro para simular una tirada de dado y retornar el resultado.
   Si no se te ocurre como hacer un numero aleatorio no te preocupes! busca información sobre la función de javascript Math.random();*/

