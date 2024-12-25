"use client";

import { GenreFilter } from "./genre-filter";
import { SortByFilter } from "./sort-by-filter";

interface Props {
  type: "movie" | "tv";
}

const Filters: React.FC<Props> = ({ type }) => {
  return (
    <div className="flex items-stretch justify-end gap-2 lg:gap-4">
      <SortByFilter type={type} />
      <GenreFilter type={type} />
    </div>
  );
};

export { Filters };
