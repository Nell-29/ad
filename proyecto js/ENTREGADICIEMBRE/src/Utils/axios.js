
// Llamo a la librería axios
// Esto lo tengo copiado, solo sé que hace una función en el options1,
// espera la respuesta
// luego entrega la data de la respuesta
// tiene un control de errores
import axios from "axios";

export const AxiosUtil = async (options1) => {
return await axios.request(options1).then((respuesta) => respuesta.data).catch((error1) => error1)
}




