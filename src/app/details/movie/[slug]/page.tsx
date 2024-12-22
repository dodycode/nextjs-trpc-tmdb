import { Container } from "~/components/container";
import { MovieDetails } from "../_components/movie-details";
import { notFound } from "next/navigation";

export default async function Movie({
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
      <MovieDetails movieId={parseInt(slug)} />
    </Container>
  );
}
