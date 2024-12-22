"use client";

import { api } from "~/trpc/react";

export default function useMovieImages(movieId: number, type: "movie" | "tv") {
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
    },
  );

  // Custom isLoading
  const isLoading = isFetching || isPending;

  return { movieImages, isLoadingMovieImages: isLoading };
}
