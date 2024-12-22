import { TabsContent } from "~/components/ui/tabs";
import type { DetailsTabsProps } from "./tabs";
import { api } from "~/trpc/react";
import { useMemo } from "react";
import ReactPlayer from "react-player/lazy";
import { generateVideoEmbedUrl } from "~/lib/utils";
import { VideoModal } from "./video-modal";

const DetailsVideos: React.FC<DetailsTabsProps> = ({ type, id }) => {
  const utils = api.useUtils();

  const videos = useMemo(() => {
    if (type === "movie") {
      const movieVideos = utils.tmdb.movieVideos.getData({ movie_id: id });
      if (movieVideos?.results.length) {
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
    }

    return [];
  }, [type, id, utils.tmdb.movieVideos]);

  return (
    <TabsContent value="videos">
      <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:pr-20">
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
