const filter_anime = document.querySelector(".filter_anime--name select");
const option_filter = filter_anime.querySelectorAll("option");

// Retrieve the saved option from localStorage
export const savedOption = localStorage.getItem("selectedOption");

// Set the selected option if it exists
if (savedOption) {
  filter_anime.value = savedOption;
}

// Add event listener to save the selected option
filter_anime.addEventListener("change", function () {
  localStorage.setItem("selectedOption", this.value);
});
