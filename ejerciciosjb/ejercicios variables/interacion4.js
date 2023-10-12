//Consigue el valor "HULK" del array de avengers y muestralo por consola.
const avengers = ["HULK", "SPIDERMAN", "BLACK PANTHER"];
console.log(avengers)
//Cambia el primer elemento de avengers a "IRONMAN"
//console numero de elementos en el array usando la propiedad correcta de Array.
avengers[1]="IROMAN";
console.log(avengers.length);
console.log(avengers);
//Añade 2 elementos al array: "Morty" y "Summer". 
//Muestra en consola el último personaje del array
const rickAndMortyCharacters = ["Rick", "Beth", "Jerry"];
rickAndMortyCharacters[3]="summer";
rickAndMortyCharacters[4]="morty";
console.log(rickAndMortyCharacters);
//Elimina el último elemento del array y muestra el primero y el último por consola.
const rickAndMortyCharactrs = ["Rick", "Beth", "Jerry", "Morty", "Summer", "Lapiz Lopez"];
rickAndMortyCharactrs.pop();
rickAndMortyCharactrs.shift();
console.log(rickAndMortyCharactrs);
//Elimina el segundo elemento del array y muestra el array por consola.
console.log(rickAndMortyCharactrs);
