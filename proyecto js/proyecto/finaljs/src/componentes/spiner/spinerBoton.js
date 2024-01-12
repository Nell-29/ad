import"./spinerBoton.css";

const template=()=>
`<div class="containerSpinnerButton>
<div class="Ids-ripple">
   <div></div>
   <div></div>
   </div>
   <h2> Cargando Filtros</h2>
</div>`;

export const PrintSpinner=()=>{
    document.getElementById("spinnerButtonFilter").innerHTML=template();
};