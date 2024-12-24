"use client";

import { DetailsTabs } from "../../../_components/tabs";
import { Jumbotron } from "../../../_components/jumbotron";
import { Container } from "~/components/container";

export type MovieDetailsProp = {
  movieId: number;
};

const MovieDetails: React.FC<MovieDetailsProp> = ({ movieId }) => {
  return (
    <Container className="flex flex-col gap-20 px-0 lg:px-0 lg:pl-20">
      <Jumbotron type="movie" id={movieId} />
      <DetailsTabs type="movie" id={movieId} />
    </Container>
  );
};

export { MovieDetails };
