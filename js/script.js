// forkify web app clone 251 to be attended to
import icons from "url:../img/icons.svg";
import "core-js/stable";
import "regenerator-runtime/runtime";
console.log(icons);

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

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// console.log(recipeContainer);
// console.log("text");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const renderSpinner = function (parentEl) {
  const markUp = document.createElement("div");
  markUp.innerHTML = `
   <div class="spinner mx-auto max-w-xs items-center flex justify-center animate-spin">
    <svg class="fill-green-400 w-20">
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div> 
  `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentElement("afterbegin", markUp);
};

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    // 1) loading recipe
    renderSpinner(recipeContainer);

    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    // console.log(res);
    // console.log(data);
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // console.log(recipe);

    //  2) rendering recipe
    const markUp = document.createElement("div");
    markUp.classList.add("h-full");
    markUp.innerHTML = `
    <div class="bg-yellow- h-[50%] md:h-[70%]">
    <div class="flex h-[70%] relative">
    <div class="h-full w-full absolute bg-cover bg-center">
      <img
        src="${recipe.image}"
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
        ${recipe.title}
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
              <span class="font-bold">${recipe.cookingTime}</span> minutes
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
                <span class="font-bold">${recipe.servings}</span> servings
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
          <button>
            <svg
              class="recipe__info-icon h-5 w-5 md:h-6 md:w-6 fill-green-700"
            >
              <use href="${icons}#icon-user"></use>
            </svg>
     </button>
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
        class="items-center justify-center px-2 lg:px-16 grid grid-cols-2 w-full "
      > 
    ${recipe.ingredients
      .map((ing) => {
        return `
      <li class="flex space-x-2 justify-start items-start mt-5">
        <div>
          <svg class="recipe__icon h-5 w-5 fill-green-600 flex-auto">
            <use href="${icons}#icon-check"></use>
          </svg>
        </div>
        <div>
          <span class="font-bold">${ing.quantity}</span>
          <span class="recipe-unit">
          ${ing.unit}
          </span>
         ${ing.description}
        </div>
      </li> 
      `;
      })
      .join("")}
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
        <span class="font-bold">${recipe.publisher}</span> Please check out
        directions at their website.
      </p>
      <a
      class=""
      href="${recipe.sourceUrl}"
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
    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentElement("afterbegin", markUp);
  } catch (err) {
    alert(err);
  }
};

// listening for hash events
["hashchange", "load"].forEach((ev) => window.addEventListener(ev, showRecipe));
// window.addEventListener("hashchange", showRecipe);
// window.addEventListener("load", showRecipe);
