import {
  main_container,
  season_month,
  month_period,
  option_filter,
} from "../config.js";
import { renderAnimebaseOnCuurentYear } from "./renderAnimebocs.js";
import { maxminYear } from "./maxMinyears.js";

export const getOptionValue = function () {
  let data;
  option_filter.forEach((op) => {
    if (op.selected) {
      return (data = op.value);
    }
  });
  return data;
};

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
  if (year === maxminYear[0] - 2) {
    preSeasonBtn.style.display = " none";
  }
  season_month.innerHTML = `${newSeason} ${year} Anime`;
  main_container.innerHTML = ``;
  renderAnimebaseOnCuurentYear(year, getOptionValue());
  //checkAnimeContainers();
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
    preSeasonBtn.style.display = " block";
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
  renderAnimebaseOnCuurentYear(year, getOptionValue());
  //checkAnimeContainers();
});
