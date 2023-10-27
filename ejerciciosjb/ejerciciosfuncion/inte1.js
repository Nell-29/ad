//! interacion º1.
//Completa la función que tomando dos números como argumento devuelva el más alto.
function sum(numberOne , numberTwo)  
{console.log(Math.max(numberOne,numberTwo));}
sum(1,3);
sum(8,9);
//! interacion º2.
//Completa la función que tomando un array de strings como argumento devuelva el más largo
//caso de que dos strings tenga la misma longitud deberá devolver el primero.
const avengers = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.'];
let findLongestWord="";
let numberWord=0;
avengers.forEach((superHeroName,index)=> {
     if (superHeroName.length>numberWord) {
      findLongestWord=superHeroName;
      numberWord =superHeroName.length;
     }}
)
console.log(findLongestWord);
//! interacion º3.
//Implemente la función denominada sumNumbers que toma un array de números como argumento .
// devuelve la suma de todos los números de la matriz. 

const numbers = [1, 2, 3, 5, 45, 37, 58];
{ let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
      sum += numbers[i];
  }
  console.log(sum);
  }
//! interacion º4.
  //Calcular un promedio es una tarea extremadamente común. Puedes usar este array para probar tu función:
  const number = [12, 21, 38, 5, 45, 37, 6];
  let count = number.length;
  {values = number.reduce((previous, current) => current += previous);
  values /= count;}
  console.log(values);
//! interacion º5.
  //Crea una función que reciba por parámetro un array y cuando es un valor number lo sume. 
  //y de lo contrario cuente la longitud del string y lo sume. 
  const mixedElements = [6, 1, 'Rayo', 1, 'vallecano', '10', 'upgrade', 8, 'hub'];

  function sumMixedElements(param)
  {
    const nuevoArray=[];
    for (let i = 0; i < param.length; i++)
    {
    (typeof param[i]=="number")?
    nuevoArray.push (param[i]): 
      nuevoArray.push(param[i].length)
    }
  
    let totalMixed=0;
    for(let k of nuevoArray) {totalMixed+=k;
    console.log (totalMixed)}}
  
  sumMixedElements(mixedElements)
  
  
  //METEODO 2
  
  function sumMixedElements2(param)
  {
    const nuevoArray=[];
    for (var i = 0; i < param.length; i++)
    {
    (typeof param[i]=="number")?
    nuevoArray.push (param[i]): 
      nuevoArray.push(param[i].length)
    }
  
  let sum = 0;
  for(const value of nuevoArray)
  {
    sum += value
  }console.log(sum)}
  
  
  sumMixedElements2(mixedElements)
//! interacion º6.
 // Crea una función que reciba por parámetro un array y compruebe si existen elementos duplicados, 
  //en caso que existan los elimina para retornar un array sin los elementos duplicados. 

  const duplicates = [
    'sushi',
    'pizza',
    'burger',
    'potatoe',
    'pasta',
    'ice-cream',
    'pizza',
    'chicken',
    'onion rings',
    'pasta',
    'soda'
  ];
    function removeDuplicates(param)  {
      return param.filter((value,index)=>param.indexOf(value) === index);
      }
      console.log(removeDuplicates(duplicates));
      
      //! interacion ª7.
      //Crea una función que reciba por parámetro un array y el valor que desea comprobar que existe dentro del array.
      //comprueba si existe el elemento, en caso que existan nos devuelve un true y la posición de dicho elemento y por la contra un false.

      const nameFinder = [
        'Peter',
        'Steve',
        'Tony',
        'Natasha',
        'Clint',
        'Logan',
        'Xabier',
        'Bruce',
        'Peggy',
        'Jessica',
        'Marc'
      ];

      function finderName(param,palabra) {
        param.includes(palabra)?
        console.log(`${param.includes(palabra)} ${param.indexOf(palabra)}`):
        console.log("false");
      }
        
      finderName(nameFinder,'Peggy');
      //const finderName (param) => {(nameFinder.includes("logan")? console.log(nameFinder.length):console.log("falso");
     
      //! interacion ª8
      //Crea una función que nos devuelva el número de veces que se repite cada una de las palabras que lo conforma.
      
 const counterWords = [ 'code', 'repeat', 'eat','sleep','code', 'enjoy','sleep','code', 'enjoy','upgrade', 'code'];
        let repeatCounter =(word) => {
         const wordCount={};
         counterWords.forEach((word)=>{
          if (wordCount[word]){
          wordCount[word]++;
         } else{ 
           wordCount[word] = 1;
         } 
         });
         console.log(wordCount);}
         repeatCounter(counterWords);