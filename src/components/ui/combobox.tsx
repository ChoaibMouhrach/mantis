import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";

interface ComboBoxItem {
  value: string;
  label: string;
}

interface ComboBoxProps {
  items: ComboBoxItem[];
  placeholder?: string;
  select?: boolean;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onLabelChange?: (value: string) => void;
}

export const ComboBox: React.FC<ComboBoxProps> = ({
  items,
  placeholder,
  select,
  defaultValue,
  onValueChange,
  onLabelChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {select === false
            ? placeholder ?? "Select ..."
            : value
            ? items.find((item) => item.value === value)?.label
            : placeholder ?? "Select ..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start" sticky="partial">
        <Command shouldFilter={false}>
          <CommandInput
            onValueChange={onLabelChange}
            placeholder="Search framework..."
          />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {items.length ? (
              items.map((item) => (
                <CommandItem
                  className="cursor-pointer"
                  key={item.value}
                  onSelect={() => {
                    setValue(item.value === value ? "" : item.value);
                    onValueChange?.(item.value);
                    setOpen(false);
                  }}
                >
                  {select !== false ? (
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  ) : null}
                  {item.label}
                </CommandItem>
              ))
            ) : (
              <CommandItem
                className="text-muted-foreground justify-center"
                disabled
              >
                No items found.
              </CommandItem>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
