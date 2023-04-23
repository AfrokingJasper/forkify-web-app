const menuBtn = document.querySelector("#menu-btn");
const menu = document.querySelector("#menu");
console.log(menu);

menuBtn.addEventListener("click", function (e) {
  e.preventDefault();
  menuBtn.classList.toggle("open");
  menu.classList.toggle("hidden");
  menu.classList.toggle("h-0");
});
