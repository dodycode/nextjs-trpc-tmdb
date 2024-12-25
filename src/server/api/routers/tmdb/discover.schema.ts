import { z } from "zod";

export const DiscoverSchema = z
  .object({
    cursor: z.number().optional().default(1),
    sortBy: z.string().nullable().optional(),
    genres: z.array(z.number()).nullable().optional(),
    type: z.enum(["movie", "tv"]).optional().default("movie"),
  })
  .optional();
