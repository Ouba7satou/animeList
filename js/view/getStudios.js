import { API_URL, main_container } from "../config.js";
import { fetchApi } from "../helper.js";

const getAllStudios = async function () {
  try {
    const data = await fetchApi(API_URL);
    const studio = [...new Set(data.flatMap((s) => s.Studios))];
    return studio;
  } catch (err) {
    throw new Error(err);
  }
};
const allStudios = await getAllStudios();
export const get_Studios = function () {
  document.addEventListener("click", (e) => {
    const studios = e.target.classList.contains("all_studios");
    const filter_anime = document.querySelector(".month_season-container");
    if (!studios) return;
    main_container.innerHTML = `<div class="anime--Tags">${allStudios
      .map(
        (studio) =>
          `<a href="#${studio
            .split(" ")
            .join(
              "_"
            )}" class="filter-link studio_select tags_select--style">${studio}</a>`
      )
      .join(" ")}</div> `;
    filter_anime.innerHTML = `<div class="month_season-container">
    <p class="anime--Tags_Name">Studios</p>
   `;
  });
};
