import { PageHeader } from "~/components/page-header";
import { Filters } from "../_components/filters";
import { SearchInput } from "../_components/search-input";

import { Container } from "~/components/container";
import { KoreanMovieList } from "./_components/movies";
import { HydrateClient } from "~/trpc/server";
import { Suspense } from "react";
import { ShowsSkeleton } from "../_components/shows-skeleton";
import type { SearchParams } from "~/types/search-params";
import { prefetchDiscover } from "~/lib/prefetch-discover";

export const fetchCache = "default-cache";
// after 1 day
export const revalidate = 86400;

export default async function KMovies({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const urlParams = await searchParams;

  const sortBy = urlParams.sort_by ?? "popularity.desc";
  const genres = urlParams.genres
    ? urlParams.genres.split("|").map(Number).filter(Boolean)
    : [];

  await prefetchDiscover(sortBy, genres, "movie");

  return (
    <HydrateClient>
      <Container className="flex flex-col gap-14 py-8">
        <SearchInput />
        <div className="flex flex-col gap-6">
          <PageHeader title="K-Movies">
            <Filters type="movie" />
          </PageHeader>
          <Suspense fallback={<ShowsSkeleton />}>
            <KoreanMovieList />
          </Suspense>
        </div>
      </Container>
    </HydrateClient>
  );
}
