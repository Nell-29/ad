// crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.



function filterCostum(array, callback) {
    const result = []
    for (let index = 0; index < array.length; index++) {
        if (callback(array[index], index, array)) {
            result.push(array[index])
            
        } 
        
    }
    return result
}

const arregloNum = [21,54,23,41,85];

const filtro = filterCostum(arregloNum,(item,index,array) => item > 23)

console.log(arregloNum);
console.log(filtro);