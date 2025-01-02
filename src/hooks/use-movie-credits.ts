import { cache } from "react";
import { api, type RouterOutputs } from "~/trpc/react";

const useMovieCredits = cache(
  (
    movieId: number,
    type: "movie" | "tv",
    initialData?: RouterOutputs["tmdb"]["movieCredits"],
  ) => {
    const {
      data: movieCredits,
      isFetching,
      isPending,
    } = api.tmdb.movieCredits.useQuery(
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

    return { movieCredits, isLoadingMovieCredits: isLoading };
  },
);

export default useMovieCredits;
