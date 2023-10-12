//Dado el siguiente javascript, cambia el valor de la propiedad age a 25.
//const character = {name: 'Jack Sparrow', age: 10};
const character = {name: 'Jack Sparrow', age: 10};
console.log( 'Jack Sparrow', push=25);
//Declara 3 variables con los nombres y valores siguientes 
	//firstName = 'Jon'; 
	//lastName = 'Snow'; 
	//age = 24; 
//Muestralos por consola de esta forma: 
	//'Soy Jon Snow, tengo 24 años y me gustan los lobos.'
let firstName;
firstName= 'Jon'; 
let lastName;
lastName= 'Snow'; 
let age;
age= 24; 
console.log('Soy Jon Snow, tengo 24 años y me gustan los lobos.');
//Dado el siguiente javascript, imprime con un console.log la suma del precio de
//ambos juguetes.
//const toy1 = {name: 'Buss myYear', price: 19};
//const toy2 = {name: 'Rallo mcKing', price: 29};
const toy1 = {name: 'Buss myYear', price: 19};
const toy2 = {name: 'Rallo mcKing', price: 29};
console.log(toy1.price+toy2.price);
//Dado el siguiente javascript, actualiza el valor de la variable globalBasePrice a 25000 
//y actualiza la propiedad finalPrice de todos los coches con el valor de su propiedad 
//basePrice más el valor de la variable globalBasePrice.
//let globalBasePrice = 10000;
//const car1 = {name: 'BMW m&m', basePrice: 50000, finalPrice: 60000};
//const car2 = {name: 'Chevrolet Corbina', basePrice: 70000, finalPrice: 80000};
let globalBasePrice;
globalBasePrice= 25000;
const car1 = {name: 'BMW m&m', basePrice: 50000, finalPrice: 60000};
const car2 = {name: 'Chevrolet Corbina', basePrice: 70000, finalPrice: 80000};
finalPriceA=(car1.basePrice+globalBasePrice);
finalPriceB=(car2.basePrice+globalBasePrice);
console.log(finalPriceA);
console.log(finalPriceB);


//let nombre=["nelson","jorge"];
//console.log(nombre[0]+nombre[1]);
//nombre[0]="jorge";
//console.log(nombre[0]+nombre[1]);