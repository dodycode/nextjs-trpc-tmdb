"use client";

import { DetailsTabs } from "../../../_components/tabs";
import { Jumbotron } from "../../../_components/jumbotron";
import { Container } from "~/components/container";

export type TVShowDetailsProp = {
  movieId: number;
};

const TVShowDetails: React.FC<TVShowDetailsProp> = ({ movieId }) => {
  return (
    <Container className="flex flex-col px-0 lg:gap-20 lg:px-0 lg:pl-20">
      <Jumbotron type="tv" id={movieId} />
      <DetailsTabs type="tv" id={movieId} />
    </Container>
  );
};

export { TVShowDetails };
