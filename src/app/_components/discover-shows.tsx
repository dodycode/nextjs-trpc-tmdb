"use client";

import { MovieCard } from "~/components/movie-card";
import Link from "next/link";
import useDiscoverMovies from "~/hooks/use-discover-movies";
import { Skeleton } from "~/components/ui/skeleton";
import { Fragment } from "react";

const DiscoverShows: React.FC = () => {
  const { movies, isLoading } = useDiscoverMovies("tv");

  if (!movies) return null;

  return (
    <div className="grid grid-cols-2 items-stretch gap-2 md:grid-cols-4 lg:grid-cols-7">
      {movies?.pages.map((page) => (
        <Fragment key={page.page}>
          {page.results.map((show) => (
            <Link key={show.id} href={`/details/tv/${show.id}`}>
              <MovieCard
                src={show.poster_path ?? ""}
                alt={show.original_name ?? ""}
              />
            </Link>
          ))}
        </Fragment>
      ))}
      {isLoading && (
        <>
          <Skeleton className="h-[250px] w-full lg:h-[280px]" />
        </>
      )}
    </div>
  );
};

export { DiscoverShows };
