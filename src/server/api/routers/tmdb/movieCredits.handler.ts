import { publicProcedure } from "../../trpc";
import { MovieCreditsResponse, TVShowCreditsResponse } from "./lib/schema";
import { tmdbAPI } from "./lib/utils";
import { MovieCreditsSchema } from "./movieCredits.schema";

export const movieCreditsHandler = publicProcedure
  .input(MovieCreditsSchema)
  .query(async ({ input }) => {
    const response = await tmdbAPI(
      `/${input.type ? input.type : "movie"}/${input.movie_id}/${
        input.type === "movie" ? "credits" : "aggregate_credits"
      }`,
    );

    if (input.type === "movie") {
      const responseJson =
        (await response.json()) as typeof MovieCreditsResponse;

      // Parse and validate the response so the typescript happy
      return MovieCreditsResponse.parse(responseJson);
    }

    if (input.type === "tv") {
      const responseJson =
        (await response.json()) as typeof TVShowCreditsResponse;

      // Parse and validate the response so the typescript happy
      return TVShowCreditsResponse.parse(responseJson);
    }
  });
