"use client";

import { AutoComplete } from "~/components/autocomplete";
import { MultiSelectAutocomplete } from "~/components/multi-select-autocomplete";

const Filters: React.FC = () => {
  return (
    <div className="flex items-stretch justify-end gap-2 lg:gap-4">
      <AutoComplete
        options={[]}
        emptyMessage="No results"
        classNameInputWrapper="w-[100px]"
        rightIcon="caretDownAndUp"
        placeholder="Sort by"
        hideIcon
      />
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
