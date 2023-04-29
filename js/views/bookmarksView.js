import View from "./view.js";
import icons from "url:../../img/icons.svg";
import previewView from "./previewView.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks-list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";
  _message = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    console.log(this._data);

    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarksView();

// {
//   /* <div class="preview__user-generated md:mr-5 lg:mr-10">
//   <svg class="w-6 h-6">
//     <use href="${icons}#icon-user"></use>
//   </svg>
// </div>; */
// }
