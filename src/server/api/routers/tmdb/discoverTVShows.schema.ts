import { z } from "zod";
import { TVShowsSortByEnum } from "./lib/enum";

export const DiscoverSchema = z
  .object({
    page: z.number().optional().default(1),
    sortBy: z
      .enum([
        TVShowsSortByEnum.popularityAsc,
        TVShowsSortByEnum.popularityDesc,
        TVShowsSortByEnum.voteCountAsc,
        TVShowsSortByEnum.voteCountDesc,
        TVShowsSortByEnum.releaseDateAsc,
        TVShowsSortByEnum.releaseDateDesc,
      ])
      .optional()
      .default(TVShowsSortByEnum.popularityDesc),
    genres: z.array(z.number()).optional(),
  })
  .optional();
