"use client";

import { DetailsTabs } from "../../_components/tabs";
import { Jumbotron } from "../../_components/jumbotron";
import useMovieDetailsPage from "~/hooks/use-movie-details-page";

export type MovieDetailsProp = {
  movieId: number;
};

const MovieDetails: React.FC<MovieDetailsProp> = ({ movieId }) => {
  useMovieDetailsPage(movieId);

  return (
    <>
      <Jumbotron type="movie" id={movieId} />
      <DetailsTabs type="movie" id={movieId} />
    </>
  );
};

export { MovieDetails };
