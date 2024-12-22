import { publicProcedure } from "../../trpc";
import {
  detailsResponse,
  type MovieDetailsResponse,
  type TVShowDetailsResponse,
} from "./lib/schema";
import { tmdbAPI } from "./lib/utils";
import { MovieDetailsSchema } from "./movieDetails.schema";

export const movieDetailsHeandler = publicProcedure
  .output(detailsResponse)
  .input(MovieDetailsSchema)
  .query(async ({ input }) => {
    const response = await tmdbAPI(
      `/${input.type ? input.type : "movie"}/${input.movie_id}`,
    );

    if (input.type === "movie") {
      const responseJson =
        (await response.json()) as typeof MovieDetailsResponse;

      // Parse and validate the response so the typescript happy
      return detailsResponse.parse({
        ...responseJson,
        details_type: "movie",
      });
    }

    if (input.type === "tv") {
      const responseJson =
        (await response.json()) as typeof TVShowDetailsResponse;

      // Parse and validate the response so the typescript happy
      return detailsResponse.parse({
        ...responseJson,
        details_type: "tv",
      });
    }

    // Add a default case to handle unexpected input.type values
    throw new Error(`Unsupported input type, only "movie" or "tv" are allowed`);
  });
