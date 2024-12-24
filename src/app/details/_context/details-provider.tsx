"use client";

import { createContext, useContext } from "react";
import type { RouterOutputs } from "~/trpc/react";

type MovieDetailsContextType = {
  movieDetailsInitialData: RouterOutputs["tmdb"]["movieDetails"];
  movieCreditsInitialData: RouterOutputs["tmdb"]["movieCredits"];
  movieImagesInitialData: RouterOutputs["tmdb"]["movieImages"];
  movieVideosInitialData: RouterOutputs["tmdb"]["movieVideos"];
};

type Props = {
  movieDetailsInitialData: RouterOutputs["tmdb"]["movieDetails"];
  movieCreditsInitialData: RouterOutputs["tmdb"]["movieCredits"];
  movieImagesInitialData: RouterOutputs["tmdb"]["movieImages"];
  movieVideosInitialData: RouterOutputs["tmdb"]["movieVideos"];
  children: React.ReactNode;
};

const MovieDetailsContext = createContext<MovieDetailsContextType | undefined>(
  undefined,
);

export const useMovieDetailsContext = () => {
  const context = useContext(MovieDetailsContext);
  if (!context) {
    throw new Error(
      "useMovieDetailsContext must be used within a MovieDetailsProvider",
    );
  }
  return context;
};

export function MovieDetailsProvider({
  movieDetailsInitialData,
  movieCreditsInitialData,
  movieImagesInitialData,
  movieVideosInitialData,
  children,
}: Props) {
  return (
    <MovieDetailsContext.Provider
      value={{
        movieDetailsInitialData,
        movieCreditsInitialData,
        movieImagesInitialData,
        movieVideosInitialData,
      }}
    >
      {children}
    </MovieDetailsContext.Provider>
  );
}
