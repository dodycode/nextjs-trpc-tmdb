"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { Command as CommandPrimitive } from "cmdk";
import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "~/lib/utils";
import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Icon, type IconType } from "./icons";
import { Skeleton } from "./ui/skeleton";

export type Option = Record<"value" | "label", string> & Record<string, string>;

interface AutoCompleteProps {
  options: Option[];
  emptyMessage: string;
  value?: string;
  inputValue?: string;
  onValueChange?: (value: string) => void;
  onInputValueChange?: (value: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  classNameInputWrapper?: string;
  hideIcon?: boolean;
  onBlur?: () => void;
  customButton?: React.ReactNode;
  leftIcon?: IconType;
  leftIconClassName?: string;
  rightIcon?: IconType;
  rightIconClassName?: string;
  cmdkRootClassName?: string;
  onFocus?: () => void;
  relativePopover?: boolean;
  classNameInput?: string;
}

export const AutoComplete = ({
  options,
  placeholder,
  emptyMessage,
  value,
  inputValue,
  onInputValueChange,
  onValueChange,
  disabled,
  isLoading = false,
  className,
  classNameInput,
  classNameInputWrapper,
  hideIcon,
  onBlur,
  customButton,
  leftIcon,
  leftIconClassName,
  rightIcon,
  rightIconClassName,
  cmdkRootClassName,
  onFocus,
  relativePopover = false,
}: AutoCompleteProps) => {
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialRenderRef = useRef(true);
  const rowVirtualizerContainer = useRef<HTMLDivElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [input, setInput] = useState<string>(inputValue ?? "");

  const rowVirtualizer = useVirtualizer({
    count: filteredOptions?.length ?? 0,
    getScrollElement: () => rowVirtualizerContainer.current,
    estimateSize: () => 44,
    overscan: 5,
  });

  // Sync input with inputValue prop
  useEffect(() => {
    setInput(inputValue ?? "");
  }, [inputValue]);

  useEffect(() => {
    //If we clear value, we also need to clear input whenever it changes
    if (!value) {
      setInput("");
    }
  }, [value]);

  // Update input when value exists in the first render
  useEffect(() => {
    if (value && initialRenderRef.current) {
      const selectedOption = options.find((option) => option.value === value);
      if (selectedOption) {
        initialRenderRef.current = false;
        setInput(selectedOption.label);
      }
    }
  }, [options, value]);

  useEffect(() => {
    // Reset initialRenderRef when the component unmounts
    return () => {
      initialRenderRef.current = true;
    };
  }, []);

  // Make sure the options are loaded when it's still fetching
  useEffect(() => {
    if (isLoading) return;

    setFilteredOptions(
      options.filter((option) => {
        if (!value) return true;

        return option.value === value;
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, options]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find(
          (option) => option.label === input.value,
        );
        if (optionToSelect) {
          onValueChange?.(optionToSelect.value);
          setOpen(false);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options, onValueChange],
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    if (value) {
      const selectedOption = options.find((option) => option.value === value);
      if (selectedOption) {
        setInput(selectedOption.label);
        onInputValueChange?.(selectedOption.label);
      }
    }

    if (!value) {
      onInputValueChange?.("");
    }

    onBlur?.();
  }, [value, options, onBlur, onInputValueChange]);

  const handleSelectOption = useCallback(
    (selectedValue: string) => {
      const option = options.find((option) => option.value === selectedValue);
      if (option) {
        setInput(option.label);
        onValueChange?.(selectedValue);
        onInputValueChange?.(option.label);
      }
      setOpen(false);
    },
    [onInputValueChange, onValueChange, options],
  );

  const handleSearch = useCallback(
    (search: string) => {
      // Compare with option label instead of value because the value can be different from the label
      setFilteredOptions(
        options.filter((option) =>
          option.label.toLowerCase().includes(search.toLowerCase() ?? []),
        ),
      );
    },
    [options],
  );

  return (
    <CommandPrimitive
      className={cmdkRootClassName}
      onKeyDown={handleKeyDown}
      shouldFilter={false}
      onBlur={handleBlur}
    >
      <div
        className={cn(
          "flex h-11 w-full flex-1 items-center justify-start gap-2 rounded-lg bg-secondary px-3.5 py-2.5 text-base text-secondary-foreground",
          "relative",
          className,
        )}
        onClick={() => {
          setOpen(true);
        }}
        onBlur={handleBlur}
      >
        {leftIcon && (
          <Icon
            type={leftIcon}
            className={cn("h-4 w-4 text-muted-foreground", leftIconClassName)}
          />
        )}
        <CommandInput
          ref={inputRef}
          value={input}
          onValueChange={(value) => {
            setInput(value);
            onInputValueChange?.(value);
            handleSearch(value);
          }}
          onBlur={handleBlur}
          onFocus={() => {
            setOpen(true);
            onFocus?.();
          }}
          placeholder={isLoading ? "Loading..." : placeholder}
          disabled={isLoading || disabled}
          classNameInputWrapper={cn(
            "w-full gap-2 flex items-center px-0 border-0 border-transparent",
            classNameInputWrapper,
          )}
          className={classNameInput}
          hideIcon={hideIcon}
        />
        {rightIcon && (
          <Icon
            type={rightIcon}
            className={cn("h-4 w-4 text-muted-foreground", rightIconClassName)}
          />
        )}
        {customButton && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 transform">
            {customButton}
          </div>
        )}
      </div>
      <div className="relative mt-1">
        <div
          className={cn(
            "w-full cursor-pointer rounded-none bg-secondary text-secondary-foreground outline-none animate-in fade-in-0 zoom-in-95",
            isOpen ? "block" : "hidden",
            !relativePopover ? "absolute top-0 z-20" : "",
          )}
        >
          <CommandList className="cursor-pointer rounded-none">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandPrimitive.Loading>
            ) : filteredOptions.length > 0 ? (
              <CommandGroup
                ref={rowVirtualizerContainer}
                style={{
                  maxHeight: "300px",
                  width: "100%",
                  overflow: "auto",
                }}
              >
                <div
                  style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: "100%",
                    position: "relative",
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const filteredOption = filteredOptions[virtualRow.index];

                    if (!filteredOption) return null;

                    const isSelected = value
                      ? value === filteredOption.value
                      : false;
                    return (
                      <CommandItem
                        key={filteredOption.value}
                        value={filteredOption.label}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        onSelect={() =>
                          handleSelectOption(filteredOption.value)
                        }
                        className={cn(
                          "flex w-full items-center gap-2",
                          !isSelected ? "pl-8" : null,
                        )}
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
                    );
                  })}
                </div>
              </CommandGroup>
            ) : (
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-base">
                {emptyMessage}
              </CommandPrimitive.Empty>
            )}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};
