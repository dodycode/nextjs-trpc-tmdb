import { cache } from "react";
import { api, type RouterOutputs } from "~/trpc/react";

const useMovieVideos = cache(
  (
    movieId: number,
    type: "movie" | "tv",
    initialData?: RouterOutputs["tmdb"]["movieVideos"],
  ) => {
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
        refetchOnReconnect: false,
        // max-age one month
        staleTime: 2628000_000,
        initialData,
      },
    );

    // Custom isLoading
    const isLoading = isFetching || isPending;

    return { movieVideos, isLoadingMovieVideos: isLoading };
  },
);

export default useMovieVideos;
