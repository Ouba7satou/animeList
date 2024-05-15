//export const API_URL = `https://raw.githubusercontent.com/Ouba7satou/anime_list/main/api.json`;
export const API_URL = `https://raw.githubusercontent.com/Ouba7satou/anime_list_API/main/api.json`;

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const main_container = document.querySelector(".main_container");

const tba = document.querySelector(".seasons_list");
const month_period = document.querySelector(".month_period");
const season_month = document.querySelector(".season_month");
const season_monthValue = season_month.textContent.split(" ");
const searchValue = document.querySelector(".search input");
const fa_search = document.querySelector(".fa-search");
const filter_anime = document.querySelector(".filter_anime--list");
const searchInput = document.querySelector(".search input");
const filter_anime__name = document.querySelector(".filter_anime--name");
const filter_animel_select = document.querySelector(
  ".filter_anime--name select"
);
const option_filter = filter_animel_select.querySelectorAll("option");
const user_bookmark = document.querySelector(".user_bookmark");
const num_per_page = 10;
const hash = window.location.hash.slice(1);
const animeNameFromHash = hash.slice(10).split("_").join(" ");
export {
  tba,
  month_period,
  season_month,
  season_monthValue,
  searchValue,
  fa_search,
  filter_anime,
  searchInput,
  num_per_page,
  filter_anime__name,
  filter_animel_select,
  option_filter,
  user_bookmark,
  hash,
  animeNameFromHash,
};
