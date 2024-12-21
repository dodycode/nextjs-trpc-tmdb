import { publicProcedure } from "../../trpc";
import { MovieVideosSchema } from "./movieVIdeos.schema";
import { tmdbAPI } from "./lib/utils";
import { MovieVideosResponse } from "./lib/schema";

export const movieVideosHandler = publicProcedure
  .output(MovieVideosResponse)
  .input(MovieVideosSchema)
  .query(async ({ input }) => {
    const response = await tmdbAPI(`/movie/${input.movie_id}/videos`);
    const responseJson = (await response.json()) as typeof MovieVideosResponse;

    // Parse and validate the response so the typescript happy
    return MovieVideosResponse.parse(responseJson);
  });
