import { publicProcedure } from "../../trpc";
import { TVShowImagesResponse } from "./lib/schema";
import { tmdbAPI } from "./lib/utils";
import { tvShowImagesSchema } from "./tvShowImages.schema";

export const tvShowImagesHandler = publicProcedure
  .output(TVShowImagesResponse)
  .input(tvShowImagesSchema)
  .query(async ({ input }) => {
    const response = await tmdbAPI(`/tv/${input.show_id}/images`);
    const responseJson = (await response.json()) as typeof TVShowImagesResponse;

    // Parse and validate the response so the typescript happy
    return TVShowImagesResponse.parse(responseJson);
  });
