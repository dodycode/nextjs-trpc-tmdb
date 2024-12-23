"use client";

import { cache, useCallback, useEffect } from "react";
import { api } from "~/trpc/react";

const useDiscoverMovies = cache((type: "movie" | "tv") => {
  // Infinite Scroll
  const {
    data: movies,
    isPending,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = api.tmdb.discover.useInfiniteQuery(
    { type },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
        return null;
      },
      enabled: !!type,
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
