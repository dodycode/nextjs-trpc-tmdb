import { PageHeader } from "~/components/page-header";
import { Filters } from "../_components/filters";
import { SearchInput } from "../_components/search-input";

import { Container } from "~/components/container";
import { KoreanMovieList } from "./_components/movies";
import { HydrateClient } from "~/trpc/server";

export const fetchCache = "default-cache";
// after 1 day
export const revalidate = 86400;

export default function KMovies() {
  // Todo: research about how to correctly pre-fetch infinite query data in the server

  return (
    <HydrateClient>
      <Container className="flex flex-col gap-14 py-8">
        <SearchInput />
        <div className="flex flex-col gap-6">
          <PageHeader title="K-Movies">
            <Filters />
          </PageHeader>
          <KoreanMovieList />
        </div>
      </Container>
    </HydrateClient>
  );
}
