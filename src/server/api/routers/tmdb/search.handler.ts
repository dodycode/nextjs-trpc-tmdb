import { Filter } from "bad-words";

import { publicProcedure } from "../../trpc";
import { DiscoverResponse } from "./lib/schema";
import { tmdbAPI } from "./lib/utils";
import { searchHandlerSchema } from "./search.schema";

export const searchHandler = publicProcedure
  .output(DiscoverResponse)
  .input(searchHandlerSchema)
  .query(async ({ input }) => {
    const query = input?.query ?? "";

    // :)
    const filter = new Filter();
    const filteredQuery = filter.clean(query);

    const [tvResponse, movieResponse] = await Promise.all([
      tmdbAPI(
        `/search/tv?query=${filteredQuery.replace("*", "")}&page=1&include_adult=false`,
      ),
      tmdbAPI(
        `/search/movie?query=${filteredQuery.replace("*", "")}&page=1&include_adult=false`,
      ),
    ]);

    const [tvResponseJson, movieResponseJson] = (await Promise.all([
      tvResponse.json(),
      movieResponse.json(),
    ])) as [typeof DiscoverResponse, typeof DiscoverResponse];

    // parse responses (Need to do this to make typescript happy)
    const [tvResults, movieResults] = [
      DiscoverResponse.parse(tvResponseJson),
      DiscoverResponse.parse(movieResponseJson),
    ];

    // combine results
    const combinedResults = [...tvResults.results, ...movieResults.results];

    // Create the final response object
    const finalResponse = {
      page: 1,
      results: combinedResults,
      total_results: tvResults.total_results + movieResults.total_results,
      total_pages: Math.max(tvResults.total_pages, movieResults.total_pages),
    };

    // Parse and validate the response (Typescript still wants this)
    return DiscoverResponse.parse(finalResponse);
  });
