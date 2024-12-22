import { createTRPCRouter } from "../../trpc";
import { discoverMovieHandler } from "./discoverMovie.handler";
import { discoverHandler } from "./discoverTVShows.handler";
import { movieCreditsHandler } from "./movieCredits.handler";
import { movieDetailsHeandler } from "./movieDetails.handler";
import { movieImagesHandler } from "./movieImages.handler";
import { movieVideosHandler } from "./movieVideos.handler";
import { tvShowCreditsHandler } from "./tvShowCredits.handler";
import { tvShowDetailsHandler } from "./tvShowDetails.handler";
import { tvShowImagesHandler } from "./tvShowImages.handler";
import { tvShowVideosHandler } from "./tvShowVideos.handler";

// Todo: Refactor this to prevent redundancy
export const tmdbRouter = createTRPCRouter({
  discoverTVShows: discoverHandler,
  discoverMovie: discoverMovieHandler,

  // Movie details
  movieCredits: movieCreditsHandler,
  movieDetails: movieDetailsHeandler,
  movieImages: movieImagesHandler,
  movieVideos: movieVideosHandler,

  // TV Show details
  tvShowDetails: tvShowDetailsHandler,
  tvShowCredits: tvShowCreditsHandler,
  tvShowImages: tvShowImagesHandler,
  tvShowVideos: tvShowVideosHandler,
});
