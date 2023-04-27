import View from "./view.js";
import icons from "url:../../img/icons.svg";

class ResultsViewMobile extends View {
  _parentElement = document.querySelector(".list-mobile");
  _errorMessage = "No recipes found for your query! Please try again";
  _message = "";

  _generateMarkup() {
    console.log(this._data);

    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(results) {
    return `
    <li class="">
    <a
      href="#${results.id}"
      class="flex items-center justify-between hover:scale-105 p-2 duration-700"
    >
      <div class="flex items-center justify-center space-x-3">
        <img
          src="${results.image}"
          alt="${results.title}"
          class="w-16 h-16 rounded-full"
        />
        <div>
          <h3 class="text-md text-green-700 uppercase line-clamp-1">
            ${results.title}
          </h3>
          <p class="uppercase text-sm text-black line-clamp-1">
            ${results.publisher}
          </p>
        </div>
      </div>
      
    </a>
  </li> 
    `;
  }
}

{
  /* <div class="preview__user-generated mr-10">
  <svg class="w-6 h-6">
    <use href="${icons}#icon-user"></use>
  </svg>
</div>; */
}
export default new ResultsViewMobile();
