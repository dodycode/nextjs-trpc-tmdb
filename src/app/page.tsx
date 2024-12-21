import { PageHeader } from "~/components/page-header";
import { Filters } from "./_components/filters";
import { DiscoverShows } from "./_components/discover-shows";
import { SearchInput } from "./_components/search-input";
import { Container } from "~/components/container";

export default function Home() {
  return (
    <Container className="flex flex-col gap-14 py-8">
      <SearchInput />
      <div className="flex flex-col gap-6">
        <PageHeader title="Discover">
          <Filters />
        </PageHeader>
        <DiscoverShows />
      </div>
    </Container>
  );
}
