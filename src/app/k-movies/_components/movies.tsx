"use client";

import Link from "next/link";
import { Fragment } from "react";

import { MovieCard } from "~/components/movie-card";
import { Skeleton } from "~/components/ui/skeleton";
import useDiscoverMovies from "~/hooks/use-discover-movies";

const KoreanMovieList: React.FC = () => {
  const { movies, isLoading } = useDiscoverMovies("movie");

  if (!movies) return null;

  return (
    <div className="grid grid-cols-2 items-stretch gap-2 md:grid-cols-4 lg:grid-cols-7">
      {movies?.pages.map((page) => (
        <Fragment key={page.page}>
          {page.results.map((show) => (
            <Link key={show.id} href={`/details/movie/${show.id}`}>
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

export { KoreanMovieList };
