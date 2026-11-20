window.addEventListener("load", () => {
  const frame = document.querySelector("#nl-badge-frame");
  if (frame) {
    frame.style.display = "none";
  }
});
setTimeout(() => {
  document.querySelector("#nl-badge-frame").style.display = "none";
}, 10000);
