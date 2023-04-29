import { async } from "regenerator-runtime";
import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import bookmarksView from "./views/bookmarksView.js";
import resultsViewMobile from "./views/resultsViewMobile.js";
import bookmarksViewMobile from "./views/bookmarksViewMobile.js";
import paginationView from "./views/paginationView.js";
import paginationViewMobile from "./views/paginationViewMobile.js";
import addRecipeView from "./views/addRecipeView.js";

// forkify web app clone 251 to be attended to

import "core-js/stable";
import "regenerator-runtime/runtime";

if (module.hot) {
  module.hot.accept();
}

const menuBtn = document.querySelector("#menu-btn");
const menu = document.querySelector("#menu");
const bookmark = document.querySelector(".bookmark");
const bookmarkList = document.querySelector(".bookmarks-list");
// console.log(menu);

bookmark.addEventListener("click", function (e) {
  e.preventDefault();
  bookmarkList.classList.toggle("hidden");
});

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

    //
    // resultsView.render(model.getSearchResultsPage());
    // resultsViewMobile.render(model.getSearchResultsPage());

    if (!id) return;

    recipeView.renderSpinner();

    // 1) loading recipe
    await model.loadRecipe(id);

    //  2) rendering recipe
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
    bookmarksViewMobile.render(model.state.bookmarks);
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
    resultsView.render(model.getSearchResultsPage());

    // 4 render initial pagination buttons
    paginationView.renderPagination(model.state.search);
  } catch (err) {
    console.error(err);
    throw err;
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
    resultsViewMobile.render(model.getSearchResultsPage());

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

const controlServings = function (newServings) {
  // updaterecie servings (in the state)
  model.updateServings(newServings);

  // update the recipe view
  recipeView.render(model.state.recipe);
  // recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) add or remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // 2) update recipe view
  recipeView.render(model.state.recipe);

  // 3) render bookmarks
  bookmarksView.render(model.state.bookmarks);
  bookmarksViewMobile.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
  bookmarksViewMobile.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // spinner
    addRecipeView.renderSpinner();

    // upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // success message
    addRecipeView.renderMessage();

    // Render bookmsrk view
    bookmarksView.render(model.state.bookmarks);

    // change id in the url
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(`🛑🛑 ${err}`);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(conreolRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  searchView.addHandlerSearch2(controlSearchResults2);
  paginationView.addHandlerClick(controlPagination);
  paginationViewMobile.addHandlerClick(controlPaginationMobile);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();
