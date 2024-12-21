import { z } from "zod";

export const MovieCreditsSchema = z.object({
  movie_id: z.number(),
});
