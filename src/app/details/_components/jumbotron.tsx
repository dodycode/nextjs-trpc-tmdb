"use client";

import React, { useEffect, useMemo, useRef } from "react";

import { buildThresholdList, generateVideoEmbedUrl } from "~/lib/utils";
import { JumbotronContent } from "./jumbotron-content";
import { useMovieDetailsContext } from "../_context/details-provider";
import useMovieVideos from "~/hooks/use-movie-videos";
import ReactPlayer from "react-player";
import { useIsMobile } from "~/hooks/use-mobile";
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

  const isMobile = useIsMobile();

  const {
    movieVideosInitialData,
    movieImagesInitialData,
    movieDetailsInitialData,
  } = useMovieDetailsContext();

  const { movieVideos, isLoadingMovieVideos } = useMovieVideos(
    id,
    type,
    movieVideosInitialData,
  );

  const { movieImages, isLoadingMovieImages } = useMovieImages(
    id,
    type,
    movieImagesInitialData,
  );

  const { movieDetails, isLoadingMovieDetails } = useMovieDetails(
    id,
    type,
    movieDetailsInitialData,
  );

  // change background image opacity on scroll
  useEffect(() => {
    if (isLoadingMovieVideos) return;

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
  }, [isLoadingMovieVideos]);

  const videoURL = useMemo(() => {
    if (movieVideos?.results?.length && !isLoadingMovieVideos) {
      // remove dubbed trailer
      const filteredResults = movieVideos.results.filter(
        (result) => !result.name.includes("[Dubbed]"),
      );

      const firstVideo = filteredResults[0];
      if (!firstVideo) return "";

      return generateVideoEmbedUrl(firstVideo.site, firstVideo.key) ?? "";
    }

    return "";
  }, [movieVideos, isLoadingMovieVideos]);

  const fallbackContent = useMemo(() => {
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
    movieImages,
    isLoadingMovieImages,
    movieDetails,
    isLoadingMovieDetails,
    type,
  ]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {videoURL && !isMobile && (
        <div
          className="absolute left-0 top-0 aspect-video h-full w-full"
          ref={bgImageRef}
        >
          <ReactPlayer
            url={videoURL}
            width="100%"
            height={isMobile ? "100dvh" : "100%"}
            playing={true}
            loop={true}
            playsinline={true}
            stopOnUnmount={true}
            muted={true}
            controls={false}
            style={{
              pointerEvents: "none",
              transform: "scale(1.35)",
              height: isMobile ? "100dvh" : "",
            }}
          />
        </div>
      )}

      {(!videoURL || isMobile) && fallbackContent.backdropPath && (
        <CldImage
          ref={bgImageRef}
          src={`${baseURL}${fallbackContent.backdropPath}`}
          alt={`${fallbackContent.title} backdrop`}
          className="object-cover object-center"
          quality={90}
          fill
          sizes="(max-width: 480px) 400px, (max-width: 768px) 600px, (max-width: 1024px) 800px, 100vw"
        />
      )}
      <Backdrop />
      <JumbotronContent type={type} id={id} />
    </div>
  );
};

export { Jumbotron };
