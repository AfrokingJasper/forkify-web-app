class SearchView {
  _parentEl = document.querySelector(".search1");
  _parentEl2 = document.querySelector(".search2");

  getQuery() {
    const query1 = this._parentEl.querySelector(".search-input1").value;
    this._parentEl.querySelector(".search-input1").value = "";
    return query1;
  }
  getQuery2() {
    const query2 = this._parentEl2.querySelector(".search-input2").value;
    this._parentEl2.querySelector(".search-input2").value = "";
    return query2;
  }

  //_clearInput(element, input) {
  //   this.element.querySelector(input).value = "";
  // }
  //_clearInput(element, input) {
  //   this.element.querySelector(input).value = "";
  // }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
      // controlSearchResults();
    });
  }
  addHandlerSearch2(handler) {
    this._parentEl2.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
      // controlSearchResults();
    });
  }
}
export default new SearchView();
