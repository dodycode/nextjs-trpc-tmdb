import { z } from "zod";
import { MovieSortByEnum } from "./lib/enum";

export const DiscoverMovieSchema = z
  .object({
    page: z.number().optional().default(1),
    sortBy: z
      .enum([
        MovieSortByEnum.popularityAsc,
        MovieSortByEnum.popularityDesc,
        MovieSortByEnum.voteCountAsc,
        MovieSortByEnum.voteCountDesc,
        MovieSortByEnum.releaseDateAsc,
        MovieSortByEnum.releaseDateDesc,
      ])
      .optional()
      .default(MovieSortByEnum.popularityDesc),
    genres: z.array(z.number()).optional(),
  })
  .optional();
