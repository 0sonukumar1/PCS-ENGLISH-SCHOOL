const displaybody_input = document.createElement("input");
displaybody_input.setAttribute("type", "number");
displaybody_input.setAttribute("placeholder", "Enter Password");
displaybody_input.style.padding = "0.5rem";
displaybody_input.style.fontSize = "1rem";
displaybody_input.style.borderRadius = "0.5rem";
displaybody_input.style.border = "1px solid #ccc";
displaybody_input.autofocus = true;
displaybody_input.classList.add("displaybody_input");

displaybody_input.style.position = "fixed";
displaybody_input.style.top = "50%";
displaybody_input.style.left = "50%";
displaybody_input.style.transform = "translate(-50%, -50%)";
displaybody_input.style.zIndex = "9999";
displaybody_input.style.padding = "10px";
document.body.prepend(displaybody_input);
const open_colse = document.querySelector(".open_colse");
const body = document.querySelector("body");
open_colse.style.display = "none";
displaybody_input.addEventListener("keyup", () => {
  if (displaybody_input.value == +887326) {
    open_colse.style.display = "block";
    displaybody_input.style.display = "none";
  }
});
