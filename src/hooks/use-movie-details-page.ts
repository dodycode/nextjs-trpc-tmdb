"use client";

import { useEffect } from "react";
import { api } from "~/trpc/react";

export default function useMovieDetailsPage(movieId: number) {
  const utils = api.useUtils();

  const resetMovieDetails = async () => {
    // destroy the query states whenever the movieId changes
    await Promise.all([
      utils.tmdb.movieDetails.invalidate(),
      utils.tmdb.movieImages.invalidate(),
      utils.tmdb.movieCredits.invalidate(),
      utils.tmdb.movieVideos.invalidate(),
    ]);
  };

  useEffect(() => {
    if (!movieId) return;
    void resetMovieDetails();
    // Prevent infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);
}
