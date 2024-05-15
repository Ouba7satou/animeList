import {
  API_URL,
  main_container,
  season_month,
  month_period,
  option_filter,
  filter_animel_select,
} from "../config.js";
import {
  getCurrentYear,
  getSeasonMonth,
  displayMonthSeason,
} from "./getMonth.js";
import { fetchApi } from "../helper.js";
import { savedOption } from "./dataSavedinLS.js";

export let dataLocal =
  JSON.parse(localStorage.getItem("animeList__Stored")) || [];

//Render Anime  bBase On Current Year
export const renderAnimebaseOnCuurentYear = async function (
  year = getCurrentYear(),
  filterName = savedOption
) {
  try {
    const season_month_Value = getSeasonMonth();
    const data = await fetchApi(API_URL);

    if (season_month_Value[0] === "TBA") {
      let dataFilter = data.filter((dt) => dt.Aired === "TBA");
      dataFilter.forEach((dataAnime) => {
        const markUp = renderAnimemarkUp(dataAnime, filterName);
        main_container.insertAdjacentHTML("afterbegin", markUp);
      });
    } else {
      data
        .filter(
          (dt) =>
            +dt.Aired.split(" ")[dt.Aired.split(" ").length - 1] === year &&
            dt.Season.split(" ")[0].toLowerCase() ===
              season_month_Value[0].toLowerCase()
        )
        .forEach((dataAnime) => {
          const markUp = renderAnimemarkUp(dataAnime, filterName);
          main_container.insertAdjacentHTML("afterbegin", markUp);
        });
    }
    // Update the hash based on the loaded data
    window.location.hash = `${season_month_Value[0]}_${year}`;
  } catch (err) {
    console.log(err);
  }
};
//Render Anime Markup
export const renderAnimemarkUp = function (dataAnime, filterName) {
  const {
    animeName,
    englishName,
    tag,
    imgCover,
    Studios,
    Aired,
    Source,
    Episodes,
    runTime,
    story,
  } = dataAnime;
  const tagsMarkup = tag
    .map(
      (tags) =>
        `<a href="#${tags
          .split(" ")
          .join("_")}" class="filter-link tags_select">${tags}</a>`
    )
    .join(" - ");

  const displayedName = filterName === "english_name" ? englishName : animeName;

  //Old Way ==> //const storedColor = localStorage.getItem(animeName.split(" ").join("_"));

  const animeData_color = dataLocal.find(
    (anime) => anime.anime_name === animeName
  );
  const animeColor = animeData_color ? animeData_color.color : "";
  const animeState = animeData_color ? animeData_color.state : "";

  return ` <div class="anime_container" style="background: ${animeColor}"data-current-color="${animeColor}" data-state="${animeState}" >
    
      <a href="#${animeName
        .split(" ")
        .join("_")}" class="anime_name" >${displayedName}</a>
      <div class="anime_genres_links">
      ${tagsMarkup}
      </div>
      <div class="select_myList" style="background-color: ${animeColor}"><i class="far fa-bookmark"></i></div>
      <div class="select_myList--option">
        <div data-state="completed" data-color="03a9f4bf">Completed</div>
        <div data-state="watching" data-color="4caf50bd">Watching</div>
        <div data-state="planning" data-color="9153ffbd">Planning</div>
        <div data-state="considering" data-color="ffc107bf">Considering</div>
        <div data-state="skipping" data-color="f44336bf">Skipping</div>
      </div>
      <div class="anime">
      <img src="${imgCover.slice(1)}" alt="${animeName}" />
      <div class="info">
      <div class="studio"><a href="#${Studios.split(" ").join(
        "_"
      )}" class="filter-link studio_select">${Studios}</a></div>
      <div class="anime_date">${Aired}</div>
      <div class="source_episode">
        <span class="source">${Source}</span>
        <span class="episode">${Episodes} eps x ${
    runTime.split(" ")[0]
  } m</span>
      </div>
      <div class="anime_story">
        ${story}
      </div>
      </div>
      </div>
      <div class="anime_source-links">
      <a href="#">Link1</a>
      <a href="#">Link2</a>
      <a href="#">Link3</a>
      <a href="#">Link4</a>
      <a href="#">Link5</a>
      <a href="#">Link6</a>
      </div>
      </div>`;
};

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("seasons_list--filter")) {
    const value = e.target.textContent.trim();
    console.log(value);
    const nexSeasonBtn = document.querySelector(".next_season");
    try {
      const data = await fetchApi(API_URL);
      console.log(data);
      const season_month_Value = document
        .querySelector(".season_month")
        .textContent.split(" ")[1];
      console.log(season_month_Value);
      let filteredData;
      if (value === "TBA") {
        // Filter the data based on the clicked value
        filteredData = data.filter((dt) => dt.Aired === value);
        // Clear the main container
        main_container.innerHTML = "";
        season_month.innerHTML = `TBA Anime`;
        month_period.innerHTML = `Upcoming`;
      } else if (value === "Winter") {
        // Filter the data based on the clicked value
        filteredData = data.filter(
          (dt) => dt.Season === `${value} ${season_month_Value}`
        );
        // Clear the main container
        main_container.innerHTML = "";
        month_period.innerHTML = `January ${season_month_Value}–March ${season_month_Value}`;
        season_month.innerHTML = `Winter ${season_month_Value} Anime`;
      } else if (value === "Spring") {
        // Filter the data based on the clicked value
        filteredData = data.filter(
          (dt) => dt.Season === `${value} ${season_month_Value}`
        );
        // Clear the main container
        main_container.innerHTML = "";
        month_period.innerHTML = `April ${season_month_Value}–June ${season_month_Value}`;
        season_month.innerHTML = `Spring ${season_month_Value} Anime`;
      } else if (value === "Summer") {
        // Filter the data based on the clicked value
        filteredData = data.filter(
          (dt) => dt.Season === `${value} ${season_month_Value}`
        );
        // Clear the main container
        main_container.innerHTML = "";
        month_period.innerHTML = `July ${season_month_Value}–September ${season_month_Value}`;
        season_month.innerHTML = `Summer ${season_month_Value} Anime`;
      } else if (value === "Fall") {
        // Filter the data based on the clicked value
        filteredData = data.filter(
          (dt) => dt.Season === `${value} ${season_month_Value}`
        );
        // Clear the main container
        main_container.innerHTML = "";
        month_period.innerHTML = `October ${season_month_Value}–December ${season_month_Value}`;
        season_month.innerHTML = `Fall ${season_month_Value} Anime`;
      }
      if (season_month_Value === "Anime") {
        main_container.innerHTML = ``;
        renderAnimebaseOnCuurentYear();
        displayMonthSeason();
      }
      nexSeasonBtn.style.display = value === "TBA" ? "none" : "block";
      filteredData.forEach((dt) => {
        const markUp = renderAnimemarkUp(dt);
        main_container.insertAdjacentHTML("afterbegin", markUp);
        //checkAnimeContainers();
      });
    } catch (err) {
      console.log(err);
    }
  }
});

