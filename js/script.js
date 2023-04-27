import { async } from "regenerator-runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

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

///////////////////////////////////////

const conreolRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;

    recipeView.renderSpinner();

    // 1) loading recipe
    await model.loadRecipe(id);

    //  2) rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    alert(err);
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);
    console.log(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};
const controlSearchResults2 = async function () {
  try {
    // 1) get search query
    const query = searchView.getQuery2();

    if (!query) return;

    // 2) load search results
    await model.loadSearchResults(query);

    // 3) render results
    console.log(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};

// listening for hash events

const init = function () {
  recipeView.addHandlerRender(conreolRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  searchView.addHandlerSearch2(controlSearchResults2);
};
init();
