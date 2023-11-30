//!-- INTERACION #1
/*Crea una arrow function que tenga dos parametros a y b y 
que por defecto el valor de a = 10 y de b = 5. Haz que la función muestre 
por consola la suma de los dos parametros.*/

const sumaParametros=(a=10,b=5) => {
    console.log(a+b);
}
sumaParametros(5,3);

//1.1 Ejecuta esta función sin pasar ningún parametro

sumaParametros();

//1.2 Ejecuta esta función pasando un solo parametro

sumaParametros(9);

//1.3 Ejecuta esta función pasando dos parametros
 sumaParametros(23,15);

 //!-- INTERACION #2
 /*2.1 En base al siguiente javascript, crea variables en base a las propiedades 
del objeto usando object destructuring e imprimelas por consola. Cuidado, 
no hace falta hacer destructuring del array, solo del objeto.*/

const game = {title: 'The last us 2', gender: ['action', 'zombie', 'survival'], year: 2020}

let = {title,gender,year} =game;
console.log(title,gender,year);

/*2.2 En base al siguiente javascript, usa destructuring para crear 3 variables 
llamadas fruit1, fruit2 y fruit3, con los valores del array. Posteriormente
imprimelo por consola.*/

const fruits = ['Banana', 'Strawberry', 'Orange'];
 
let = [fruit1,fruit2,fruit3]=fruits;
console.log(fruit1,fruit2,fruit3);

/*2.3 En base al siguiente javascript, usa destructuring para crear 2 
variables igualandolo a la función e imprimiendolo por consola.*/

const animalFunction = () => {
    return {name: 'Bengal Tiger', race: 'Tiger'}
};

let animal= {name,race}=animalFunction();
console.log(name,race);

/*2.4 En base al siguiente javascript, usa destructuring para crear las 
variables name y itv con sus respectivos valores. Posteriormente crea 
3 variables usando igualmente el destructuring para cada uno de los años 
y comprueba que todo esta bien imprimiendolo.*/

const car = {name: 'Mazda 6', itv: [2015, 2011, 2020] }

let= {name,itv}=car;
let=[year1,year2,year3]=itv;
console.log(name,itv);
console.log(year1,year2,year3);

//!-- INTERACION #3

//3.1 Dado el siguiente array, crea una copia usando spread operators.
const pointsList = [32, 54, 21, 64, 75, 43]

const newPointslist=[...pointsList];
console.log(newPointslist);

//3.2 Dado el siguiente objeto, crea una copia usando spread operators.
const toys = {name: 'Bus laiyiar', date: '20-30-1995', color: 'multicolor'};
 
const newToys={...toys};
console.log(newToys);

//3.3 Dado los siguientes arrays, crea un nuevo array juntandolos usando 
//spread operatos.
const pointsLis1 = [32, 54, 21, 64, 75, 43];
const pointsLis2 = [54,87,99,65,32];

let newPointslis=[...pointsLis1,...pointsLis2];
console.log(newPointslis);

//3.4 Dado los siguientes objetos. Crea un nuevo objeto fusionando los dos 
//con spread operators.
const toy = {name: 'Bus laiyiar', date: '20-30-1995', color: 'multicolor'};
const toyUpdate = {lights: 'rgb', power: ['Volar like a dragon', 'MoonWalk']}

const newToyss={...toy,...toyUpdate};
console.log(newToyss);

//3.5 Dado el siguiente array. Crear una copia de él eliminando la posición 2 
//pero sin editar el array inicial. De nuevo, usando spread operatos.
const colors = ['rojo', 'azul', 'amarillo', 'verde', 'naranja'];
const newColors=[...colors];
newColors.splice(2,1);
console.log(newColors);

//!-- INTERACION #4

/*4.1 Dado el siguiente array, devuelve un array con sus nombres 
utilizando .map().*/
const users1 = [
	{id: 1, name: 'Abel'},
	{id:2, name: 'Julia'},
	{id:3, name: 'Pedro'},
	{id:4, name: 'Amanda'}
];

let userst=users1.map(function(clave){
return clave.name
})
console.log(userst);
/*4.2 Dado el siguiente array, devuelve una lista que contenga los valores 
de la propiedad .name y cambia el nombre a 'Anacleto' en caso de que 
empiece por 'A'.*/
const users = [
	{id: 1, name: 'Abel'},
	{id:2, name: 'Julia'},
	{id:3, name: 'Pedro'},
	{id:4, name: 'Amanda'}
];

let persons=users.map(users=>{
    users.name[0]=='A'?
    console.log("Ancleto"):
    console.log(users.name)
})
    
