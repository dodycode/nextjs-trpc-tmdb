import { createTRPCRouter } from "../../trpc";
import { discoverHandler } from "./discoverTVShows.handler";

export const tmdbRouter = createTRPCRouter({
  discoverTVShows: discoverHandler,
});
