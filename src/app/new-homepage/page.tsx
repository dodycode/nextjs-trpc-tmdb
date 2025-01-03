// Todo:
// 1. complete the design
// 2. integrate backend
// 3. replace home page with this page

import { Container } from "~/components/container";
import { PopularSection } from "./_components/popular-section";

export default function NewHome() {
  return (
    <Container className="flex flex-col gap-14 py-8">
      <PopularSection />
      <div>Newest</div>
      <div>Thriller</div>
      <div>Discover Button</div>
    </Container>
  );
}
