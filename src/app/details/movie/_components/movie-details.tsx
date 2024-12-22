"use client";

import { useEffect, useMemo } from "react";

import { api } from "~/trpc/react";
import { DetailsTabs } from "../../_components/tabs";
import { Jumbotron } from "../../_components/jumbotron";

export type MovieDetailsProp = {
  movieId: number;
};

const MovieDetails: React.FC<MovieDetailsProp> = ({ movieId }) => {
  const utils = api.useUtils();

  const resetMovieDetails = async () => {
    // destroy the query states whenever the movieId changes
    await Promise.all([
      utils.tmdb.movieDetails.invalidate(),
      utils.tmdb.movieImages.invalidate(),
      utils.tmdb.movieCredits.invalidate(),
      utils.tmdb.movieVideos.invalidate(),
    ]);
  };

  useEffect(() => {
    if (!movieId) return;
    void resetMovieDetails();
    // Prevent infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  return (
    <>
      <Jumbotron type="movie" id={movieId} />
      {/* <DetailsTabs type="movie" id={movieId} /> */}
    </>
  );
};

export { MovieDetails };
