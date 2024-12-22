import { api } from "~/trpc/react";

export default function useMovieVideos(movieId: number, type: "movie" | "tv") {
  const {
    data: movieVideos,
    isFetching,
    isPending,
  } = api.tmdb.movieVideos.useQuery(
    { movie_id: movieId, type: type },
    {
      enabled: !!movieId,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  // Custom isLoading
  const isLoading = isFetching || isPending;

  return { movieVideos, isLoadingMovieVideos: isLoading };
}
