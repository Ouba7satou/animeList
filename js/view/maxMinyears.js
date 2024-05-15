import { API_URL } from "../config.js";
import { fetchApi } from "../helper.js";

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
export const maxminYear = await MaxMinYearSeason();
console.log(maxminYear);
