import './main.css'

const template = () => `<main>
</main>`;

export const printMain = () => {
    document.querySelector("app").innerHTML += template();
}