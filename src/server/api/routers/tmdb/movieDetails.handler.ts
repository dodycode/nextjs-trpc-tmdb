import { publicProcedure } from "../../trpc";
import { movieDetailsResponse } from "./lib/schema";
import { tmdbAPI } from "./lib/utils";
import { MovieDetailsSchema } from "./movieDetails.schema";

export const movieDetailsHeandler = publicProcedure
  .output(movieDetailsResponse)
  .input(MovieDetailsSchema)
  .query(async ({ input }) => {
    const response = await tmdbAPI(
      `/${input.type ? input.type : "movie"}/${input.movie_id}`,
    );

    const responseJson = (await response.json()) as typeof movieDetailsResponse;

    // Parse and validate the response so the typescript happy
    return movieDetailsResponse.parse(responseJson);
  });
