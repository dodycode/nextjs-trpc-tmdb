import { Container } from "~/components/container";
import { notFound } from "next/navigation";
import { TVShowDetails } from "../_components/tv-show-details";

export default async function TV({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  if (!slug) {
    return notFound();
  }

  return (
    <Container className="flex flex-col gap-20 px-0 lg:px-0 lg:pl-20">
      <TVShowDetails movieId={parseInt(slug)} />
    </Container>
  );
}
