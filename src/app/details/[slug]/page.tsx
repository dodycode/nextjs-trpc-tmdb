import { Container } from "~/components/container";
import { Jumbotron } from "./_components/jumbotron";
import { DetailsTabs } from "./_components/tabs";

export default function Movie() {
  return (
    <Container className="flex flex-col gap-20 px-0 lg:px-0 lg:pl-20">
      <Jumbotron />
      <DetailsTabs />
    </Container>
  );
}
