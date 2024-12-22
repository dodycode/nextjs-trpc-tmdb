import { createTRPCRouter } from "../../trpc";
import { discoverHandler } from "./discover.handler";
import { movieCreditsHandler } from "./movieCredits.handler";
import { movieDetailsHeandler } from "./movieDetails.handler";
import { movieImagesHandler } from "./movieImages.handler";
import { movieVideosHandler } from "./movieVideos.handler";

// Todo: discover search
export const tmdbRouter = createTRPCRouter({
  discover: discoverHandler,
  movieCredits: movieCreditsHandler,
  movieDetails: movieDetailsHeandler,
  movieImages: movieImagesHandler,
  movieVideos: movieVideosHandler,
});
