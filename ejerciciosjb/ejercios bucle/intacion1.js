//! INTERACION #1.
//Haz un bucle y muestra por consola todos aquellos valores del array que incluyan la palabra "Camiseta".
// Usa la función .includes de javascript.
const products = ['Camiseta de Pokemon','Pantalón coquinero','Gorra de gansta','Camiseta de Basket','Cinrurón de Orión','AC/DC Camiseta']
   
    for (let i=0; i<products.length;i++){
   if (products[i].includes("Camiseta")){
   console.log(products[i]);
  };
}
//! INTERACION #2.
//Comprueba en cada uno de los usuarios que tenga al menos dos trimestres aprobados
// y añade la propiedad isApproved a true o false en consecuencia.compruébalo con un console.log.
const alumns = [
  {name: 'Pepe Viruela', T1: false, T2: false, T3: true}, 
  {name: 'Lucia Aranda', T1: true, T2: false, T3: true},
  {name: 'Juan Miranda', T1: false, T2: true, T3: true},
  {name: 'Alfredo Blanco', T1: false, T2: false, T3: false},
  {name: 'Raquel Benito', T1: true, T2: true, T3: true}
]
for (let i = 0; i < alumns.length; i++) {

  const trimestresAprobados = [alumns[i].T1, alumns[i].T2, alumns[i].T3];
  let aprobadosAcc = 0;

    for (let j = 0; j < trimestresAprobados.length; j++) {
      if (trimestresAprobados[j]) {
        aprobadosAcc++;
      }
    }
  alumns[i].isApproved = aprobadosAcc >= 2 ? true : false;

  }
  console.log(alumns)

  //! INTERACION #3.
  //Usa un bucle forof para recorrer todos los destinos del array. Imprime en un console.log sus valores.
  const placesToTravel = ['Japon', 'Venecia', 'Murcia', 'Santander', 'Filipinas', 'Madagascar']

  for (const destino of placesToTravel) {
    console.log(destino);
}



//! INTERACION #4.
//Usa un for...in para imprimir por consola los datos del alienígena.. 
const alien = {
  name: 'Wormuck',
  race: 'Cucusumusu',
  planet: 'Eden',
  weight: '259kg'
}
for (const onvi in alien) {
  console.log(`${onvi}: ${alien[onvi]}`) 
    }

//! INTERACION #5.
//Usa un bucle for para recorrer todos los destinos del array y elimina los elementos que tengan el id 11 y 40. 
//Imprime en un console log el array. 
const placesToTravl = [{id: 5, name: 'Japan'}, {id: 11, name: 'Venecia'}, 
{id: 23, name: 'Murcia'}, {id: 40, name: 'Santander'}, 
{id: 44, name: 'Filipinas'}, {id: 59, name: 'Madagascar'}]

for(let i=0; i< placesToTravl.length; i++) {

  if(placesToTravl[i].id === 11 || placesToTravl[i].id === 40) {
    placesToTravl.splice(i,1);
  }
}

console.log(placesToTravl);


//! INTERACION #6.
//Usa un bucle for...of para recorrer todos los juguetes y elimina los que incluyan la palabra gato.
//Recuerda que puedes usar la función .includes() para comprobarlo.
const toys = [
  {id: 5, name: 'Buzz MyYear'}, 
  {id: 11, name: 'Action Woman'}, 
  {id: 23, name: 'Barbie Man'}, 
  {id: 40, name: 'El gato con Guantes'},
  {id: 40, name: 'El gato felix'}
  ]
const newToys=[];

  for (const toy of toys) {
    if(!toy.name.includes('gato'))
    { newToys.push(toy);
    console.log(newToys);}}

    //! INTERACION #7.
    //Usa un bucle for...of para recorrer todos los juguetes y añade los que tengan más de 15 ventas .
    //(sellCount) al array popularToys. 
    const popularToys = [];
    const toyss = [
      {id: 5, name: 'Buzz MyYear', sellCount: 10}, 
      {id: 11, name: 'Action Woman', sellCount: 24}, 
      {id: 23, name: 'Barbie Man', sellCount: 15}, 
      {id: 40, name: 'El gato con Guantes', sellCount: 8},
      {id: 40, name: 'El gato felix', sellCount: 35}
    ]
    for(const toy of toyss){
      if (toy.sellCount>15){
        popularToys.push(toyss);
    }}
    console.log(popularToys);