import { notFound } from "next/navigation";
import { TVShowDetails } from "./_components/tv-show-details";
import { api, HydrateClient } from "~/trpc/server";
import { MovieDetailsProvider } from "../../_context/details-provider";

export const fetchCache = "default-cache";
// after 1 month
export const revalidate = 2628000;

export default async function TV({
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
        type: "tv",
      }),
      api.tmdb.movieImages({
        movie_id: parseInt(slug),
        type: "tv",
      }),
      api.tmdb.movieCredits({
        movie_id: parseInt(slug),
        type: "tv",
      }),
      api.tmdb.movieVideos({
        movie_id: parseInt(slug),
        type: "tv",
      }),
    ]);

  return (
    <HydrateClient>
      <MovieDetailsProvider
        movieDetailsInitialData={movieDetails}
        movieImagesInitialData={movieImages}
        movieCreditsInitialData={movieCredits}
        movieVideosInitialData={movieVideos}
      >
        <TVShowDetails movieId={parseInt(slug)} />
      </MovieDetailsProvider>
    </HydrateClient>
  );
}
