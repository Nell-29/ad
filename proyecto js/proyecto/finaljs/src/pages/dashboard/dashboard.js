
import{getData} from"../../global/globalState"
import{getInfo} from"../../utils/index"
import { initControler } from "../../utils";
import'./dashboard.css'

const template= () => `<div id="containerDashboard">
<ul>
  <li>
    <figure id="navigatePokemon">
      <img
        src="https://res.cloudinary.com/dxvasvakp/image/upload/v1704552665/0_NsHVyfpJ2k7ixTAd_bcay3e.png"
        alt="go to page pokemon"
      />
      <h2>POKEMON</h2>
    </figure>
  </li>
  <li>
    <figure id="navigateTres">
      <img
        src="https://res.cloudinary.com/dxvasvakp/image/upload/v1704553352/Tic_tac_toe_dm8iyy.svg"
        alt=" go to wacka topo game"
      />
      <h2>Tres en raya</h2>
    </figure>
  <li>
    <figure id="navigateHangman">
      <img
        src="https://res.cloudinary.com/dxvasvakp/image/upload/v1704553276/3vU01hZIomX95xALi7bH1l2OEHFLZYvYsEx0OIjUS1FIPNrIua56phuSd8Fy4Yg9mMM_j3kma9.png"
        alt="go to hangman"
      />
      <h2>HANGMAN</h2>
    </figure>
  </li>
  <li>
  <figure id="navigateTopo">
    <img
      src="https://res.cloudinary.com/dxvasvakp/image/upload/v1704553801/topo_i5oo5d.png"
      alt="go to waka topo"
    />
    <h2>WaKa topo</h2>
  </figure>
  </li>
</ul>
</div>`;


const addEventListeners = () => {
    const navigatePokemon = document.getElementById("navigatePokemon");
        navigatePokemon.addEventListener("click", () => {
        initControler("Pokemon");
});

};

export const PrintTemplateDashboard = () =>{
    document.querySelector("nav").style.display ="flex";
    document.querySelector("main").innerHTML = template();
    
    addEventListeners();

    getInfo();
    getData();
}