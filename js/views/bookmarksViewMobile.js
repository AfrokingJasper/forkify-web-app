import View from "./view.js";
import icons from "url:../../img/icons.svg";
import previewView from "./previewView.js";

class BookmarksViewMobile extends View {
  _parentElement = document.querySelector(".bookmarks-mobile");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";
  _message = "";

  _generateMarkup() {
    // console.log(this._data);

    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

{
  /* <div class="preview__user-generated mr-10">
  <svg class="w-6 h-6">
    <use href="${icons}#icon-user"></use>
  </svg>
</div>; */
}
export default new BookmarksViewMobile();
