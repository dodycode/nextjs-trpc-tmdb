import { AutoComplete } from "~/components/autocomplete";

const SearchInput: React.FC = () => {
  return (
    <AutoComplete
      className="h-16 w-full"
      classNameInput="text-xl"
      options={[]}
      emptyMessage="No results"
      leftIcon="search"
      leftIconClassName="size-8"
      placeholder="Movies, shows and more"
      hideIcon
    />
  );
};

export { SearchInput };
