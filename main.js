/* const mainContainer = document.querySelector(".main_container");
const year_list = document.querySelector(".year_list");

const tagAnime = document.querySelector(".genres_list");
const date = new Date();

for (let i = 1980; i <= date.getFullYear(); i++) {
  year_list.innerHTML += `<a href="#${i}">${i}</a>`;
}
const createTagAnime = function (tagData) {
  const allTags = new Set();
  tagData.map((anime) => {
    anime.tag.map((tag) => {
      allTags.add(tag);
    });
  });
  tagAnime.innerHTML += [...allTags]
    .map((tag) => `<a href="#${tag}">${tag}</a>`)
    .join(" ");
};
const fetchAJAX = async function () {
  try {
    const api = await fetch(
      `https://raw.githubusercontent.com/Ouba7satou/anime_list/main/anime_list_api.json`
    );
    const data = await api.json();
    console.log(data);
    createTagAnime(data);
    //
    const year_list_links = Array.from(
      document.querySelectorAll(".year_list a")
    );
    year_list_links.map((e) =>
      e.addEventListener("click", (lin) => {
        lin.target.textContent;
        mainContainer.innerHTML = ``;
        creatAnimeList(data, lin.target.textContent, null);
      })
    );
    //
    const genres_list = [...document.querySelectorAll(".genres_list a")];
    genres_list.map((gen) =>
      gen.addEventListener("click", (e) => {
        mainContainer.innerHTML = ``;
        creatAnimeList(data, null, e.target.textContent);
      })
    );
  } catch (err) {
    console.log(err);
  }
};

const creatAnimeList = function (data, links, genres) {
  data
    .filter((dt) => {
      if (genres) {
        return dt.tag.includes(genres);
      } else {
        return dt.Aired.split(" ")[1] === links;
      }
    })
    .map((dataAnime) => {
      const markUp = ` <div class="anime_container">
  <h3>${dataAnime.animeName}</h3>
  <div class="anime_genres_links">
 ${dataAnime.tag.map((tags) => `<a href="#${tags}">${tags}</a>`).join(" - ")}
  </div>
  <div class="anime">
    <img src="${dataAnime.imgCover}" alt="${dataAnime.animeName}" />
    <div class="info">
      <div class="studio"><a href="#${dataAnime.Studios}">${
        dataAnime.Studios
      }</a></div>
      <div class="anime_date">${dataAnime.Aired}</div>
      <div class="source_episode">
        <span class="source">${dataAnime.Source}</span>
        <span class="episode">${dataAnime.Episodes} eps x ${
        dataAnime.runTime.split(" ")[0]
      } ${dataAnime.runTime.split(" ")[1].slice(0, 1)}</span>
      </div>
      <div class="anime_story">
        ${dataAnime.story}
      </div>
    </div>
  </div>
  <div class="anime_source-links">
    <a href="">Link1</a>
    <a href="">Link2</a>
    <a href="">Link3</a>
    <a href="">Link4</a>
    <a href="">Link5</a>
    <a href="">Link6</a>
  </div>
</div>`;
      mainContainer.insertAdjacentHTML("afterbegin", markUp);
    });
};
fetchAJAX();
///////////////////////////////////
data
  .filter(
    (dt, i) =>
      +dt.Aired.split(" ")[dt.Aired.split(" ").length - 1] ===
        getCurrentYear() && dt.Season.split(" ")[0].toLowerCase() === season
  )
  .map((dataAnime) => {
    const markUp = ` <div class="anime_container">
<h3>${dataAnime.animeName}</h3>
<div class="anime_genres_links">
${dataAnime.tag.map((tags) => `<a href="#${tags}">${tags}</a>`).join(" - ")}
</div>
<div class="anime">
<img src="${dataAnime.imgCover}" alt="${dataAnime.animeName}" />
<div class="info">
<div class="studio"><a href="#${dataAnime.Studios}">${
      dataAnime.Studios
    }</a></div>
<div class="anime_date">${dataAnime.Aired}</div>
<div class="source_episode">
<span class="source">${dataAnime.Source}</span>
<span class="episode">${dataAnime.Episodes} eps x ${
      dataAnime.runTime.split(" ")[0]
    } ${dataAnime.runTime.split(" ")[1].slice(0, 1)}</span>
</div>
<div class="anime_story">
${dataAnime.story}
</div>
</div>
</div>
<div class="anime_source-links">
<a href="">Link1</a>
<a href="">Link2</a>
<a href="">Link3</a>
<a href="">Link4</a>
<a href="">Link5</a>
<a href="">Link6</a>
</div>
</div>`;
    main_container.insertAdjacentHTML("afterbegin", markUp);
  });
 */
