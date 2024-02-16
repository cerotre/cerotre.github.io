const clicker = document.getElementById("clicker");
const clickCountElement = document.getElementById("clickCount");

let clickCount = 0;

clicker.addEventListener("click", () => {
  clickCount++;
  clickCountElement.textContent = clickCount;
});
