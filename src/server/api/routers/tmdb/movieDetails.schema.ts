import { z } from "zod";

export const MovieDetailsSchema = z.object({
  movie_id: z.number(),
});
