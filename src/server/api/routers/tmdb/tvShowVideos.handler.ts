import { publicProcedure } from "../../trpc";
import { tvShowVideosSchema } from "./tvShowVideos.schema";
import { tmdbAPI } from "./lib/utils";
import { TVShowVideosResponse } from "./lib/schema";

export const tvShowVideosHandler = publicProcedure
  .output(TVShowVideosResponse)
  .input(tvShowVideosSchema)
  .query(async ({ input }) => {
    const response = await tmdbAPI(`/tv/${input.show_id}/videos`);
    const responseJson = (await response.json()) as typeof TVShowVideosResponse;

    // Parse and validate the response so the typescript happy
    return TVShowVideosResponse.parse(responseJson);
  });
