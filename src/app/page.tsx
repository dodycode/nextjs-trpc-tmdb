import { PageHeader } from "~/components/page-header";
import { Filters } from "./_components/filters";
import { DiscoverShows } from "./_components/discover-shows";
import { SearchInput } from "./_components/search-input";
import { Container } from "~/components/container";
import { HydrateClient } from "~/trpc/server";
import { prefetchDiscover } from "~/lib/prefetch-discover";
import type { SearchParams } from "~/types/search-params";

// stale while revalidate
export const fetchCache = "default-cache";
// after 1 day
export const revalidate = 86400;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const urlParams = await searchParams;

  const sortBy = urlParams.sort_by ?? "popularity.desc";
  const genres = urlParams.genres
    ? urlParams.genres.split("|").map(Number).filter(Boolean)
    : [];

  await prefetchDiscover(sortBy, genres, "tv");

  return (
    <HydrateClient>
      <Container className="flex flex-col gap-14 py-8">
        <SearchInput />
        <div className="flex flex-col gap-6">
          <PageHeader title="Discover">
            <Filters type="tv" />
          </PageHeader>
          <DiscoverShows />
        </div>
      </Container>
    </HydrateClient>
  );
}
