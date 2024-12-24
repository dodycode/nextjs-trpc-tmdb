import { PageHeader } from "~/components/page-header";
import { Filters } from "./_components/filters";
import { DiscoverShows } from "./_components/discover-shows";
import { SearchInput } from "./_components/search-input";
import { Container } from "~/components/container";
import { api, HydrateClient } from "~/trpc/server";

// stale while revalidate
export const fetchCache = "default-cache";
// after 1 day
export const revalidate = 86400;

export default function Home() {
  void api.tmdb.discover.prefetchInfinite({ type: "tv" });

  return (
    <HydrateClient>
      <Container className="flex flex-col gap-14 py-8">
        <SearchInput />
        <div className="flex flex-col gap-6">
          <PageHeader title="Discover">
            <Filters />
          </PageHeader>
          <DiscoverShows />
        </div>
      </Container>
    </HydrateClient>
  );
}
