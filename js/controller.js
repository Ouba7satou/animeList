import { renderAnimebaseOnCuurentYear } from "./view/renderAnimebocs.js";
import { displayMonthSeason } from "./view/getMonth.js";
import { get_Tags } from "./view/getTags.js";
import { animeFullPage, renderAnimeFullPage } from "./view/animeFullPage.js";
import {} from "./view/getResultSearch.js";
import {} from "./view/pagination.js";
import {} from "./view/getPreNexSeason.js";
import {} from "./view/seletedTagStudios.js";
import { get_Studios } from "./view/getStudios.js";
import {} from "./view/dataSavedinLS.js";
import {
  renderAnimeBookmark,
  newFilter_anime,
} from "./view/getUserBookmark.js";
import { hash, animeNameFromHash } from "./config.js";

const init = function () {
  if (hash === "bookmark") {
    newFilter_anime();
    renderAnimeBookmark();
  } else if (hash.startsWith("animeName?")) {
    renderAnimeFullPage(animeNameFromHash);
  } else {
    renderAnimebaseOnCuurentYear();
  }

  displayMonthSeason();
  get_Studios();
  animeFullPage();
  get_Tags();
};
init();
