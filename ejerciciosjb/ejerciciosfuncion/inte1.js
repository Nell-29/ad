//Completa la función que tomando dos números como argumento devuelva el más alto.
function sum(numberOne , numberTwo)  
{console.log(Math.max(numberOne,numberTwo));}
sum(1,3);
sum(8,9);
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

//Implemente la función denominada sumNumbers que toma un array de números como argumento .
// devuelve la suma de todos los números de la matriz. 

const numbers = [1, 2, 3, 5, 45, 37, 58];
{ let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
      sum += numbers[i];
  }
  console.log(sum);
  }

  //Calcular un promedio es una tarea extremadamente común. Puedes usar este array para probar tu función:
  const number = [12, 21, 38, 5, 45, 37, 6];
  let count = number.length;
  {values = number.reduce((previous, current) => current += previous);
  values /= count;}
  console.log(values);

  //Crea una función que reciba por parámetro un array y cuando es un valor number lo sume. 
  //y de lo contrario cuente la longitud del string y lo sume. 
  const mixedElements = [6, 1, 'Rayo', 1, 'vallecano', '10', 'upgrade', 8, 'hub'];
  function averageWord(param) {
    // insert code
  }
