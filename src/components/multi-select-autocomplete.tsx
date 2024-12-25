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
import { useVirtualizer } from "@tanstack/react-virtual";

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
  const rowVirtualizerContainer = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(
    (option) =>
      !values.includes(option.value) &&
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const rowVirtualizer = useVirtualizer({
    count: filteredOptions?.length ?? 0,
    getScrollElement: () => rowVirtualizerContainer.current,
    estimateSize: () => 44,
    overscan: 5,
  });

  const handleSelect = useCallback(
    (selectedValue: string) => {
      if (!values.includes(selectedValue)) {
        onValuesChange([...values, selectedValue]);
      }
      // Clear input and focus to open the dropdown
      // This is a hacky way to detect blur
      setInputValue("");
      inputRef.current?.focus();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values],
  );

  const handleRemove = useCallback(
    (valueToRemove: string) => {
      onValuesChange(values.filter((v) => v !== valueToRemove));
      inputRef.current?.focus();
    },
    [values, onValuesChange],
  );

  return (
    <CommandPrimitive
      className={cn("relative z-50", className)}
      shouldFilter={false}
    >
      <div
        className={cn(
          "relative",
          "flex h-11 flex-nowrap items-center gap-2 overflow-hidden rounded-lg bg-secondary px-[12px] py-[8px] text-secondary-foreground",
          classNameInputWrapper,
        )}
        onClick={() => {
          inputRef.current?.focus();
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
      </div>
      <div className="absolute left-0 top-12 w-full">
        <div
          className={cn(
            "w-full cursor-pointer rounded-lg bg-secondary text-secondary-foreground outline-none animate-in fade-in-0 zoom-in-95",
            open ? "block" : "hidden",
          )}
        >
          <CommandList className="cursor-pointer">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandPrimitive.Loading>
            ) : filteredOptions.length > 0 ? (
              <CommandGroup
                ref={rowVirtualizerContainer}
                className="cursor-pointer"
                style={{
                  maxHeight: "300px",
                  width: "100%",
                  overflow: "auto",
                }}
              >
                <div
                  className="cursor-pointer"
                  style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: "100%",
                    position: "relative",
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const filteredOption = filteredOptions[virtualRow.index];

                    if (!filteredOption) return null;

                    const isSelected = values.includes(filteredOption.value);
                    return (
                      <div
                        className="group relative cursor-pointer"
                        key={filteredOption.value}
                      >
                        <CommandItem
                          value={filteredOption.label}
                          onMouseDown={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                          }}
                          onSelect={() => handleSelect(filteredOption.value)}
                          className="flex w-full items-center gap-2 group-hover:bg-primary group-hover:text-primary-foreground"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: `${virtualRow.size}px`,
                            transform: `translateY(${virtualRow.start}px)`,
                          }}
                        >
                          {isSelected ? (
                            <Icon type="check" className="w-5" />
                          ) : null}
                          {filteredOption.label}
                        </CommandItem>
                      </div>
                    );
                  })}
                </div>
              </CommandGroup>
            ) : (
              <CommandPrimitive.Empty className="select-none rounded-lg px-2 py-3 text-center text-base">
                {emptyMessage}
              </CommandPrimitive.Empty>
            )}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};
