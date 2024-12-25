import { parseAsArrayOf, parseAsInteger, useQueryState } from "nuqs";
import { useMemo } from "react";
import { MultiSelectAutocomplete } from "~/components/multi-select-autocomplete";
import { getMovieGenreKeys } from "~/lib/utils";
import {
  MovieGenresEnum,
  TVShowsGenresEnum,
} from "~/server/api/routers/tmdb/lib/enum";

const GenreFilter: React.FC<{ type: "movie" | "tv" }> = ({ type }) => {
  const [genres, setGenres] = useQueryState(
    "genres",
    parseAsArrayOf(parseAsInteger, "|")
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const options = useMemo(() => {
    if (type === "movie") {
      return Object.values(MovieGenresEnum).map((genre) => ({
        label: getMovieGenreKeys(MovieGenresEnum, genre) as string,
        value: genre?.toString() ?? "",
      }));
    } else {
      return Object.values(TVShowsGenresEnum).map((genre) => ({
        label: getMovieGenreKeys(TVShowsGenresEnum, genre) as string,
        value: genre?.toString() ?? "",
      }));
    }
  }, [type]);

  return (
    <MultiSelectAutocomplete
      classNameInputWrapper="w-[180px] flex-none"
      options={options}
      placeholder="Genres"
      emptyMessage="No results found."
      values={genres ? genres.map((genre) => genre.toString()) : []}
      onValuesChange={(values) => {
        if (!values.length) void setGenres(null);
        void setGenres(values.map((value) => parseInt(value)));
      }}
    />
  );
};

export { GenreFilter };
