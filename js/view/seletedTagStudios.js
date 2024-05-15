import {
  API_URL,
  filter_anime,
  main_container,
  filter_anime__name,
} from "../config.js";
import { fetchApi } from "../helper.js";
import { renderAnimemarkUp } from "./renderAnimebocs.js";

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
      //console.log(data);
      //console.log(value.slice(0, -1).toUpperCase());

      // Filter the data based on the clicked value

      if (event.target.classList.contains("tags_select")) {
        const filteredData = data.filter((dt) => dt.tag.includes(value));
        filter_anime.innerHTML = `<div class="month_season-container">
          <a href="#allTags" class="all_tags">Tags ></a>
             <span class="tag">${value}</span>
            <p>${value} Anime</p>
           </div>`;
        // Render filtered data
        filterTagStudio(filteredData);
      } else if (event.target.classList.contains("studio_select")) {
        const filteredData = data.filter((dt) => dt.Studios.includes(value));
        filter_anime.innerHTML = `<div class="month_season-container">
        <a href="#allStudios" class="all_studios">Studios ></a>       <span>${value}</span>
 
        <div>
          <p>${value}</p>
          <p>Founded in 2017</p>
          <span class="more_info">More info</span>
        </div>
        <div class="studios_info hidden">
          <div>
            <p>Native Name</p>
            <p>${value}</p>
          </div>
          <div>
            <p>Founded</p>
            <p>Founded in 2017</p>
          </div>
          <a href=""><i class="fas fa-globe"></i></a>
        </div>
      </div>`;
        // Render filtered data
        filterTagStudio(filteredData);
      }
    } catch (err) {
      console.log(err);
    }
  }
});

const filterTagStudio = function (filteredData) {
  // Clear the main container
  filter_anime__name.innerHTML = "";
  main_container.innerHTML = "";
  // Render filtered data
  filteredData.forEach((dt) => {
    const markUp = renderAnimemarkUp(dt);
    main_container.insertAdjacentHTML("afterbegin", markUp);
  });
};
document.addEventListener("click", (e) => {
  const more_info = e.target.closest(".more_info");
  if (!more_info) return;
  const studios_info = document.querySelector(".studios_info");
  studios_info.classList.toggle("hidden");
});
