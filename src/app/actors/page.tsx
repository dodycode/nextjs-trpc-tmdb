import { PageHeader } from "~/components/page-header";
import { SearchInput } from "../_components/search-input";

import { Container } from "~/components/container";
import { Actors } from "./_components/actors";

export default function ActorsPage() {
  return (
    <Container className="flex flex-col gap-14 py-8">
      <SearchInput />
      <div className="flex flex-col gap-6">
        <PageHeader title="Actors" />
        <Actors />
      </div>
    </Container>
  );
}
