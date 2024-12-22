"use client";

import { api } from "~/trpc/react";
import { Jumbotron } from "../../_components/jumbotron";
import type { MovieDetailsProp } from "./movie-details";

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

  // Todo: Design the skeleton UI
  if (isFetching || isPending) {
    return <div>Loading jumbotron...</div>;
  }

  return <Jumbotron type="movie" id={movieId} />;
};

export { MovieJumbotron };
