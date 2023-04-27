import View from "./view.js";

import icons from "url:../../img/icons.svg";
// import Fraction from "fraction.js";
var Fraction = require("fraction.js");
// console.log(Fraction);

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "we could not find that recipe! please try anothr recipe";
  _message = "";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _generateMarkup() {
    return `
    <div class="bg-yellow- h-[50%] md:h-[70%]">
    <div class="flex h-[70%] relative">
    <div class="h-full w-full absolute bg-cover bg-center">
      <img
        src="${this._data.image}"
        alt=""
        class="h-full w-full object-cover object-center"
      />
    </div>
    <div
    class="h-full w-full opacity-25 bg-gradient-to-tr from-green-300 to-green-500"
  ></div>

    <h1
      class="absolute bottom-0 text-center left-[50%] transform -translate-x-20 -skew-y-6 font-bold text-3xl uppercase max-w-xs lg:leading-loose md:-translate-x-36 items-centr"
    >
      <span
        class="bg-gradient-to-r from-green-400 to-green-600 py-1 px-2 md:py-2 md:px-4 lg:py-5 lg:px-8 md:leading-tight span text-xl md:text-2xl lg:text-3xl rounded-xl"
      >
        ${this._data.title}
      </span>
    </h1>
  </div>
    <div class="flex flex-row items-center justify-around h-[30%]">
     <div class="flex justify-between space-x-3">
          <div class="flex items-center space-x-2 p-1">
            <svg
              class="recipe__info-icon h-5 w-5 md:h-6 md:w-6 fill-green-700"
            >
              <use href="${icons}#icon-clock"></use>
            </svg>
            <p class="uppercase text-sm md:text-md">
              <span class="font-bold">${this._data.cookingTime}</span> minutes
            </p>
          </div>
     <div class="flex flex-col md:flex-row space-y-2 items-center md:space-y-0 md:space-x-2 p-1">
            <div class="flex space-x-2">
              <svg
                class="recipe__info-icon h-5 w-5 md:h-6 md:w-6 fill-green-700"
              >
                <use href="${icons}#icon-users"></use>
              </svg>
              <p class="uppercase text-sm text:text-md">
                <span class="font-bold">${this._data.servings}</span> servings
              </p>
            </div> 
        <div class="flex space-x-2">
              <button>
                <svg
                  class="recipe__info-icon h-5 w-5 md:h-6 md:w-6 fill-green-700">
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button> 
                <svg class="recipe__info-icon h-5 w-5 md:h-6 md:w-6 fill-green-700">
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
        </div> 
     <div class="flex items-center space-x-2 p-1">
         
          <button class="bg-green-500 p-2 rounded-full">
            <svg
              class="recipe__info-icon h-5 w-5 md:h-6 md:w-6 stroke-white fill-green-500"
            >
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>
      </div>
    </div> 
    <div class="bg-gray-200 flex flex-col items-center py-5 h-[30%] overflow-y-scroll">
      <h3 class="uppercase text-md md:text-xl font-bold text-green-500">
        Recipe ingredients
      </h3>
      <ul
        class="items-start justify-center px-2 lg:px-16 grid grid-cols-2 w-full "
      > 
    ${this._data.ingredients.map(this._generateMarkupIngredients).join("")}
      </ul>
    </div> 
     <div
      class="flex flex-col items-center py-10 px-2 space-y-5 max-w-xl mx-auto"
    >
      <h2 class="uppercase text-md md:text-xl font-bold text-green-600">
        How to cook it
      </h2>

      <p class="text-center">
        This recipe was carefully designed and tested by
        <span class="font-bold">${this._data.publisher}</span> Please check out
        directions at their website.
      </p>
      <a
      class=""
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <button
        class="py-1 px-3 rounded-full text-white bg-green-400 font-bold hover:bg-green-300 active:bg-green-500 duration-200 uppercase"
      >
        directions &rarr;
      </button>
    </div> 
    </a>
    `;
  }

  _generateMarkupIngredients(ing) {
    return `
  <li class="flex space-x-2 justify-start items-start mt-5">
    <div>
      <svg class="recipe__icon h-5 w-5 fill-green-600 flex-auto">
        <use href="${icons}#icon-check"></use>
      </svg>
    </div>
    <div>
      <span class="font-bold">${
        ing.quantity ? new Fraction(ing.quantity).toFraction(true) : ""
      }</span>
      <span class="recipe-unit">
      ${ing.unit}
      </span>
     ${ing.description}
    </div>
  </li> 
  `;
  }
}

export default new RecipeView();

// {
//   /* <button>
//   <svg class="recipe__info-icon h-5 w-5 md:h-6 md:w-6 fill-green-700">
//     <use href="${icons}#icon-user"></use>
//   </svg>
// </button>; */
// }
