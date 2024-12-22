import { z } from "zod";

export const MovieCreditsSchema = z.object({
  movie_id: z.number(),
  type: z.enum(["tv", "movie"]).optional().default("movie"),
});
