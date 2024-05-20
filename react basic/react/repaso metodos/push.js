

// El método push() añade uno o más elementos al final de un array 
// añade uno o más elementos
// Devuelve la nueva longitud del array.

function pushCostom(array, ...element) {
    for (let index = 0; index < element.length; index++) {
        array[array.length] = element[index]
    }
    return array.length
}

const arreglo = ["perro","gato","pajaro"]
console.log(arreglo);
const resp = pushCostom(arreglo,"perico")
console.log(arreglo);
console.log(resp);

module.exports = {pushCostom};