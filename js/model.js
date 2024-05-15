import {
  API_URL,
  months,
  main_container,
  tba,
  season_month,
  month_period,
} from "./config.js";
import {
  getCurrentYear,
  getSeasonMonth,
  displayMonthSeason,
} from "./view/getMonth.js";
import { fetchApi } from "./helper.js";

export const renderAnimebaseOnCuurentYear = async function (
  year = getCurrentYear()
) {
  const season_month_Value = getSeasonMonth();

  try {
    const data = await fetchApi(API_URL);
    // console.log(data);
    if (season_month_Value[0] === "TBA") {
      let dataFilter = data.filter((dt) => dt.Aired === "TBA");
      console.log(dataFilter);

      dataFilter.map((dataAnime) => {
        const markUp = renderAnimemarkUp(dataAnime);
        main_container.insertAdjacentHTML("afterbegin", markUp);
      });
    } else {
      data
        .filter(
          (dt, i) =>
            +dt.Aired.split(" ")[dt.Aired.split(" ").length - 1] === year &&
            dt.Season.split(" ")[0].toLowerCase() ===
              season_month_Value[0].toLowerCase()
        )
        .map((dataAnime) => {
          const markUp = renderAnimemarkUp(dataAnime);
          main_container.insertAdjacentHTML("afterbegin", markUp);
        });
    }

    console.log(season_month_Value);
  } catch (err) {
    console.log(err);
  }
};
//Render Anime Markup
const renderAnimemarkUp = function (dataAnime) {
  const {
    animeName,
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
          .join("_")}" class="filter-link">${tags}</a>`
    )
    .join(" - ");

  return ` <div class="anime_container">
    <h3></h3>
    <a href="#${animeName
      .split(" ")
      .join("_")}" class="anime_name">${animeName}</a>
    <div class="anime_genres_links">
    ${tagsMarkup}
    </div>
    <div class="anime">
    <img src="${imgCover}" alt="${animeName}" />
    <div class="info">
    <div class="studio"><a href="#${Studios.split(" ").join(
      "_"
    )}" class="filter-link">${Studios}</a></div>
    <div class="anime_date">${Aired}</div>
    <div class="source_episode">
      <span class="source">${Source}</span>
      <span class="episode">${Episodes} eps x ${runTime.split(" ")[0]} m</span>
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
        renderAnimebaseOnCuurentYear();
        displayMonthSeason();
      }

      nexSeasonBtn.style.display = value === "TBA" ? "none" : "block";
      filteredData.forEach((dt) => {
        const markUp = renderAnimemarkUp(dt);
        main_container.insertAdjacentHTML("afterbegin", markUp);
      });
    } catch (err) {
      console.log(err);
    }
  }
});

//Get Max and Min Years Season
const MaxMinYearSeason = async function () {
  const data = await fetchApi(API_URL);
  const max = Math.max(
    ...data
      .map((dt) => +dt.Aired.split(" ")[dt.Aired.split(" ").length - 1])
      .filter((m) => isFinite(m))
  );
  const min = Math.min(
    ...data
      .map((dt) => +dt.Aired.split(" ")[dt.Aired.split(" ").length - 1])
      .filter((m) => isFinite(m))
  );
  return [min, max];
};
const maxminYear = await MaxMinYearSeason();
console.log(maxminYear);

//Get Previous Season
const preSeasonBtn = document.querySelector(".pre_season");
preSeasonBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const pre = season_month.textContent.split(" ");
  let year = +pre[1];
  let newSeason;
  if (pre[0] === "TBA") {
    newSeason = "Fall";
    year = maxminYear[1];
    month_period.innerHTML = `October ${year}–December ${year}`;
    nexSeasonBtn.style.display = " Block";
  } else if (pre[0] === "Fall") {
    month_period.innerHTML = `July ${year}–September ${year}`;
    newSeason = "Summer";
  } else if (pre[0] === "Summer") {
    month_period.innerHTML = `April ${year}–June ${year}`;
    newSeason = "Spring";
  } else if (pre[0] === "Spring") {
    month_period.innerHTML = `January ${year}–March ${year}`;
    newSeason = "Winter";
  } else if (pre[0] === "Winter") {
    year--;
    month_period.innerHTML = `October ${year}–December ${year}`;
    newSeason = "Fall";
  }

  season_month.innerHTML = `${newSeason} ${year} Anime`;

  main_container.innerHTML = ``;
  renderAnimebaseOnCuurentYear(year);
});

//Get Next Season
const nexSeasonBtn = document.querySelector(".next_season");
nexSeasonBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const next = season_month.textContent.split(" ");
  let year = +next[1];
  let newSeason;
  if (next[0] === "Winter") {
    month_period.innerHTML = `April ${year}–June ${year}`;
    newSeason = "Spring";
  } else if (next[0] === "Spring") {
    month_period.innerHTML = `July ${year}–September ${year}`;
    newSeason = "Summer";
  } else if (next[0] === "Summer") {
    month_period.innerHTML = `October ${year}–December ${year}`;
    newSeason = "Fall";
  } else if (next[0] === "Fall") {
    month_period.innerHTML = `January ${year}–March ${year}`;
    newSeason = "Winter";
    year++;
  }
  season_month.innerHTML = `${newSeason} ${year} Anime`;

  if (year === maxminYear[1] + 1) {
    console.log(10);
    month_period.innerHTML = `Upcoming`;
    season_month.innerHTML = `TBA Anime`;
    newSeason = `Fall`;
    nexSeasonBtn.style.display = " none";
  }
  main_container.innerHTML = ``;
  renderAnimebaseOnCuurentYear(year);
});

// Attach click event listeners to filter links
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("filter-link")) {
    // event.preventDefault(); // Prevent default link behavior
    const value = event.target.textContent.trim(); // Get the clicked value
    if (!value) return;
    const filter_anime = document.querySelector(".filter_anime--list");
    console.log(value);

    try {
      const data = await fetchApi(API_URL);
      console.log(data);
      console.log(value.slice(0, -1).toUpperCase());
      // Filter the data based on the clicked value
      const filteredData = data.filter(
        (dt) => dt.tag.includes(value) || dt.Studios.includes(value)
      );
      // Clear the main container
      main_container.innerHTML = "";
      filter_anime.innerHTML = `<div class="month_season-container">
      <a href="#allTags" class="all_tags">Tags ></a>
         <span class="tag">${value}</span>
        <p>${value} Anime</p>
       </div>`;
      // Render filtered data
      filteredData.forEach((dt) => {
        const markUp = renderAnimemarkUp(dt);
        main_container.insertAdjacentHTML("afterbegin", markUp);
      });
    } catch (err) {
      console.log(err);
    }
  }
});
