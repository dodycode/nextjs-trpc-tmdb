import { z } from "zod";

export const MovieVideosSchema = z.object({
  movie_id: z.number(),
  type: z.enum(["tv", "movie"]).optional().default("movie"),
});
