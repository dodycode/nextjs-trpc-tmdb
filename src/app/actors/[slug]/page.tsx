import { BackgroundStars } from "~/components/background-stars";
import { Container } from "~/components/container";
import { Header } from "./_components/header";
import { DetailsTabs } from "./_components/tabs";

export default function ActorDetailsPage() {
  return (
    <div className="bg-disney-actor-details-gradient">
      <Container className="relative flex flex-col gap-20 px-0 lg:px-0 lg:pl-20">
        <BackgroundStars>
          <Header />
          <DetailsTabs />
        </BackgroundStars>
      </Container>
    </div>
  );
}
