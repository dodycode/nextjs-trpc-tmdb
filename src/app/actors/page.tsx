export const fetchCache = "default-cache";
// after 1 month
export const revalidate = 2628000;

import { PageHeader } from "~/components/page-header";
import { SearchInput } from "../_components/search-input";

import { Container } from "~/components/container";
import { api, HydrateClient } from "~/trpc/server";
import { Actors } from "./_components/actors";

export default async function ActorsPage() {
  const actors = await api.tmdb.people({ cursor: 1 });

  return (
    <HydrateClient>
      <Container className="flex flex-col gap-14 py-8">
        <SearchInput />
        <div className="flex flex-col gap-6">
          <PageHeader title="Popular People" />
          <Actors initialData={actors} />
        </div>
      </Container>
    </HydrateClient>
  );
}
