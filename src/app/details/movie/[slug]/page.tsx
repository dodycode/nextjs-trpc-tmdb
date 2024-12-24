import { MovieDetails } from "./_components/movie-details";
import { notFound } from "next/navigation";
import { api, HydrateClient } from "~/trpc/server";
import { MovieDetailsProvider } from "../../_context/details-provider";

export const fetchCache = "default-cache";
// after 1 month
export const revalidate = 2628000;

export default async function Movie({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  if (!slug) {
    return notFound();
  }

  // Prefetch data in the server
  const [movieDetails, movieImages, movieCredits, movieVideos] =
    await Promise.all([
      api.tmdb.movieDetails({
        movie_id: parseInt(slug),
        type: "movie",
      }),
      api.tmdb.movieImages({
        movie_id: parseInt(slug),
        type: "movie",
      }),
      api.tmdb.movieCredits({
        movie_id: parseInt(slug),
        type: "movie",
      }),
      api.tmdb.movieVideos({
        movie_id: parseInt(slug),
        type: "movie",
      }),
    ]);

  return (
    <HydrateClient>
      <MovieDetailsProvider
        movieDetailsInitialData={movieDetails}
        movieCreditsInitialData={movieCredits}
        movieImagesInitialData={movieImages}
        movieVideosInitialData={movieVideos}
      >
        <MovieDetails movieId={parseInt(slug)} />
      </MovieDetailsProvider>
    </HydrateClient>
  );
}