filter_animel_select.addEventListener("change", (e) => {
  const filter = e.target.value;
  const option = e.target.options[e.target.selectedIndex];
  // console.log(option);
  if (!filter) return;
  // Get the current year
  const currentYear = +season_month.textContent.split(" ")[1];
  main_container.innerHTML = ``;
  //const options = e.target.options;
  option_filter.forEach((op) => {
    if (op === option) {
      op.setAttribute("selected", true);
      renderAnimebaseOnCuurentYear(currentYear, filter);
    } else {
      op.removeAttribute("selected");
    }
  });
});

//Store in LocalStorge
document.addEventListener("click", (e) => {
  const data = e.target.closest(".anime_container");
  const select_myListOption = e.target.closest(".select_myList--option div");
  const fa_bookmark = document.querySelectorAll(".select_myList");
  let animeList__Stored =
    JSON.parse(localStorage.getItem("animeList__Stored")) || [];

  if (!data || !select_myListOption) return;
  const color = `#${select_myListOption.dataset.color}`;
  let currentColor = data.dataset.currentColor;
  let currentState = select_myListOption.dataset.state;

  if (select_myListOption) {
    if (currentColor === color) {
      data.style.background = ""; // Remove color
      data.dataset.currentColor = ""; // Update currentColor
      data.dataset.state = ""; // Update  State
      fa_bookmark.forEach((st) => {
        if (data.contains(st)) {
          st.style.background = "";
        }
      });
      currentColor = "";
    } else {
      data.style.background = color; // Add color
      data.dataset.currentColor = color; // Update currentColor
      data.dataset.state = currentState;
      fa_bookmark.forEach((st) => {
        if (data.contains(st)) {
          st.style.background = color;
        }
      });
      currentColor = color; // Update currentColor
    }
  }
  ///////////////
  const anime_nameContainer = data.querySelector(".anime_name").textContent;
  let anime = {
    state: data.dataset.state,
    color: currentColor,
    anime_name: anime_nameContainer,
  };
  const yari = async function () {
    try {
      const dataApi = await fetchApi(API_URL);
      const animeFilter = dataApi.filter(
        (n) => n.animeName === anime_nameContainer
      );
      anime.data = animeFilter;

      //Check CurrentState
      if (currentState) {
        // Check if the anime already exists in the animeList__Stored array
        const existingAnimeIndex = animeList__Stored.findIndex(
          (item) => item.anime_name === anime.anime_name
        );
        //Check
        if (existingAnimeIndex !== -1) {
          // Update the state of the existing anime in animeList__Stored
          animeList__Stored[existingAnimeIndex].state = anime.state;
          animeList__Stored[existingAnimeIndex].color = anime.color;
        } else {
          // Add the anime to animeList__Stored if it doesn't exist
          animeList__Stored.push(anime);
        }

        //Save Array animeList__Stored
        localStorage.setItem(
          "animeList__Stored",
          JSON.stringify(animeList__Stored)
        );
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  yari();
});
