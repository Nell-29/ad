import'./spiner'

const template = `
<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
`;

export const PrintSpinner = () => {
  document.getElementById("spinner").innerHTML = template;
};
