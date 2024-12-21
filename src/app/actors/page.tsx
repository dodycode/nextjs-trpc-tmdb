import { PageHeader } from "~/components/page-header";
import { SearchInput } from "../_components/search-input";
import { Alert, AlertDescription } from "~/components/ui/alert";

import { Container } from "~/components/container";

export default function ActorsPage() {
  return (
    <Container className="flex flex-col gap-14 py-8">
      <SearchInput />
      <div className="flex flex-col gap-6">
        <PageHeader title="Actors" />
        <Alert className="bg-secondary text-secondary-foreground">
          <AlertDescription className="text-lg">Coming Soon!</AlertDescription>
        </Alert>
      </div>
    </Container>
  );
}
