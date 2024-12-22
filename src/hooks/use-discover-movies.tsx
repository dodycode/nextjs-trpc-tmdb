"use client";

import {
  MovieGenresEnum,
  TVShowsGenresEnum,
} from "~/server/api/routers/tmdb/lib/enum";
import { api } from "~/trpc/react";

export default function useDiscoverMovies(type: "movie" | "tv") {
  const {
    data: movies,
    isPending,
    isFetching,
  } = api.tmdb.discover.useQuery(
    { type },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      select: (data) => {
        const mappedResults = data.results?.map((result) => {
          return {
            ...result,
            // Get the genre names
            genres: result.genre_ids?.map((id) => {
              const enums =
                type === "movie" ? MovieGenresEnum : TVShowsGenresEnum;
              const getKey = Object.entries(enums).find(
                ([_, value]) => value === id,
              );
              if (!getKey?.[0]) return null;
              return getKey?.[0];
            }),
          };
        });

        return {
          ...data,
          results: mappedResults,
        };
      },
    },
  );

  const isLoading = isPending || isFetching;

  return { movies, isLoading };
}
