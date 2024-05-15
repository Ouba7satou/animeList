import { resultFunctionValue } from "./getResultSearch.js";
import { num_per_page, main_container } from "../config.js";

export const displayPagination = function (totalResults) {
  const totalPages = Math.ceil(totalResults / num_per_page);
  let paginationButtons = "";
  if (totalPages <= 1) {
    paginationButtons = ``;
  } else {
    for (let i = 1; i <= totalPages; i++) {
      paginationButtons += `<button class="btn_page" data-goto="${i}">${i}</button>`;
    }
  }
  const paginationContainer = `<div class="pagination_container">${paginationButtons}</div>`;
  main_container.innerHTML += paginationContainer;
};
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn_page");
  if (!btn) return;
  const goToPage = parseInt(btn.dataset.goto);
  goToPage;
  resultFunctionValue(goToPage);
});
