"use client";

import { cache } from "react";
import { api } from "~/trpc/react";

const useMovieImages = cache((movieId: number, type: "movie" | "tv") => {
  const {
    data: movieImages,
    isFetching,
    isPending,
  } = api.tmdb.movieImages.useQuery(
    { movie_id: movieId, type: type },
    {
      enabled: !!movieId,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      // max-age one month
      staleTime: 30 * 24 * 60 * 60 * 1000,
    },
  );

  // Custom isLoading
  const isLoading = isFetching || isPending;

  return { movieImages, isLoadingMovieImages: isLoading };
});

export default useMovieImages;
