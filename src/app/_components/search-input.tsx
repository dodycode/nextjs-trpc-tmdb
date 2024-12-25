"use client";

import { AutoComplete } from "~/components/autocomplete";
import { useDebounce } from "use-debounce";
import { api } from "~/trpc/react";
import { useMemo, useState } from "react";
import { useRouter } from "nextjs-toploader/app";

const SearchInput: React.FC = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000);
  const router = useRouter();

  const { data, isLoading } = api.tmdb.search.useQuery(
    {
      query: debouncedQuery ?? "",
    },
    {
      enabled: !!debouncedQuery,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );

  const options = useMemo(() => {
    if (data?.results?.length) {
      return data.results.map((movie) => ({
        label: movie.title ?? movie.name ?? "",
        value: movie.id?.toString() ?? "",
      }));
    }
    return [];
  }, [data]);

  return (
    <AutoComplete
      className="h-16 w-full"
      classNameInput="text-xl"
      options={options ?? []}
      emptyMessage="No results"
      leftIcon="search"
      leftIconClassName="size-8"
      placeholder="Movies, shows and more"
      inputValue={query ?? ""}
      onInputValueChange={setQuery}
      onValueChange={(value) => {
        // item selected
        // redirect to the item details
        const selectedMovie = data?.results.find(
          (movie) => movie.id?.toString() === value,
        );
        if (selectedMovie) {
          const type = selectedMovie?.name ? "tv" : "movie";
          router.push(`/details/${type}/${selectedMovie.id}`);
        }
      }}
      isLoading={isLoading}
      hideIcon
    />
  );
};

export { SearchInput };
