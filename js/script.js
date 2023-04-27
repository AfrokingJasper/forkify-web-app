import { async } from "regenerator-runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import resultsViewMobile from "./views/resultsViewMobile.js";
import paginationView from "./views/paginationView.js";
import paginationViewMobile from "./views/paginationViewMobile.js";

// forkify web app clone 251 to be attended to

import "core-js/stable";
import "regenerator-runtime/runtime";

// if (module.hot) {
//   module.hot.accept();
// }

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
    resultsView.renderSpinner();
    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search results
    await model.loadSearchResults(query);

    // 3) render results
    resultsView.render(model.getSearchResultsPage(3));

    // 4 render initial pagination buttons
    paginationView.renderPagination(model.state.search);
  } catch (err) {
    console.error(err);
  }
};
const controlSearchResults2 = async function () {
  try {
    resultsViewMobile.renderSpinner();
    // 1) get search query
    const query = searchView.getQuery2();

    if (!query) return;

    // 2) load search results
    await model.loadSearchResults(query);

    // 3) render results
    resultsViewMobile.render(model.getSearchResultsPage(2));

    // 4) render initial pagination buttons
    paginationViewMobile.renderPagination(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

// listening for hash events

const controlPagination = function (gotoPage) {
  // 1) render new results
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // 2) render new pagination buttons
  paginationView.renderPagination(model.state.search);
  console.log(gotoPage);
};
const controlPaginationMobile = function (gotoPage) {
  // 3) render new mobile results
  resultsViewMobile.render(model.getSearchResultsPage(gotoPage));

  // 4) render new movile pagination buttons
  paginationViewMobile.renderPagination(model.state.search);
};

const controlServings = function () {
  // updaterecie servings (in the state)
  model.updateServings(6);

  // update the recipe view
};

const init = function () {
  recipeView.addHandlerRender(conreolRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  searchView.addHandlerSearch2(controlSearchResults2);
  paginationView.addHandlerClick(controlPagination);
  paginationViewMobile.addHandlerClick(controlPaginationMobile);
};
init();
