import { publicProcedure } from "../../trpc";
import { MovieImagesResponse } from "./lib/schema";
import { tmdbAPI } from "./lib/utils";
import { MovieImagesSchema } from "./movieImages.schema";

export const movieImagesHandler = publicProcedure
  .output(MovieImagesResponse)
  .input(MovieImagesSchema)
  .query(async ({ input }) => {
    const response = await tmdbAPI(
      `/${input.type ? input.type : "movie"}/${input.movie_id}/images`,
    );
    const responseJson = (await response.json()) as typeof MovieImagesResponse;

    // Parse and validate the response so the typescript happy
    return MovieImagesResponse.parse(responseJson);
  });
