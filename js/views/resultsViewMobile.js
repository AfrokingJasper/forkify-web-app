import View from "./view.js";
import icons from "url:../../img/icons.svg";
import previewView from "./previewView.js";

class ResultsViewMobile extends View {
  _parentElement = document.querySelector(".list-mobile");
  _errorMessage = "No recipes found for your query! Please try again";
  _message = "";

  _generateMarkup() {

    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

// {
//   /* <div class="preview__user-generated mr-10">
//   <svg class="w-6 h-6">
//     <use href="${icons}#icon-user"></use>
//   </svg>
// </div>; */
// }
export default new ResultsViewMobile();
