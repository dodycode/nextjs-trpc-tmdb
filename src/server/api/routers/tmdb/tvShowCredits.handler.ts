import { publicProcedure } from "../../trpc";
import { TVShowCreditsResponse } from "./lib/schema";
import { tmdbAPI } from "./lib/utils";
import { tvShowCreditsSchema } from "./tvShowCredits.schema";

export const tvShowCreditsHandler = publicProcedure
  .output(TVShowCreditsResponse)
  .input(tvShowCreditsSchema)
  .query(async ({ input }) => {
    const response = await tmdbAPI(`/tv/${input.show_id}/aggregate_credits`);
    const responseJson =
      (await response.json()) as typeof TVShowCreditsResponse;

    // Parse and validate the response so the typescript happy
    return TVShowCreditsResponse.parse(responseJson);
  });
