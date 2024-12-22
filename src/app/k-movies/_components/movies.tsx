"use client";

import Link from "next/link";

import { MovieCard } from "~/components/movie-card";
import useDiscoverMovies from "~/hooks/use-discover-movies";

const KoreanMovieList: React.FC = () => {
  const { movies, isLoading } = useDiscoverMovies("movie");

  // Todo: Design a skeleton
  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (!movies) return null;

  return (
    <div className="grid grid-cols-2 items-stretch gap-2 md:grid-cols-4 lg:grid-cols-7">
      {movies.results.map((show) => {
        return (
          <Link key={show.id} href={`/details/movie/${show.id}`}>
            <MovieCard
              src={show.poster_path ?? ""}
              alt={show.original_title ?? ""}
            />
          </Link>
        );
      })}
    </div>
  );
};

export { KoreanMovieList };
