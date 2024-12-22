"use client";

import { api } from "~/trpc/react";

export default function useMovieDetails(movieId: number, type: "movie" | "tv") {
  const {
    data: movieDetails,
    isFetching,
    isPending,
  } = api.tmdb.movieDetails.useQuery(
    {
      movie_id: movieId,
      type: type,
    },
    {
      enabled: !!movieId,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  // Custom isLoading
  const isLoading = isFetching || isPending;

  return { movieDetails, isLoadingMovieDetails: isLoading };
}
