import "./main.css"

// Pinto un main general con una imagen, en lugar de añadirle un dashboard
const template = () => `<main>
<img id="ImagenAhorcado" src="https://png2.cleanpng.com/sh/e5502ed75591a757fa359361a2bb40c4/L0KzQYm3WcIxN5Z1eZH0aYP2gLBuTfpifpJ4eARycISweMX0jMUua5J4e9NtaX7qPcT7mfxmNaRtfdd9cz3mg8S6TcVjaWU1fao5N0TpQbS3TsU3OWo4TKI5MUW2R4WAWMI4OmU8UZD5bne=/kisspng-javascript-html5-cascading-style-sheets-css3-5ba40e8074f1c0.561934001537478272479.png"></img>
</main>`;
export const PrintMain = () =>{
document.querySelector("#app").innerHTML += template();
}
 

