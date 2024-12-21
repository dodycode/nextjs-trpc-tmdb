import { publicProcedure } from "../../trpc";
import { MovieDetailsResponse } from "./lib/schema";
import { tmdbAPI } from "./lib/utils";
import { MovieDetailsSchema } from "./movieDetails.schema";

export const movieDetailsHeandler = publicProcedure
  .output(MovieDetailsResponse)
  .input(MovieDetailsSchema)
  .query(async ({ input }) => {
    const response = await tmdbAPI(`/movie/${input.movie_id}`);
    const responseJson = (await response.json()) as typeof MovieDetailsResponse;

    // Parse and validate the response so the typescript happy
    return MovieDetailsResponse.parse(responseJson);
  });
