"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { buildThresholdList } from "~/lib/utils";
import { JumbotronContent } from "./jumbotron-content";

import useMovieImages from "~/hooks/use-movie-images";
import useMovieDetails from "~/hooks/use-movie-details";
import CldImage from "~/components/cld-image";

const baseURL = "https://image.tmdb.org/t/p/original";

const Backdrop: React.FC = () => {
  return (
    <>
      <div className="bg-disney-details-gradient" />
      <div className="bg-disney-details-bottom-gradient" />
    </>
  );
};

export type JumbotronProps = {
  type: "movie" | "tv";
  id: number;
};

const Jumbotron: React.FC<JumbotronProps> = ({ type, id }) => {
  const bgImageRef = useRef<HTMLImageElement | null>(null);

  const { movieImages, isLoadingMovieImages } = useMovieImages(id, type);
  const { movieDetails, isLoadingMovieDetails } = useMovieDetails(id, type);

  // change background image opacity on scroll
  useEffect(() => {
    if (isLoadingMovieImages) return;

    setTimeout(() => {
      if (!bgImageRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const elem = entry.target as HTMLImageElement;
            if (elem) {
              // Get the original intersection ratio
              const originalRatio = entry.intersectionRatio;

              // Apply a more aggressive function to decrease the ratio quickly
              const adjustedRatio = Math.pow(originalRatio, 3);

              // Set the opacity using the adjusted ratio
              elem.style.opacity = adjustedRatio.toString();
            }
          });
        },
        {
          root: null,
          threshold: buildThresholdList(),
        },
      );

      observer.observe(bgImageRef.current);

      return () => observer.disconnect();
    }, 1000);
  }, [isLoadingMovieImages]);

  const content = useMemo(() => {
    let backdropPath = "";
    let title = "";
    if (movieImages?.backdrops.length && !isLoadingMovieImages) {
      backdropPath =
        movieImages.backdrops.find(
          (backdrop) =>
            backdrop.iso_639_1 === "en" ||
            backdrop.iso_639_1 === "uk" ||
            backdrop.iso_639_1 === "zh" ||
            backdrop.iso_639_1 === null,
        )?.file_path ?? "";
    }

    if (movieDetails && !isLoadingMovieDetails && type == "movie") {
      title = movieDetails.title ?? "";
    }

    if (movieDetails && !isLoadingMovieDetails && type == "tv") {
      title = movieDetails.name ?? "";
    }

    return {
      backdropPath,
      title,
    };
  }, [
    type,
    movieImages,
    isLoadingMovieImages,
    movieDetails,
    isLoadingMovieDetails,
  ]);

  // Todo: Design a better loading screen
  if (isLoadingMovieDetails || isLoadingMovieImages)
    return <div>Loading jumbotron</div>;

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      {content.backdropPath && (
        <CldImage
          ref={bgImageRef}
          src={`${baseURL}${content.backdropPath}`}
          alt={`${content.title} backdrop`}
          className="object-cover object-center"
          quality={100}
          fill
          sizes="100vw"
          priority={true}
        />
      )}
      <Backdrop />
      <JumbotronContent type={type} id={id} />
    </div>
  );
};

export { Jumbotron };
