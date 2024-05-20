//se usa para unir dos o más arrays. 
//Este método no cambia los arrays existentes,
// sino que devuelve un nuevo array.


function concatCostum (...array) {
    const result =[]
  
for (let i = 0; i < array.length; i++) {
    const element = array[i];
   for (let x =0 ; x < element.length; x++) {
    result.push(element[x]);
    
   }
    

}
return result 
}

const arreglo1 = [2,3,4,5];

const arreglo2 = [6,7,8,9];

const concat = concatCostum(arreglo1,(arreglo2));

console.log(concat);