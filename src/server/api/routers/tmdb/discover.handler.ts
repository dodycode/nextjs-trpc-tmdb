import { publicProcedure } from "~/server/api/trpc";
import { DiscoverSchema } from "./discover.schema";
import {
  MovieGenresEnum,
  MovieSortByEnum,
  TVShowsGenresEnum,
  TVShowsSortByEnum,
} from "./lib/enum";
import { defaultFilter, tmdbAPI } from "./lib/utils";
import { DiscoverResponse } from "./lib/schema";
import dayjs from "dayjs";

export const discoverHandler = publicProcedure
  .output(DiscoverResponse)
  .input(DiscoverSchema)
  .query(async ({ input }) => {
    const sortByEnum =
      input?.type === "movie" ? MovieSortByEnum : TVShowsSortByEnum;
    const genresEnum =
      input?.type === "movie" ? MovieGenresEnum : TVShowsGenresEnum;

    const page = input?.cursor ?? 1;
    const sortBy = input?.sortBy ?? sortByEnum.popularityDesc;
    const genres = input?.genres ?? [];

    // query builder
    const strParams = defaultFilter([], input?.type === "movie");

    // No genres provided
    if (!genres?.length) {
      const strGenres = Object.values(genresEnum).join("|");
      strParams.push(`with_genres=${strGenres}`);
    } else {
      strParams.push(`with_genres=${genres.join("|")}`);
    }

    if (page) {
      strParams.push(`page=${page}`);
    }

    if (sortBy) {
      strParams.push(`sort_by=${sortBy}`);

      if (sortBy === sortByEnum.popularityDesc) {
        // make sure it has vote average of 7 or more
        // we are using vote average because we want to show popular shows with good ratings
        strParams.push(`vote_average.gte=7`);
        strParams.push(`vote_count.gte=50`);
      }

      if (sortBy === sortByEnum.releaseDateDesc) {
        // make sure we get maximum next month shows
        const firstDayOfNextMonth = dayjs()
          .add(1, "month")
          .startOf("month")
          .format("YYYY-MM-DD");
        if (input?.type === "tv") {
          strParams.push(`air_date.lte=${firstDayOfNextMonth}`);
        }

        if (input?.type === "movie") {
          strParams.push(`primary_release_date.lte=${firstDayOfNextMonth}`);
        }
      }
    }

    const response = await tmdbAPI(
      `/discover/${input?.type}?${strParams.join("&")}`,
    );

    const responseJson = (await response.json()) as typeof DiscoverResponse;

    // Parse and validate the response to make the typescript happy
    return DiscoverResponse.parse(responseJson);
  });
