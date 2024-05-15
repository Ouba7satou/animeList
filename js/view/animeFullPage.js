import { API_URL, main_container, filter_anime__name } from "../config.js";
import { fetchApi } from "../helper.js";

const renderAnimePage = function (dataAnime) {
  const {
    animeName,
    englishName,
    japaneseName,
    tag,
    imgCover,
    Studios,
    Aired,
    Status,
    Source,
    Episodes,
    runTime,
    Rating,
    type,
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

  return `<div class="anime_info-container">
      <div class="leftside">
        <img src="${imgCover.slice(1)}" alt="${animeName}" />
        <div class="rating">
          <i class="far fa-star"></i>
          <span>${Rating}</span>
        </div>
        <div class="info">
          <div class="text">
            <p>Original title</p>
            <span>${japaneseName}</span>
          </div>
          <div class="text">
            <p>Status</p>
            <span>${Status}</span>
          </div>
          <div class="text">
            <p>Premiere</p>
            <span>${Aired}</span>
          </div>
          <div class="text">
            <a href="#" target="_blank">WEBSITE</a>
            <a href="#" target="_blank">OFFICAIL X</a>
          </div>
        </div>
      </div>
      <div class="rightside">
        <div class="title">
          <h3>${animeName}</h3>
          <h3>${englishName}</h3>
        </div>
        <div class="detail">
          <div class="anime_detail">
            <div>
              <p>Format</p>
              <span>${type}</span>
            </div>
            <div>
              <p>Source</p>
              <span>${Source}</span>
            </div>
            <div>
              <p>Episodes</p>
              <span>${Episodes}</span>
            </div>
            <div>
              <p>Run time</p>
              <span>${runTime}m</span>
            </div>
          </div>
          <div class="story">
           ${story}
          </div>
          <div class="studio">
            <p>Studio</p>
            <a href="#${Studios.split(" ").join(
              "_"
            )}" class="filter-link studio_select">${Studios}</a>
          </div>
          <div class="tags">
           ${tagsMarkup}
          </div>
        </div>
        <div class="links">
          <p>External Resources</p>
          <a href="#">Link1</a>
          <a href="#">Link2</a>
          <a href="#">Link3</a>
          <a href="#">Link4</a>
          <a href="#">Link5</a>
          <a href="#">Link6</a>
        </div>
      </div>
    </div>`;
};

export const animeFullPage = function () {
  document.addEventListener("click", (e) => {
    const anime_name = e.target.classList.contains("anime_name");
    if (!anime_name) return;
    const clickedAnime = e.target.textContent;
    renderAnimeFullPage(clickedAnime);
    window.location.hash = `animeName?${clickedAnime.split(" ").join("_")}`;
  });
};
export const renderAnimeFullPage = async function (clickedAnime) {
  const filter_anime = document.querySelector(".filter_anime--list");
  try {
    const data = await fetchApi(API_URL);
    //console.log(data);
    main_container.textContent = ``;
    filter_anime.innerHTML = ``;
    filter_anime__name.innerHTML = ``;
    data
      .filter(
        (an) => an.animeName === clickedAnime || an.englishName === clickedAnime
      )
      .map((dataAnime) => {
        const markUp = renderAnimePage(dataAnime);
        main_container.insertAdjacentHTML("afterbegin", markUp);
      });
    window.location.hash = `animeName?${clickedAnime.split(" ").join("_")}`;
  } catch (err) {
    console.log(err);
  }
};