/*4.3 Dado el siguiente array, devuelve una lista que contenga los valores 
de la propiedad .name y añade al valor de .name el string ' (Visitado)' 
cuando el valor de la propiedad isVisited = true.*/
const cities = [
	{isVisited:true, name: 'Tokyo'}, 
	{isVisited:false, name: 'Madagascar'},
	{isVisited:true, name: 'Amsterdam'}, 
	{isVisited:false, name: 'Seul'}
];
 let place=cities.map(city=>{
    (city.isVisited===true)?
    console.log(city.name+"(visitado)"):
    console.log(city.name)
 })

 //!-- INTERACION #5

 /*5.1 Dado el siguiente array, utiliza .filter() para generar un nuevo array 
con los valores que sean mayor que 18*/
const ags = [22, 14, 24, 55, 65, 21, 12, 13, 90];
const total =ags.filter(value=>value>18);
console.log(total);

/*5.2 Dado el siguiente array, utiliza .filter() para generar un nuevo array 
con los valores que sean par.*/
const ages = [22, 14, 24, 55, 65, 21, 12, 13, 90];
const resultado = ages.filter(value=>value%2===0);
console.log(resultado);

/*5.3 Dado el siguiente array, utiliza .filter() para generar un nuevo array 
con los streamers que tengan el gameMorePlayed = 'League of Legends'.*/
const streamers1 = [
	{name: 'Rubius', age: 32, gameMorePlayed: 'Minecraft'},
	{name: 'Ibai', age: 25, gameMorePlayed: 'League of Legends'}, 
	{name: 'Reven', age: 43, gameMorePlayed: 'League of Legends'},
	{name: 'AuronPlay', age: 33, gameMorePlayed: 'Among Us'}
];
const newStreamers=streamers1.filter(value=>value.gameMorePlayed=="League of Legends");
console.log(newStreamers);
/*5.4 Dado el siguiente array, utiliza .filter() para generar un nuevo array 
con los streamers que incluyan el caracter 'u' en su propiedad .name. Recomendamos 
usar la funcion .includes() para la comprobación.*/
const streamers2 = [
	{name: 'Rubius', age: 32, gameMorePlayed: 'Minecraft'},
	{name: 'Ibai', age: 25, gameMorePlayed: 'League of Legends'},
	{name: 'Reven', age: 43, gameMorePlayed: 'League of Legends'},
	{name: 'AuronPlay', age: 33, gameMorePlayed: 'Among Us'}
];
const stream=streamers2.filter(streamer=>streamer.name.includes("u"));
console.log(stream);

/*5.5 utiliza .filter() para generar un nuevo array con los streamers que incluyan 
el caracter 'Legends' en su propiedad .gameMorePlayed. Recomendamos usar la funcion 
.includes() para la comprobación.
Además, pon el valor de la propiedad .gameMorePlayed a MAYUSCULAS cuando 
.age sea mayor que 35.*/
const stream2=streamers2.filter(streamer=>streamer.gameMorePlayed.includes("Legends"));
console.log(stream2);
 
const gamer=stream2.map(streamer=>{
    if(streamer.age>35){
        return{...streamer,gameMorePlayed:streamer.gameMorePlayed.toUpperCase()}}
        else{
            return{...streamer}
        }
})
console.log(gamer);

/*5.6 Dado el siguiente html y javascript, utiliza .filter() para mostrar por consola 
los streamers que incluyan la palabra introducida en el input. De esta forma, si 
introduzco 'Ru' me deberia de mostrar solo el streamer 'Rubius'. Si
introduzco 'i', me deberia de mostrar el streamer 'Rubius' e 'Ibai'.
const streamers = [
	{name: 'Rubius', age: 32, gameMorePlayed: 'Minecraft'},
	{name: 'Ibai', age: 25, gameMorePlayed: 'League of Legends'},
	{name: 'Reven', age: 43, gameMorePlayed: 'League of Legends'},
	{name: 'AuronPlay', age: 33, gameMorePlayed: 'Among Us'}
];

<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
             <meta http-equiv="X-UA-Compatible" content="ie=edge">
             <title>Document</title>
</head>
<body>
  <input type="text" data-function="toFilterStreamers"/>
</body>
</html>*/

/*5.7 Dado el siguiente html y javascript, utiliza .filter() para mostrar por consola 
los streamers que incluyan la palabra introducida en el input. De esta forma, si 
introduzco 'Ru' me deberia de mostrar solo el streamer 'Rubius'. Si introduzco 'i', 
me deberia de mostrar el streamer 'Rubius' e 'Ibai'.
En este caso, muestra solo los streamers filtrados cuando hagamos click en el button.
const streamers = [
	{name: 'Rubius', age: 32, gameMorePlayed: 'Minecraft'},
	{name: 'Ibai', age: 25, gameMorePlayed: 'League of Legends'},
	{name: 'Reven', age: 43, gameMorePlayed: 'League of Legends'},
	{name: 'AuronPlay', age: 33, gameMorePlayed: 'Among Us'}
];

<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
             <meta http-equiv="X-UA-Compatible" content="ie=edge">
             <title>Document</title>
</head>
<body>
  <input type="text" data-function="toFilterStreamers"/>
  <button data-function="toShowFilterStreamers">Filter</button>
</body>
</html>*/