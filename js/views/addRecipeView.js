import View from "./view.js";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");

  _window = document.querySelector(".recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".open-recipe-modal");
  _btnClose = document.querySelector(".close-recipe-modal");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._overlay.classList.toggle("flex");
    this._window.classList.toggle("hidden");
    this._window.classList.toggle("flex");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  _generateMarkup() {}
}

export default new AddRecipeView();