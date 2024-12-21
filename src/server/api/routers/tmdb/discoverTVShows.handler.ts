import { publicProcedure } from "~/server/api/trpc";
import { DiscoverSchema } from "./discoverTVShows.schema";
import { TVShowsGenresEnum, TVShowsSortByEnum } from "./lib/enum";
import { defaultFilter, tmdbAPI } from "./lib/utils";
import { DiscoverTVResponse } from "./lib/schema";
import dayjs from "dayjs";

export const discoverHandler = publicProcedure
  .output(DiscoverTVResponse)
  .input(DiscoverSchema)
  .query(async ({ input }) => {
    const page = input?.page ?? 1;
    const sortBy = input?.sortBy ?? TVShowsSortByEnum.popularityDesc;
    const genres = input?.genres ?? [];

    // query builder
    const strParams = defaultFilter([]);

    // No genres provided
    if (!genres?.length) {
      const strGenres = Object.values(TVShowsGenresEnum).join("|");
      strParams.push(`with_genres=${strGenres}`);
    } else {
      strParams.push(`with_genres=${genres.join("|")}`);
    }

    if (page) {
      strParams.push(`page=${page}`);
    }

    if (sortBy) {
      strParams.push(`sort_by=${sortBy}`);

      if (sortBy === TVShowsSortByEnum.popularityDesc) {
        // make sure it has vote average of 7 or more
        // we are using vote average because we want to show popular shows with good ratings
        strParams.push(`vote_average.gte=7`);
        strParams.push(`vote_count.gte=50`);
      }

      if (sortBy === TVShowsSortByEnum.releaseDateDesc) {
        // make sure we get maximum next month shows
        const firstDayOfNextMonth = dayjs()
          .add(1, "month")
          .startOf("month")
          .format("YYYY-MM-DD");
        strParams.push(`air_date.lte=${firstDayOfNextMonth}`);
      }
    }

    const response = await tmdbAPI(`/discover/tv?${strParams.join("&")}`);

    const responseJson = (await response.json()) as typeof DiscoverTVResponse;

    // Parse and validate the response to make the typescript happy
    return DiscoverTVResponse.parse(responseJson);
  });
