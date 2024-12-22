import { z } from "zod";

export const MovieDetailsSchema = z.object({
  movie_id: z.number(),
  type: z.enum(["tv", "movie"]).optional().default("movie"),
});
