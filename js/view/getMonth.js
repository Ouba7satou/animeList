import {
  months,
  season_month,
  month_period,
  season_monthValue,
} from "../config.js";

//get Current Month
export const getCurrentMonth = function () {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  return currentMonth; // Return the current month value
};

//get Current year
export const getCurrentYear = function () {
  const currentDate = new Date();
  const currentyear = currentDate.getFullYear();
  return currentyear; // Return the current month value
};

export const getSeasonMonth = function () {
  return season_month.textContent.split(" ");
};

//Display Current Month based on local date => will be change based on date online
export const displayMonthSeason = function (year = getCurrentYear()) {
  let thismonth = getCurrentMonth();

  if (
    months[thismonth] === "January" ||
    months[thismonth] === "February" ||
    months[thismonth] === "March"
  ) {
    console.log("Winter");
    month_period.innerHTML = `January ${year}–March ${year}`;
    season_month.innerHTML = `Winter ${year} Anime`;
  } else if (
    months[thismonth] === "April" ||
    months[thismonth] === "May" ||
    months[thismonth] === "June"
  ) {
    console.log("spring");
    month_period.innerHTML = `April ${year}–June ${year}`;
    season_month.innerHTML = `Spring ${year} Anime`;
  } else if (
    months[thismonth] === "July" ||
    months[thismonth] === "August" ||
    months[thismonth] === "September"
  ) {
    console.log("summer");
    month_period.innerHTML = `July ${year}–September ${year}`;
    season_month.innerHTML = `Summer ${year} Anime`;
  } else if (
    months[thismonth] === "October" ||
    months[thismonth] === "November" ||
    months[thismonth] === "December"
  ) {
    console.log("fall");
    month_period.innerHTML = `October ${year}–December ${year}`;
    season_month.innerHTML = `Fall ${year} Anime`;
  }
};
