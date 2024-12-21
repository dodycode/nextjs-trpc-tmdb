import { publicProcedure } from "~/server/api/trpc";

import { MovieGenresEnum, MovieSortByEnum } from "./lib/enum";
import { defaultFilter, tmdbAPI } from "./lib/utils";
import { DiscoverMovieResponse } from "./lib/schema";
import { DiscoverMovieSchema } from "./discoverMovie.schema";
import dayjs from "dayjs";

export const discoverMovieHandler = publicProcedure
  .output(DiscoverMovieResponse)
  .input(DiscoverMovieSchema)
  .query(async ({ input }) => {
    const page = input?.page ?? 1;
    const sortBy = input?.sortBy ?? MovieSortByEnum.popularityDesc;
    const genres = input?.genres ?? [];

    // query builder
    const strParams = defaultFilter([], true);

    // No genres provided
    if (!genres?.length) {
      const strGenres = Object.values(MovieGenresEnum).join("|");
      strParams.push(`with_genres=${strGenres}`);
    } else {
      strParams.push(`with_genres=${genres.join("|")}`);
    }

    if (page) {
      strParams.push(`page=${page}`);
    }

    if (sortBy) {
      strParams.push(`sort_by=${sortBy}`);

      if (sortBy === MovieSortByEnum.popularityDesc) {
        // make sure it has vote average of 7 or more
        // we are using vote average because we want to show popular shows with good ratings
        strParams.push(`vote_average.gte=7`);
        strParams.push(`vote_count.gte=50`);
      }

      if (sortBy === MovieSortByEnum.releaseDateDesc) {
        // make sure we get maximum next month shows
        const firstDayOfNextMonth = dayjs()
          .add(1, "month")
          .startOf("month")
          .format("YYYY-MM-DD");
        strParams.push(`primary_release_date.lte=${firstDayOfNextMonth}`);
      }
    }

    const response = await tmdbAPI(`/discover/movie?${strParams.join("&")}`);

    const responseJson =
      (await response.json()) as typeof DiscoverMovieResponse;

    // Parse and validate the response to make the typescript happy
    return DiscoverMovieResponse.parse(responseJson);
  });
