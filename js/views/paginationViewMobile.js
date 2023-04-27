import View from "./view.js";
import icons from "url:../../img/icons.svg";

class PaginationViewMobile extends View {
  _parentElement = document.querySelector(".pagination-mobile");

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
    <button class="py-1 px-3 rounded-full text-white  mr-7 bg-green-400 font-bold hover:bg-green-300 active:bg-green-500 duration-200">
       Page <span>${curPage + 1}</span> &rarr;
    </button>
    `;
    }
    // last page
    if (curPage === numPages && numPages > 1) {
      return `
    <button class="py-1 px-3 rounded-full text-white mr-7 bg-green-400 font-bold hover:bg-green-300 active:bg-green-500 duration-200">
      &larr; Page <span>${curPage - 1}</span>
    </button>
    `;
    }
    // some other page
    if (curPage < numPages) {
      return `
    <button class="py-1 px-3 rounded-full text-white bg-green-400 font-bold hover:bg-green-300 active:bg-green-500 duration-200">
        &larr; Page <span>${curPage - 1}</span>
    </button>
    <button class="py-1 px-3 rounded-full text-white bg-green-400 font-bold hover:bg-green-300 active:bg-green-500 duration-200">
       Page <span>${curPage + 1}</span> &rarr;
    </button>
    `;
    }
    // page 1 and there are no other page
    return ``;
  }
}

export default new PaginationViewMobile();
