import { PageHeader } from "~/components/page-header";
import { Filters } from "../_components/filters";
import { SearchInput } from "../_components/search-input";

import { Container } from "~/components/container";
import { KoreanTVShowList } from "./_components/series";

export default function KSeries() {
  return (
    <Container className="flex flex-col gap-14 py-8">
      <SearchInput />
      <div className="flex flex-col gap-6">
        <PageHeader title="K-Series">
          <Filters />
        </PageHeader>
        <KoreanTVShowList />
      </div>
    </Container>
  );
}
