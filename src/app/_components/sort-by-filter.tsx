"use client";

import { useMemo } from "react";
import { useQueryState } from "nuqs";

import { AutoComplete } from "~/components/autocomplete";
import { getLabelFromSortbyEnums } from "~/lib/utils";
import {
  MovieSortByEnum,
  TVShowsSortByEnum,
} from "~/server/api/routers/tmdb/lib/enum";

const SortByFilter: React.FC<{ type: "movie" | "tv" }> = ({ type }) => {
  const [sortBy, setSortBy] = useQueryState("sort_by");

  const sortByOptions = useMemo(() => {
    if (type === "movie") {
      return Object.values(MovieSortByEnum).map((sortBy) => ({
        label: getLabelFromSortbyEnums(sortBy),
        value: sortBy,
      }));
    } else {
      return Object.values(TVShowsSortByEnum).map((sortBy) => ({
        label: getLabelFromSortbyEnums(sortBy),
        value: sortBy,
      }));
    }
  }, [type]);

  return (
    <AutoComplete
      options={sortByOptions}
      emptyMessage="No results"
      classNameInputWrapper="w-[100px]"
      rightIcon="caretDownAndUp"
      placeholder="Sort by"
      classNameInput="cursor-pointer"
      value={sortBy ?? ""}
      onValueChange={(value) => {
        void setSortBy(value);
      }}
      hideIcon
    />
  );
};

export { SortByFilter };
