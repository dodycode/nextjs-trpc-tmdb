import { useMemo } from "react";
import ReactPlayer from "react-player/lazy";

import { TabsContent } from "~/components/ui/tabs";
import type { DetailsTabsProps } from "./tabs";
import { generateVideoEmbedUrl } from "~/lib/utils";
import { VideoModal } from "./video-modal";
import useMovieVideos from "~/hooks/use-movie-videos";
import { useMovieDetailsContext } from "../_context/details-provider";

const DetailsVideos: React.FC<DetailsTabsProps> = ({ type, id }) => {
  const { movieVideosInitialData } = useMovieDetailsContext();

  const { movieVideos, isLoadingMovieVideos } = useMovieVideos(
    id,
    type,
    movieVideosInitialData,
  );

  const videos = useMemo(() => {
    if (movieVideos?.results?.length && !isLoadingMovieVideos) {
      const filteredResults = movieVideos.results.filter(
        (result) => !result.name.includes("[Dubbed]"),
      );
      return filteredResults.map((video) => {
        const url = generateVideoEmbedUrl(video.site, video.key);
        if (!url) return null;

        return url;
      });
    }

    return [];
  }, [movieVideos, isLoadingMovieVideos]);

  return (
    <TabsContent value="videos">
      <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:pr-20">
        {isLoadingMovieVideos && "Loading..."}
        {!videos.length && "No videos found"}
        {videos.map((videoURL, index) => (
          <VideoModal key={index} url={videoURL ?? ""}>
            <div key={index ?? ""} className="cursor-pointer">
              <ReactPlayer
                url={videoURL ?? ""}
                width="100%"
                height="300px"
                light={true}
                playing={false}
                style={{
                  pointerEvents: "none",
                }}
              />
            </div>
          </VideoModal>
        ))}
      </div>
    </TabsContent>
  );
};

export { DetailsVideos };
