"use client";

import { cache } from "react";
import { api, type RouterOutputs } from "~/trpc/react";

const useMovieDetails = cache(
  (
    movieId: number,
    type: "movie" | "tv",
    initialData?: RouterOutputs["tmdb"]["movieDetails"],
  ) => {
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
        initialData,
        enabled: !!movieId,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        // max-age one month
        staleTime: 2628000_000,
      },
    );

    // Custom isLoading
    const isLoading = isFetching || isPending;

    return { movieDetails, isLoadingMovieDetails: isLoading };
  },
);

export default useMovieDetails;
