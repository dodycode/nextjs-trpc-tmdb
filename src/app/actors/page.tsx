export const maxDuration = 60; // This function can run for a maximum of 60 seconds
// after 1 month
export const revalidate = 2628000;

import { PageHeader } from "~/components/page-header";
import { SearchInput } from "../_components/search-input";

import { Container } from "~/components/container";
import { api, HydrateClient } from "~/trpc/server";
import { Suspense } from "react";
import { ActorsSkeleton } from "./_components/actors-skeleton";
import { Actors } from "./_components/actors";

export default async function ActorsPage() {
  const actors = await api.tmdb.people({ cursor: 1 });

  return (
    <HydrateClient>
      <Container className="flex flex-col gap-14 py-8">
        <SearchInput />
        <div className="flex flex-col gap-6">
          <PageHeader title="Popular People" />
          <Suspense fallback={<ActorsSkeleton />}>
            <Actors initialData={actors} />
          </Suspense>
        </div>
      </Container>
    </HydrateClient>
  );
}
