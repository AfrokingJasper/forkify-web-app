import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

// forkify web app clone 251 to be attended to

import "core-js/stable";
import "regenerator-runtime/runtime";

const menuBtn = document.querySelector("#menu-btn");
const menu = document.querySelector("#menu");
// console.log(menu);

menuBtn.addEventListener("click", function (e) {
  e.preventDefault();
  menuBtn.classList.toggle("open");
  menu.classList.toggle("hidden");
  menu.classList.toggle("h-0");
});

const recipeContainer = document.querySelector(".recipe");

// console.log(recipeContainer);
// console.log("text");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const conreolRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    recipeView.renderSpinner();

    // 1) loading recipe
    await model.loadRecipe(id);

    //  2) rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// listening for hash events

const init = function () {
  recipeView.addHandlerRender(conreolRecipes);
};
init();
