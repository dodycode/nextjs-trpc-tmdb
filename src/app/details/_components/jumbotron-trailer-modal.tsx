"use client";

import ReactPlayer from "react-player/lazy";

import { Icon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { api } from "~/trpc/react";
import type { JumbotronProps } from "./jumbotron";
import { useMemo } from "react";
import { generateVideoEmbedUrl } from "~/lib/utils";
import { Skeleton } from "~/components/ui/skeleton";
import { useIsMobile } from "~/hooks/use-mobile";

const JumbotronTrailerModal: React.FC<Omit<JumbotronProps, "type">> = ({
  id,
}) => {
  const isMobile = useIsMobile();

  const { data, isFetching, isPending } = api.tmdb.movieVideos.useQuery(
    {
      movie_id: id,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      enabled: !!id,
    },
  );

  const videoURL = useMemo(() => {
    if (data?.results.length) {
      // remove dubbed trailer
      const filteredResults = data.results.filter(
        (result) => !result.name.includes("[Dubbed]"),
      );

      const firstVideo = filteredResults[0];
      if (!firstVideo) return "";

      return generateVideoEmbedUrl(firstVideo.site, firstVideo.key) ?? "";
    }

    return "";
  }, [data]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="bg-disney-secondary hover:bg-disney-secondary flex h-14 flex-grow items-center rounded-lg text-lg text-[#0f1014] transition-all hover:scale-95"
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
        {isFetching || isPending ? (
          <Skeleton className="h-[500px] w-full" />
        ) : (
          <ReactPlayer
            url={videoURL}
            width="100%"
            height={isMobile ? "100dvh" : "500px"}
            playing={true}
            loop={true}
            playsinline={true}
            stopOnUnmount={true}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export { JumbotronTrailerModal };
