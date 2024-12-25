"server-only";

import { api } from "~/trpc/server";

export const prefetchDiscover = async (
  sortBy: string,
  genres: number[],
  type: "movie" | "tv",
) => {
  return await api.tmdb.discover.prefetchInfinite({
    type,
    cursor: 1,
    sortBy,
    genres,
  });
};
