import { DotSeparator } from "~/components/dot-separator";
import type { JumbotronProps } from "./jumbotron";
import { useMemo } from "react";
import dayjs from "dayjs";
import useMovieDetails from "~/hooks/use-movie-details";

const JumbotronMetadata: React.FC<JumbotronProps> = ({ type, id }) => {
  const { movieDetails, isLoadingMovieDetails } = useMovieDetails(id, type);

  const content = useMemo(() => {
    let releaseDate = "";
    let episodes = "";

    if (isLoadingMovieDetails)
      return {
        releaseDate,
        episodes,
      };

    if (type === "movie") {
      releaseDate = dayjs(movieDetails?.release_date ?? "").format("YYYY");
    }

    if (type === "tv") {
      releaseDate = dayjs(movieDetails?.first_air_date ?? "").format("YYYY");
      episodes = movieDetails?.number_of_episodes?.toString() ?? "";
    }

    return {
      releaseDate,
      episodes,
    };
  }, [type, isLoadingMovieDetails, movieDetails]);

  return (
    <div className="group flex items-baseline gap-3 text-base">
      <span className="font-bold">{content.releaseDate}</span>
      <DotSeparator />
      <span>{type === "movie" ? "Movie" : "TV Series"}</span>
      {type === "tv" && (
        <>
          <DotSeparator />
          <span>{content.episodes} episodes</span>
        </>
      )}
    </div>
  );
};

export { JumbotronMetadata };
