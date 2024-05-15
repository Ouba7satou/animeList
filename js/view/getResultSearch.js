import {
  searchValue,
  API_URL,
  fa_search,
  main_container,
  filter_anime,
  searchInput,
  num_per_page,
  filter_anime__name,
} from "../config.js";
import { dataLocal } from "./renderAnimebocs.js";

import { fetchApi } from "../helper.js";

import { displayPagination } from "./pagination.js";

const getSearchValue = async function (valueSearch, page = 1) {
  try {
    const data = await fetchApi(API_URL);
    // console.log(data); //.includes(value)

    const result = data.filter((res) =>
      res.animeName.toLowerCase().includes(valueSearch)
    );
    const start = (page - 1) * num_per_page;
    const end = start + num_per_page;
    const paginatedData = result.slice(start, end);

    //display Result based on paginatedData
    displayResult(paginatedData);

    //display Pagination Button
    displayPagination(result.length);
  } catch (err) {
    throw new Error(err);
  }
};

const displayResult = function (result) {
  main_container.innerHTML = ``;
  filter_anime__name.innerHTML = ``;
  filter_anime.innerHTML = ``;

  //
  if (result.length > 0) {
    result.map((ruSear) => {
      const animeData_color = dataLocal.find(
        (anime) => anime.anime_name === ruSear.animeName
      );
      const storedColor = animeData_color ? animeData_color.color : "";

      const resultmarkup = `<div class="resultserach anime_container" style="background: ${storedColor}"data-current-color="${storedColor}">
<div class="anime_img">
  <img src="${ruSear.imgCover.splice(1)}" alt="${ruSear.animeName}" />
</div>
<div class="info">
  <a href="#${ruSear.animeName.split(" ").join("_")}" class="anime_name">${
        ruSear.animeName
      }</a>
  <p>${ruSear.Aired}</p>
</div>
<div class="select_myList" style="background-color: ${storedColor}"><i class="far fa-bookmark"></i></div>
<div class="select_myList--option">
  <div data-state="completed" data-color="03a9f4bf">Completed</div>
  <div data-state="watching" data-color="4caf50bd">Watching</div>
  <div data-state="planning" data-color="9153ffbd">Planning</div>
  <div data-state="considering" data-color="ffc107bf">Considering</div>
  <div data-state="skipping" data-color="f44336bf">Skipping</div>
</div>
</div>`;
      main_container.insertAdjacentHTML("afterbegin", resultmarkup);
    });
    main_container.style = `
    flex-direction: column;
    align-items: center;`;
  } else {
    main_container.innerHTML = `<div class="no_result">There no Anime with that name in Database</div>`;
  }
};

export const resultFunctionValue = function (page) {
  const valueSearch = searchValue.value.toLowerCase().trim();
  if (!valueSearch) return;
  getSearchValue(valueSearch, page);
};

fa_search.addEventListener("click", () => {
  resultFunctionValue();
});
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") resultFunctionValue();
});
