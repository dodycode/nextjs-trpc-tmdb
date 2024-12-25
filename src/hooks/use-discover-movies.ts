"use client";

import { parseAsArrayOf, parseAsInteger, useQueryState } from "nuqs";
import { cache, useCallback, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { api } from "~/trpc/react";

const useDiscoverMovies = cache((type: "movie" | "tv") => {
  const [sortBy] = useQueryState("sort_by");
  const [genres] = useQueryState(
    "genres",
    parseAsArrayOf(parseAsInteger, "|")
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );
  const [debouncedGenres] = useDebounce(genres, 1000);

  // Infinite Scroll
  const {
    data: movies,
    isPending,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = api.tmdb.discover.useInfiniteQuery(
    { type, sortBy, genres: debouncedGenres },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
        return null;
      },
      enabled: !!type || !!debouncedGenres,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 200
    ) {
      if (hasNextPage && !isFetching) {
        void fetchNextPage();
      }
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const isLoading = isPending || isFetching;

  return { movies, isLoading, hasNextPage, fetchNextPage };
});

export default useDiscoverMovies;