////////////////////////////////////////
/*const season = document
  .querySelector(".season_month")
  .textContent.split(" ")[0]
  .toLowerCase();
  
  
  .filter(
    (dt, i) =>
      +dt.Aired.split(" ")[dt.Aired.split(" ").length - 1] ===
        getCurrentYear() && dt.Season.split(" ")[0].toLowerCase() === season
  ) */
/* const urlParams = new URLSearchParams(window.location.search);
const year = parseInt(urlParams.get("year"), 10) || 2024;
const season = urlParams.get("season") || "winter";
       const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("filter", value);
    window.history.pushState({ path: newUrl.href }, "", newUrl.href); 
const animeListElement = document.getElementById("animeList");

console.log(urlParams);
console.log(year);
console.log(season); */

/* 

   <div class="anime_info-container">
        <div class="leftside">
          <img src="/imgs/small(0).jpg" alt="" />
          <div class="rating">
            <i class="far fa-star"></i>
            <span>7.5/10</span>
          </div>
          <div class="info">
            <div class="text">
              <p>Original title</p>
              <span>魔王学院の不適合者 Ⅱ 第2クール</span>
            </div>
            <div class="text">
              <p>Status</p>
              <span>Releasing</span>
            </div>
            <div class="text">
              <p>Premiere</p>
              <span>April 12, 2024</span>
            </div>
            <div class="text">
              <a href="#" target="_blank">WEBSITE</a>
              <a href="#" target="_blank">OFFICAIL X</a>
            </div>
          </div>
        </div>
        <div class="rightside">
          <div class="title">
            <h3>Maou Gakuin</h3>
            <h3>The Misfit of Demon</h3>
          </div>
          <div class="detail">
            <div class="anime_detail">
              <div>
                <p>Format</p>
                <span>TV</span>
              </div>
              <div>
                <p>Source</p>
                <span>Manga</span>
              </div>
              <div>
                <p>Episodes</p>
                <span>25</span>
              </div>
              <div>
                <p>Run time</p>
                <span>23m</span>
              </div>
            </div>
            <div class="story">
              The academy's lessons are back in session with Anos Voldigoad
              fighting more powerful enemies!
            </div>
            <div class="studio">
              <p>Studio</p>
              <a href="#">Silver links</a>
            </div>
            <div class="tags">
              <a href="#">Action</a>
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
      </div>*/

/* const select_myList__option = document.querySelectorAll(
  ".select_myList--option div"
);
for (let i = 0; i < select_myList__option.length; i++) {
  console.log(select_myList__option[i]);
  console.log(select_myList__option[i].dataset.color);
  select_myList__option[
    i
  ].style = `background-color:#${select_myList__option[i].dataset.color}`;
}
console.log(select_myList__option); */
const yari = async function () {
  try {
    const anime_name = data.querySelector(".anime_name").textContent;
    const dataApi = await fetchApi(API_URL);
    const filter_Anime = dataApi.filter(
      (name) => name.animeName === anime_name
    );
    console.log(filter_Anime);
    if (currentState) {
      let anime = {
        state: data.dataset.state,
        color: currentColor,
        anime_name: anime_name,
        data: filter_Anime,
      };

      // Check if the anime already exists in the animeList__Stored array
      const existingAnimeIndex = animeList__Stored.findIndex(
        (item) => item.anime_name === anime.anime_name
      );

      console.log(existingAnimeIndex);
      if (existingAnimeIndex !== -1) {
        // Update the state of the existing anime in animeList__Stored
        animeList__Stored[existingAnimeIndex].state = anime.state;
        animeList__Stored[existingAnimeIndex].color = anime.color;
        animeList__Stored[existingAnimeIndex].color = data.filter_Anime;
      } else {
        // Add the anime to animeList__Stored if it doesn't exist
        animeList__Stored.push(anime);
      }

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
