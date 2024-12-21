import { Command as CommandPrimitive } from "cmdk";
import { useCallback, useRef, useState } from "react";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { Icon, type IconType } from "./icons";
import { Skeleton } from "~/components/ui/skeleton";

export interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectAutocompleteProps {
  options: MultiSelectOption[];
  placeholder?: string;
  emptyMessage?: string;
  values: string[];
  onValuesChange: (values: string[]) => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  classNameInputWrapper?: string;
  hideIcon?: boolean;
  onBlur?: () => void;
  leftIcon?: IconType;
  leftIconClassName?: string;
}

export const MultiSelectAutocomplete = ({
  options,
  placeholder,
  emptyMessage = "No results found.",
  values,
  onValuesChange,
  disabled = false,
  isLoading = false,
  className,
  classNameInputWrapper,
  hideIcon,
  onBlur,
  leftIcon,
  leftIconClassName,
}: MultiSelectAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSelect = useCallback(
    (selectedValue: string) => {
      if (!values.includes(selectedValue)) {
        onValuesChange([...values, selectedValue]);
      }
      setInputValue("");
      setOpen(false);
      inputRef.current?.blur();
    },
    [values, onValuesChange],
  );

  const handleRemove = useCallback(
    (valueToRemove: string) => {
      onValuesChange(values.filter((v) => v !== valueToRemove));
    },
    [values, onValuesChange],
  );

  const filteredOptions = options.filter(
    (option) =>
      !values.includes(option.value) &&
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "flex h-11 flex-wrap items-center gap-2 rounded-lg bg-secondary px-[12px] py-[8px] text-secondary-foreground",
          classNameInputWrapper,
        )}
        onClick={() => {
          setOpen(true);
        }}
        onBlur={() => {
          setOpen(false);
          onBlur?.();
        }}
      >
        {leftIcon && (
          <Icon
            type={leftIcon}
            className={cn("text-muted-foreground", leftIconClassName)}
          />
        )}
        {values.map((value) => {
          const option = options.find((o) => o.value === value);
          return (
            <Badge key={value} variant="secondary">
              {option?.label}
              <button
                type="button"
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRemove(value);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleRemove(value)}
              >
                <Icon
                  type="close"
                  className="h-3 w-3 text-muted-foreground hover:text-foreground"
                />
              </button>
            </Badge>
          );
        })}
        <CommandPrimitive className="flex-1" shouldFilter={false}>
          <div className="flex items-center">
            <CommandInput
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => {
                setOpen(false);
                onBlur?.();
              }}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              disabled={disabled}
              className="h-auto flex-1 bg-transparent py-0 outline-none"
              classNameInputWrapper="border-none bg-transparent flex-1"
              hideIcon
            />
            {!hideIcon && (
              <Icon
                type="caretDownAndUp"
                className="ml-2 shrink-0 translate-y-[3px] scale-[1.2] opacity-50"
              />
            )}
          </div>
          {open && (
            <CommandList className="absolute left-0 top-full z-20 mt-1 w-full rounded-none bg-secondary text-secondary-foreground shadow-md outline-none animate-in">
              {isLoading ? (
                <CommandGroup>
                  <Skeleton className="h-8 w-full" />
                </CommandGroup>
              ) : null}
              {filteredOptions.length > 0 && !isLoading ? (
                <CommandGroup>
                  {filteredOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleSelect(option.value)}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {!isLoading && filteredOptions.length === 0 ? (
                <CommandGroup>
                  <CommandItem
                    className="select-none rounded-sm px-2 py-3 text-center text-base"
                    disabled
                  >
                    {emptyMessage}
                  </CommandItem>
                </CommandGroup>
              ) : null}
            </CommandList>
          )}
        </CommandPrimitive>
      </div>
    </div>
  );
};
