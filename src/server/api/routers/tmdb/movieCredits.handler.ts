import { publicProcedure } from "../../trpc";
import { MovieCreditsResponse } from "./lib/schema";
import { tmdbAPI } from "./lib/utils";
import { MovieCreditsSchema } from "./movieCredits.schema";

export const movieCreditsHandler = publicProcedure
  .output(MovieCreditsResponse)
  .input(MovieCreditsSchema)
  .query(async ({ input }) => {
    const response = await tmdbAPI(`/movie/${input.movie_id}/credits`);
    const responseJson = (await response.json()) as typeof MovieCreditsResponse;

    // Parse and validate the response so the typescript happy
    return MovieCreditsResponse.parse(responseJson);
  });
