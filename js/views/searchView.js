class SearchView {
  #parentEl = document.querySelector(".search1");
  #parentEl2 = document.querySelector(".search2");

  getQuery() {
    const query1 = this.#parentEl.querySelector(".search-input1").value;
    this.#parentEl.querySelector(".search-input1").value = "";
    return query1;
  }
  getQuery2() {
    const query2 = this.#parentEl2.querySelector(".search-input2").value;
    this.#parentEl2.querySelector(".search-input2").value = "";
    return query2;
  }

  // #clearInput(element, input) {
  //   this.element.querySelector(input).value = "";
  // }
  // #clearInput(element, input) {
  //   this.element.querySelector(input).value = "";
  // }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
      // controlSearchResults();
    });
  }
  addHandlerSearch2(handler) {
    this.#parentEl2.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
      // controlSearchResults();
    });
  }
}
export default new SearchView();
