import { publicProcedure } from "../../trpc";
import { TVShowDetailsResponse } from "./lib/schema";
import { tmdbAPI } from "./lib/utils";
import { tvShowDetailsSchema } from "./tvShowDetails.schema";

export const tvShowDetailsHandler = publicProcedure
  .output(TVShowDetailsResponse)
  .input(tvShowDetailsSchema)
  .query(async ({ input }) => {
    const response = await tmdbAPI(`/tv/${input.show_id}`);
    const responseJson =
      (await response.json()) as typeof TVShowDetailsResponse;

    // Parse and validate the response so the typescript happy
    return TVShowDetailsResponse.parse(responseJson);
  });
