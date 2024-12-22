"use client";

import { DetailsTabs } from "../../_components/tabs";
import { Jumbotron } from "../../_components/jumbotron";
import useMovieDetailsPage from "~/hooks/use-movie-details-page";

export type TVShowDetailsProp = {
  movieId: number;
};

const TVShowDetails: React.FC<TVShowDetailsProp> = ({ movieId }) => {
  useMovieDetailsPage(movieId);

  return (
    <>
      <Jumbotron type="tv" id={movieId} />
      <DetailsTabs type="tv" id={movieId} />
    </>
  );
};

export { TVShowDetails };
