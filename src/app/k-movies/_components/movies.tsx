"use client";

import { MovieCard } from "~/components/movie-card";
import Link from "next/link";

import { api } from "~/trpc/react";
import { TVShowsGenresEnum } from "~/server/api/routers/tmdb/lib/enum";

const KoreanMovieList: React.FC = () => {
  const {
    data: MovieLists,
    isPending,
    isFetching,
  } = api.tmdb.discoverMovie.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (data) => {
      const mappedResults = data.results.map((result) => {
        return {
          ...result,
          // Get the genre names
          genres: result.genre_ids.map((id) => {
            const getKey = Object.entries(TVShowsGenresEnum).find(
              ([_, value]) => value === id,
            );
            if (!getKey?.[0]) return null;
            return getKey?.[0];
          }),
        };
      });

      return {
        ...data,
        results: mappedResults,
      };
    },
  });

  // Todo: Design a skeleton
  if (isPending || isFetching) {
    return <div>Loading....</div>;
  }

  return (
    <div className="grid grid-cols-2 items-stretch gap-2 md:grid-cols-4 lg:grid-cols-7">
      {MovieLists?.results.map((show) => {
        return (
          <Link key={show.id} href={`/details/movie/${show.id}`}>
            <MovieCard src={show.poster_path ?? ""} alt={show.original_title} />
          </Link>
        );
      })}
    </div>
  );
};

export { KoreanMovieList };
