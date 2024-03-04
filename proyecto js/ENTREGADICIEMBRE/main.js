import './style.css'
import { Inittemplate } from './src/Utils/InitTemplate'
import { initControler } from './src/Utils/route';


// Llamamos a Inittemplate que pinta main,header y footer y lanza los escuchadores
Inittemplate();
// Llama a Initcontroler que lanza el inittemplate una vez que te ahs logado
initControler();

