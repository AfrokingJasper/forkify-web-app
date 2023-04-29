import View from "./view.js";
import icons from "url:../../img/icons.svg";

class PreviewView extends View {
  _parentElement = "";

  _generateMarkup() {
    // const id = window.location.hash.slice(1);
    // ${
    //   this._data.id === id ? "bg-green-200" : ""
    // }

    return `
      <li class="">
        <a
          href="#${this._data.id}"
          class="flex items-center justify-between hover:scale-105 hover:bg-green-100 p-2 duration-700"
        >
          <div class="flex items-center justify-center space-x-3">
            <img
              src="${this._data.image}"
              alt=""
              class="w-16 h-16 rounded-full"
            />
            <div>
              <h3 class="text-md text-green-700 uppercase line-clamp-1">
                ${this._data.title}
              </h3>
              <p class="uppercase text-sm text-black line-clamp-1">
                ${this._data.publisher}
              </p>
            </div>
          </div>
         
        </a>
      </li> 
    `;
  }
}

export default new PreviewView();

// {
//   /* <div class="preview__user-generated md:mr-5 lg:mr-10">
//   <svg class="w-6 h-6">
//     <use href="${icons}#icon-user"></use>
//   </svg>
// </div>; */
// }
