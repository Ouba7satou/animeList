import { API_URL, main_container, filter_anime__name } from "../config.js";
import { fetchApi } from "../helper.js";
import { dataLocal } from "./renderAnimebocs.js";

const targetDate = new Date("2024-12-31T23:59:59").getTime();

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
    Season,
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
    .join("");
  const animeData_color = dataLocal.find(
    (anime) => anime.anime_name === animeName
  );
  const animeState = animeData_color ? animeData_color.state : "";
  const storedColor = animeData_color ? animeData_color.color : "";
  return `<div class="anime_info-container anime_container">
  <div class="select_myList" style="background-color: ${storedColor}"><i class="far fa-bookmark"></i></div>
  <div class="select_myList--option">
    <div data-state="completed" data-color="03a9f4bf">Completed</div>
    <div data-state="watching" data-color="4caf50bd">Watching</div>
    <div data-state="planning" data-color="9153ffbd">Planning</div>
    <div data-state="considering" data-color="ffc107bf">Considering</div>
    <div data-state="skipping" data-color="f44336bf">Skipping</div>
  </div>
 
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
            <p>Season</p>
            <span>${Season}</span>
          </div>
          <div class="text">
            <p>Premiere</p>
            <span>${Aired}</span>
          </div>
          <div class="text links">
            <a href="#" target="_blank">WEBSITE</a>
            <a href="#" target="_blank">OFFICAIL X</a>
          </div>
        </div>
      </div>
      <div class="rightside">
        <div class="title">
          <h3 class="anime_name">${animeName}</h3>
          <h3>${englishName}</h3>
        </div>
        
        <div class="broadcast"style="background: ${storedColor}"data-current-color="${storedColor}" data-state="${animeState}" >
        <p>Broadcast (Japan)</p>
        <div class="broadcast--time"></div>
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
              <span class="episode"><span class="watch_episode"><i class="far fa-eye"> ${Episodes}</i></span>/${Episodes}</span>
            </div>
            <div>
              <p>Run time</p>
              <span>${runTime.split(" ")[0]}m</span>
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
          <p>Tags</p>
           ${tagsMarkup}
          </div>
        </div>
        <div class="links">
          <p>External Resources</p>
          <div>
          <a href="#">Link1</a>
          <a href="#">Link2</a>
          <a href="#">Link3</a>
          <a href="#">Link4</a>
          <a href="#">Link5</a>
          <a href="#">Link6</a>  </div>
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
function startCountdown(targetDate) {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    clearInterval(countdownInterval);

    return "EXPIRED";
  }
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return `<div>${days} <span>days</span></div> <div>${hours} <span>hours</span></div> <div>${minutes} <span>minutes</span></div>  <div>${seconds} <span>seconds</span></div>`;
}

const countdownInterval = setInterval(function () {
  const div = document.querySelector(".broadcast--time");
  if (!div) return;
  div.innerHTML = startCountdown(targetDate);
}, 1000);
