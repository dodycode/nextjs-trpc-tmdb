import { api } from "~/trpc/react";

export default function useMovieCredits(movieId: number, type: "movie" | "tv") {
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
    },
  );

  // Custom isLoading
  const isLoading = isFetching || isPending;

  return { movieCredits, isLoadingMovieCredits: isLoading };
}
