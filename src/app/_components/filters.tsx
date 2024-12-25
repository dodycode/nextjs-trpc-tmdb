"use client";

import { useMemo } from "react";
import { AutoComplete } from "~/components/autocomplete";
import { MultiSelectAutocomplete } from "~/components/multi-select-autocomplete";
import { getLabelFromSortbyEnums } from "~/lib/utils";
import {
  MovieSortByEnum,
  TVShowsSortByEnum,
} from "~/server/api/routers/tmdb/lib/enum";
import { SortByFilter } from "./sort-by-filter";

interface Props {
  type: "movie" | "tv";
}

const Filters: React.FC<Props> = ({ type }) => {
  return (
    <div className="flex items-stretch justify-end gap-2 lg:gap-4">
      <SortByFilter type={type} />
      <MultiSelectAutocomplete
        classNameInputWrapper="w-[180px] flex-none"
        options={[]}
        placeholder="Genres"
        emptyMessage="No results found."
        values={[]}
        onValuesChange={() => {
          return;
        }}
      />
    </div>
  );
};

export { Filters };
