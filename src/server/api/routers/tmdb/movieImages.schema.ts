import { z } from "zod";

export const MovieImagesSchema = z.object({
  movie_id: z.number(),
});
