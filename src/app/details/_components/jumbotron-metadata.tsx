import { DotSeparator } from "~/components/dot-separator";
import type { JumbotronProps } from "./jumbotron";
import { api } from "~/trpc/react";
import { useMemo } from "react";
import dayjs from "dayjs";

const JumbotronMetadata: React.FC<JumbotronProps> = ({ type, id }) => {
  const utils = api.useUtils();

  const releaseDate = useMemo(() => {
    if (type === "movie") {
      const movieDetails = utils.tmdb.movieDetails.getData({
        movie_id: id,
      });
      return dayjs(movieDetails?.release_date ?? "").format("YYYY");
    }

    return "";
  }, [type, id, utils.tmdb.movieDetails]);

  return (
    <div className="group flex items-baseline gap-3 text-base">
      <span className="font-bold">{releaseDate}</span>
      <DotSeparator />
      <span>{type === "movie" ? "Movie" : "TV Series"}</span>
      {type === "tv" && (
        <>
          <DotSeparator />
          <span>16 episodes</span>
        </>
      )}
    </div>
  );
};

export { JumbotronMetadata };
