"use client";

import { api } from "~/trpc/react";
import { Jumbotron } from "../../_components/jumbotron";
import type { MovieDetailsProp } from "./movie-details";
import { useMemo } from "react";

const MovieJumbotron: React.FC<MovieDetailsProp> = ({ movieId }) => {
  // Will consume later inside the jumbotron
  const { isFetching, isPending } = api.tmdb.movieImages.useQuery(
    {
      movie_id: movieId,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  );

  const { isFetching: isFetchingVideo, isPending: isPendingFetchingVideo } =
    api.tmdb.movieVideos.useQuery(
      {
        movie_id: movieId,
      },
      {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        enabled: !!movieId,
      },
    );

  const isLoading = useMemo(() => {
    return isFetching || isPending || isFetchingVideo || isPendingFetchingVideo;
  }, [isFetching, isPending, isFetchingVideo, isPendingFetchingVideo]);

  // Todo: Design the skeleton UI
  if (isLoading) {
    return <div>Loading jumbotron...</div>;
  }

  return <Jumbotron type="movie" id={movieId} />;
};

export { MovieJumbotron };
