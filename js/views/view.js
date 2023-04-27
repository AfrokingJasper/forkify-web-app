import icons from "url:../../img/icons.svg";

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markUp = document.createElement("div");
    markUp.classList.add("h-full");
    markUp.innerHTML = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentElement("afterbegin", markUp);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markUp = document.createElement("div");
    markUp.innerHTML = `
     <div class="spinner mx-auto max-w-xs items-center flex justify-center animate-spin">
      <svg class="fill-green-400 w-20">
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
    `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentElement("afterbegin", markUp);
  }
  renderError = function (message = this._errorMessage) {
    const markUp = document.createElement("div");
    markUp.innerHTML = `
    <div  class="message flex space-x-2 items-center mt-10 mx-auto max-w-xs px-2 md:max-w-sm">
      <div>
        <svg class="h-10 w-10 fill-green-600">
        <use href="${icons}#icon-alert-triangle"></use>
        </svg>
       </div>
       <p>${message}</p>
     </div>
    `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentElement("afterbegin", markUp);
  };

  renderMessage(message = this._message) {
    const markUp = document.createElement("div");
    markUp.innerHTML = `
    <div
    class="message flex space-x-2 items-center mt-10 mx-auto max-w-xs px-2 md:max-w-sm"
  >
    <div class="">
      <svg class="h-10 w-10 fill-green-600">
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>
    `;
  }
}
