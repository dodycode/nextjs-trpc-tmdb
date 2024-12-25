"use client";

import { useMemo, useState } from "react";
import { useQueryState } from "nuqs";

import { AutoComplete } from "~/components/autocomplete";
import { getLabelFromSortbyEnums } from "~/lib/utils";
import {
  MovieSortByEnum,
  TVShowsSortByEnum,
} from "~/server/api/routers/tmdb/lib/enum";

const SortByFilter: React.FC<{ type: "movie" | "tv" }> = ({ type }) => {
  const [input, setInputValue] = useState("");
  const [sortBy, setSortBy] = useQueryState("sort_by");

  const options = useMemo(() => {
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
      options={options}
      emptyMessage="No results"
      classNameInputWrapper="w-[100px]"
      rightIcon="caretDownAndUp"
      placeholder="Sort by"
      classNameInput="cursor-pointer"
      value={sortBy ?? ""}
      inputValue={input}
      onInputValueChange={setInputValue}
      onValueChange={setSortBy}
      hideIcon
    />
  );
};

export { SortByFilter };
