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
        // max-age one month
        staleTime: 30 * 24 * 60 * 60 * 1000,
        initialData,
      },
    );

    // Custom isLoading
    const isLoading = isFetching || isPending;

    return { movieCredits, isLoadingMovieCredits: isLoading };
  },
);

export default useMovieCredits;
