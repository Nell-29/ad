// metodo pop elimina el último elemento de un array y devuelve su valor al método que lo llamó.


function popCostum (array) {
   if (array.length === 0) {
    return undefined;

   }

   const finalElement = array[array.length-1];
   array.length = array.length-1;

   return finalElement;
};

const arreglo = [1,2,3,4];
const resp = popCostum(arreglo);
console.log(resp);
console.log(arreglo);