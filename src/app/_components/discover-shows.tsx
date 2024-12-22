"use client";

import { MovieCard } from "~/components/movie-card";
import Link from "next/link";
import useDiscoverMovies from "~/hooks/use-discover-movies";

const DiscoverShows: React.FC = () => {
  const { movies, isLoading } = useDiscoverMovies("tv");

  // Todo: Design a skeleton
  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (!movies) return null;

  return (
    <div className="grid grid-cols-2 items-stretch gap-2 md:grid-cols-4 lg:grid-cols-7">
      {movies?.results.map((show) => {
        return (
          <Link key={show.id} href={`/details/tv/${show.id}`}>
            <MovieCard src={show.poster_path ?? ""} alt={show.original_name} />
          </Link>
        );
      })}
    </div>
  );
};

export { DiscoverShows };
