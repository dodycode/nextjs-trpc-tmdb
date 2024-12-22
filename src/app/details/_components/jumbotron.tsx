"use client";

import React, { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { buildThresholdList } from "~/lib/utils";
import { JumbotronContent } from "./jumbotron-content";
import { api } from "~/trpc/react";

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
  const utils = api.useUtils();

  const bgImageRef = useRef<HTMLImageElement | null>(null);

  // change background image opacity on scroll
  useEffect(() => {
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
  }, []);

  const backdropPath = useMemo(() => {
    if (type === "movie") {
      const movieImages = utils.tmdb.movieImages.getData({
        movie_id: id,
      });

      if (movieImages?.backdrops.length) {
        return (
          movieImages.backdrops.find(
            (backdrop) =>
              backdrop.iso_639_1 === "en" ||
              backdrop.iso_639_1 === "uk" ||
              backdrop.iso_639_1 === "zh" ||
              backdrop.iso_639_1 === null,
          )?.file_path ?? ""
        );
      }

      return "";
    }

    // Todo: trpc api for tv show

    return "";
  }, [type, utils.tmdb.movieImages, id]);

  const title = useMemo(() => {
    if (type === "movie") {
      const movieDetails = utils.tmdb.movieDetails.getData({
        movie_id: id,
      });

      if (movieDetails) {
        return movieDetails.title;
      }
    }

    // todo: trpc api details for tv show
    return "";
  }, [type, utils.tmdb.movieDetails, id]);

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <Image
        ref={bgImageRef}
        src={`${baseURL}${backdropPath}`}
        alt={`${title} backdrop`}
        className="object-cover object-center"
        quality={100}
        fill
        sizes="100vw"
      />
      <Backdrop />
      <JumbotronContent type={type} id={id} />
    </div>
  );
};

export { Jumbotron };
