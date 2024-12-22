import { useMemo } from "react";

import Image from "next/image";
import { Icon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { JumbotronMetadata } from "./jumbotron-metadata";

import type { JumbotronProps } from "./jumbotron";
import { JumbotronTrailerModal } from "./jumbotron-trailer-modal";
import useMovieImages from "~/hooks/use-movie-images";
import useMovieDetails from "~/hooks/use-movie-details";

const logobaseURL = "https://image.tmdb.org/t/p/w300";

const JumbotronContent: React.FC<JumbotronProps> = ({ type, id }) => {
  const { movieImages, isLoadingMovieImages } = useMovieImages(id, type);
  const { movieDetails, isLoadingMovieDetails } = useMovieDetails(id, type);

  const content = useMemo(() => {
    // get logo
    let logoPath = "";
    let overview = "";
    let genres = "";
    let title = "";

    if (movieImages?.logos.length && !isLoadingMovieImages) {
      logoPath =
        movieImages.logos.find(
          (logo) =>
            logo.iso_639_1 === "en" ||
            logo.iso_639_1 === "uk" ||
            logo.iso_639_1 === "zh" ||
            logo.iso_639_1 === null,
        )?.file_path ?? "";
    }

    if (movieDetails && !isLoadingMovieDetails) {
      overview = movieDetails.overview ?? "";
      genres = movieDetails.genres?.map((genre) => genre.name).join(", ") ?? "";
      title = movieDetails.title ?? movieDetails.name ?? "";
    }

    return {
      logoPath,
      overview,
      genres,
      title,
    };
  }, [movieImages, movieDetails, isLoadingMovieImages, isLoadingMovieDetails]);

  return (
    <div className="relative flex h-full w-full flex-col justify-end gap-4 px-4 pb-10 lg:max-w-[30vw]">
      <Image
        src={`${logobaseURL}${content.logoPath}`}
        alt={content.title}
        width={300}
        height={100}
        quality={100}
        sizes="(max-width: 768px) 300px, (max-width: 1024px) 300px, 300px"
      />
      <JumbotronMetadata type={type} id={id} />
      <div className="min-h-6">
        <p>{content.overview}</p>
      </div>
      <span className="font-bold">{content.genres}</span>
      <div className="flex items-stretch gap-4">
        <JumbotronTrailerModal id={id} type={type} />
        <Button variant="secondary" className="size-14 flex-none">
          <Icon type="plus" />
        </Button>
      </div>
    </div>
  );
};

export { JumbotronContent };