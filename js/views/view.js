import icons from "url:../../img/icons.svg";

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markUp = document.createElement("div");
    markUp.classList.add("h-full");
    // markUp.classList.add("w-full");
    markUp.innerHTML = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentElement("afterbegin", markUp);
  }

  renderPagination(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markUp = document.createElement("div");
    markUp.classList.add(
      "h-full",
      "w-full",
      "flex",
      "justify-between",
      "space-x-3"
    );
    markUp.innerHTML = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentElement("afterbegin", markUp);
  }

  // update(data) {
  //   if (!data || (Array.isArray(data) && data.length === 0))
  //     return this.renderError();

  //   this._data = data;

  //   // const newMarkUp = document.createElement("div");
  //   // newMarkUp.classList.add("h-full");
  //   const newMarkUp = this._generateMarkup();
  //   const mainMarkup = newMarkUp;

  //   const newDOM = document.createRange().createContextualFragment(mainMarkup);

  //   const newElement = Array.from(newDOM.querySelectorAll("*"));

  //   const curElements = Array.from(this._parentElement.querySelectorAll("*"));

  //   newElement.forEach((newEl, i) => {
  //     const curEl = curElements[i];
  //     // console.log(curEl, newEl.isEqualNode(curEl));

  //     if (
  //       !newEl.isEqualNode(curEl) &&
  //       newEl.firstChild?.nodeValue.trim() !== ""
  //     ) {
  //       curEl.textContent = newEl.textContent;
  //       // console.log(newEl.firstChild.nodeValue.trim());
  //     }

  //     if (!newEl.isEqualNode(curEl)) {
  //       Array.from(newEl.attributes).forEach((attr) =>
  //         curEl.setAttribute(attr.name, attr.value)
  //       );
  //     }
  //   });
  // }

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
        <svg class="h-10 w-10 fill-red-600">
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
