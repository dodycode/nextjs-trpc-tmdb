import { createTRPCRouter } from "../../trpc";
import { discoverMovieHandler } from "./discoverMovie.handler";
import { discoverHandler } from "./discoverTVShows.handler";

// Todo: Movie, TV Details and Search
export const tmdbRouter = createTRPCRouter({
  discoverTVShows: discoverHandler,
  discoverMovie: discoverMovieHandler,
});
