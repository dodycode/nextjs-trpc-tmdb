export const maxDuration = 60; // This function can run for a maximum of 60 seconds
export const revalidate = 300; // revalidate at most every 5 minutes

import { PageHeader } from "~/components/page-header";
import { SearchInput } from "../_components/search-input";

import { Container } from "~/components/container";
import { Actors } from "./_components/actors";
import { api, HydrateClient } from "~/trpc/server";

export default async function ActorsPage() {
  const actors = await api.tmdb.people({ cursor: 1 });

  return (
    <HydrateClient>
      <Container className="flex flex-col gap-14 py-8">
        <SearchInput />
        <div className="flex flex-col gap-6">
          <PageHeader title="Actors" />
          <Actors initialData={actors} />
        </div>
      </Container>
    </HydrateClient>
  );
}
