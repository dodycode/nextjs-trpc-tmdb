import { env } from "~/env";
import dayjs from "./dayjs";

// TMDB API v3
// I'm not using v4 yet because it's still not stable
const baseURL = "https://api.themoviedb.org/3";

export const tmdbAPI = async (endpointURL: string) => {
  const token = env.TMDB_API_KEY;
  if (!token) throw new Error("No token provided");

  if (!endpointURL) throw new Error("No endpoint URL provided");

  const response = await fetch(`${baseURL}${endpointURL}`, {
    // We are only doing GET requests for now
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const defaultFilter = (strParams: string[], movie?: boolean) => {
  strParams.push(`language=en-US`);
  strParams.push(`include_adult=false`);
  strParams.push(`with_original_language=ko`);

  // if (!movie) {
  //   //get shows that aired in the last 5 years
  //   const date5YearsAgo = dayjs().subtract(5, "year").format("YYYY-MM-DD");
  //   strParams.push(`first_air_date.gte=${date5YearsAgo}`);
  //   strParams.push(`include_null_first_air_dates=false`);
  // }

  if (movie) {
    strParams.push(`include_video=true`);
  }

  return strParams;
};
