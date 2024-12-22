"use client";

import { api } from "~/trpc/react";
import { DetailsTabs } from "../../_components/tabs";
import { MovieJumbotron } from "./movie-jumbotron";
import { useEffect, useMemo } from "react";

export type MovieDetailsProp = {
  movieId: number;
};

const MovieDetails: React.FC<MovieDetailsProp> = ({ movieId }) => {
  const utils = api.useUtils();

  // we will consume this later inside child components
  const { isFetching, isPending } = api.tmdb.movieDetails.useQuery(
    { movie_id: movieId },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      enabled: !!movieId,
    },
  );

  const { isFetching: isFetchingCredits, isPending: isPendingCredits } =
    api.tmdb.movieCredits.useQuery(
      { movie_id: movieId },
      {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        enabled: !!movieId,
      },
    );

  const resetMovieDetails = async () => {
    // destroy the query states whenever the movieId changes
    await utils.tmdb.movieDetails.invalidate();
    await utils.tmdb.movieImages.invalidate();
    await utils.tmdb.movieCredits.invalidate();
    await utils.tmdb.movieVideos.invalidate();
  };

  const isLoading = useMemo(() => {
    return isFetching || isPending || isFetchingCredits || isPendingCredits;
  }, [isFetching, isPending, isFetchingCredits, isPendingCredits]);

  useEffect(() => {
    if (!movieId) return;
    void resetMovieDetails();
    // Prevent infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  // Todo: Design the skeleton UI
  if (isLoading) {
    return <div>Getting movie details...</div>;
  }

  return (
    <>
      <MovieJumbotron movieId={movieId} />
      <DetailsTabs type="movie" id={movieId} />
    </>
  );
};

export { MovieDetails };
