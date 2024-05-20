// crea un nuevo array con los resultados de la llamada a la función indicada aplicados
// a cada uno de sus elementos.

function mapCostum (array, callback) {
const result = []
 for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i],i,array));
    
 }

return result
}

const arregloNum = [3,4,10,29,85];
const maps = mapCostum(arregloNum,(item, index, array) => item -2);
console.log(arregloNum);
console.log(maps);
