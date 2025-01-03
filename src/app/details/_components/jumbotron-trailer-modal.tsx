"use client";
import { useMemo } from "react";

import ReactPlayer from "react-player/lazy";

import { Icon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import type { JumbotronProps } from "./jumbotron";

import { generateVideoEmbedUrl } from "~/lib/utils";
import { useIsMobile } from "~/hooks/use-mobile";
import useMovieVideos from "~/hooks/use-movie-videos";
import { useMovieDetailsContext } from "../_context/details-provider";

const JumbotronTrailerModal: React.FC<JumbotronProps> = ({ id, type }) => {
  const isMobile = useIsMobile();

  const { movieVideosInitialData } = useMovieDetailsContext();

  const { movieVideos, isLoadingMovieVideos } = useMovieVideos(
    id,
    type,
    movieVideosInitialData,
  );

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="bg-disney-secondary hover:bg-disney-secondary flex h-14 flex-grow items-center rounded-lg text-lg text-[#0f1014] transition-all hover:scale-95"
          disabled={!videoURL}
        >
          <Icon type="play" />
          Watch Trailer
        </Button>
      </DialogTrigger>
      <DialogContent
        className="h-dvh min-w-[70vw] border-none bg-transparent p-0 lg:h-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="hidden">&nbsp;</DialogTitle>
        <ReactPlayer
          url={videoURL}
          width="100%"
          height={isMobile ? "100dvh" : "500px"}
          playing={true}
          loop={true}
          playsinline={true}
          stopOnUnmount={true}
        />
      </DialogContent>
    </Dialog>
  );
};

export { JumbotronTrailerModal };
