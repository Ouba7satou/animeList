import {
  user_bookmark,
  main_container,
  filter_anime__name,
  filter_anime,
  hash,
} from "../config.js";
import { renderAnimemarkUp, dataLocal } from "./renderAnimebocs.js";
console.log(user_bookmark);

const countAnime = function (state) {
  const statName = dataLocal.filter((sk) => sk.state === state);
  return statName.length < 10 ? "0" + statName.length : statName.length;
};

export const newFilter_anime = function () {
  main_container.innerHTML = ``;
  filter_anime.innerHTML = `<div class="myList--anime">
  <h2 >My List</h2>
<div class="myList--anime__container">
    <div class="myList--btn " data-state="completed" title="Completed"><i class="fas fa-check" data-state="completed" ></i>${countAnime(
      "completed"
    )}</div>
    <div class="myList--btn " data-state="watching" title="Watching"><i class="far fa-eye" data-state="watching"></i>${countAnime(
      "watching"
    )}</div>
    <div class="myList--btn " data-state="planning" title="Planning"><i class="fas fa-database" data-state="planning"></i>${countAnime(
      "planning"
    )}</div>
    <div class="myList--btn " data-state="considering" title="Considering"><i class="fas fa-question"data-state="considering"></i>${countAnime(
      "considering"
    )}</div>
    <div class="myList--btn " data-state="skipping" title="Skipping"><i class="fas fa-times" data-state="skipping"></i>${countAnime(
      "skipping"
    )}</div>
</div>`;
  filter_anime__name.innerHTML = ``;

  if (!dataLocal || dataLocal.length === 0) {
    main_container.innerHTML = `There is No anime Bookmarked`;
  }
};
user_bookmark.addEventListener("click", async () => {
  newFilter_anime();
  await renderAnimeBookmark();
});

console.log(dataLocal);

export const renderAnimeBookmark = async function () {
  dataLocal.forEach((dataAnime) => {
    if (dataAnime.state) {
      const markUp = renderBookmarkmarkup(dataAnime.data[0]);
      main_container.insertAdjacentHTML("afterbegin", markUp);
    }
  });
};

const renderBookmarkmarkup = function (dataAnime, filterName) {
  const { animeName, englishName, imgCover, Aired, Episodes, Rating } =
    dataAnime;

  const displayedName = filterName === "english_name" ? englishName : animeName;
  const animeData_color = dataLocal.find(
    (anime) => anime.anime_name === animeName
  );
  const animeColor = animeData_color ? animeData_color.color : "";
  return `<div
  class="anime_container anime_bookmark"
  style="background: ${animeColor}"
  data-current-color="${animeColor}"
  data-state="planning"
  >
  <div class="anime_date">${Aired}</div>
  <div class="select_myList" style="background-color: ${animeColor}">
    <i class="far fa-bookmark"></i>
  </div>
  <div class="select_myList--option">
    <div data-state="completed" data-color="03a9f4bf">Completed</div>
    <div data-state="watching" data-color="4caf50bd">Watching</div>
    <div data-state="planning" data-color="9153ffbd">Planning</div>
    <div data-state="considering" data-color="ffc107bf">
      Considering
    </div>
    <div data-state="skipping" data-color="f44336bf">Skipping</div>
  </div>
  <div class="anime">
    <img src="${imgCover.slice(1)}" alt="${animeName}" />
    <div class="rating"><i class="fas fa-star"></i> ${
      Rating.split("/")[0]
    }</div>
  </div>
  <div class="info">
    <a href="#${animeName
      .split(" ")
      .join("_")}"class="anime_name">${displayedName}</a>
    <div class="source_episode">
      <span class="episode"><span class="watch_episode"><i class="far fa-eye"> ${Episodes}</i></span>/${Episodes}</span>
    </div>
  </div>
  </div>`;
};

/// Remove elements with empty state directly from dataLocal
for (let i = dataLocal.length - 1; i >= 0; i--) {
  if (dataLocal[i].state === "") {
    dataLocal.splice(i, 1);
  }
}

// Optionally, you can update localStorage with the modified dataLocal
localStorage.setItem("animeList__Stored", JSON.stringify(dataLocal));

document.addEventListener("click", async (e) => {
  const value = e.target.closest(".myList--btn")?.dataset.state;
  // filter_anime.classList.add("bookmarkfilter_anime--list");
  if (!value) return;
  console.log(value);

  main_container.textContent = ``;
  dataLocal
    .filter((ee) => ee.state === value)
    .map((dataAnime) => {
      console.log(dataAnime.data);
      const markUp = renderBookmarkmarkup(dataAnime.data[0]);
      main_container.insertAdjacentHTML("afterbegin", markUp);
    });
  e.stopPropagation();
});

/* if (hash === "bookmark") {
  filter_anime.classList.add("bookmarkfilter_anime--list");
} else filter_anime.classList.remove("bookmarkfilter_anime--list");
 */
