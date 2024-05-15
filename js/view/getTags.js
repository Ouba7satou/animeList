import { API_URL, main_container, filter_anime__name } from "../config.js";
import { fetchApi } from "../helper.js";

const getAllTags = async function () {
  try {
    const data = await fetchApi(API_URL);
    const tags = [...new Set(data.flatMap((t) => t.tag))];
    // console.log(tags);
    return tags;
  } catch (err) {
    throw new Error(err);
  }
};
const allTags = await getAllTags();
export const get_Tags = async function () {
  document.addEventListener("click", async (e) => {
    const tags = e.target.classList.contains("all_tags");

    if (!tags) return;
    main_container.innerHTML = allTags
      .map(
        (tags) =>
          `<a href="#${tags
            .split(" ")
            .join("_")}" class="filter-link tags_select">${tags}</a>`
      )
      .join(" ");

    newFilter_anime();
  });
};
const newFilter_anime = function () {
  filter_anime__name.innerHTML = ``;
  const filter_anime = document.querySelector(".month_season-container");
  filter_anime.innerHTML = `<div class="month_season-container">
  <p>Anime Tags</p> </div>`;
};
