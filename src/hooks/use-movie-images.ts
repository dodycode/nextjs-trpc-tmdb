"use client";

import { cache } from "react";
import { api, type RouterOutputs } from "~/trpc/react";

const useMovieImages = cache(
  (
    movieId: number,
    type: "movie" | "tv",
    initialData?: RouterOutputs["tmdb"]["movieImages"],
  ) => {
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
        refetchOnReconnect: false,
        // max-age one month
        staleTime: 2628000_000,
        initialData,
      },
    );

    // Custom isLoading
    const isLoading = isFetching || isPending;

    return { movieImages, isLoadingMovieImages: isLoading };
  },
);

export default useMovieImages;
