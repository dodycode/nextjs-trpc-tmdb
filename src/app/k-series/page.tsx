import { PageHeader } from "~/components/page-header";
import { Filters } from "../_components/filters";
import { SearchInput } from "../_components/search-input";

import { Container } from "~/components/container";
import { KoreanTVShowList } from "./_components/series";
import { api, HydrateClient } from "~/trpc/server";

export const fetchCache = "default-cache";
// after 1 day
export const revalidate = 86400;

export default function KSeries() {
  // Prefetch data in the server
  void api.tmdb.discover.prefetchInfinite({ type: "tv" });

  return (
    <HydrateClient>
      <Container className="flex flex-col gap-14 py-8">
        <SearchInput />
        <div className="flex flex-col gap-6">
          <PageHeader title="K-Series">
            <Filters />
          </PageHeader>
          <KoreanTVShowList />
        </div>
      </Container>
    </HydrateClient>
  );
}
