import { createTRPCRouter } from "../../trpc";
import { discoverMovieHandler } from "./discoverMovie.handler";
import { discoverHandler } from "./discoverTVShows.handler";
import { movieCreditsHandler } from "./movieCredits.handler";
import { movieDetailsHeandler } from "./movieDetails.handler";
import { movieImagesHandler } from "./movieImages.handler";
import { movieVideosHandler } from "./movieVideos.handler";

// Todo: Movie, TV Details and Search
export const tmdbRouter = createTRPCRouter({
  discoverTVShows: discoverHandler,
  discoverMovie: discoverMovieHandler,

  // Movie details
  movieCredits: movieCreditsHandler,
  movieDetails: movieDetailsHeandler,
  movieImages: movieImagesHandler,
  movieVideos: movieVideosHandler,
});
