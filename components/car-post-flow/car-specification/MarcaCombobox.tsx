import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CAR_BRANDS } from "@/utils/constants";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import React from "react";

const MarcaCombobox = ({ marca }: { marca?: string }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(marca || "");

  return (
    <>
      <Label htmlFor="marca">
        Marca <span className="text-red-300">*</span>
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            {value
              ? CAR_BRANDS.find((brand) => brand.value === value)?.label
              : "Selectează marca"}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Caută marca..." />
            <CommandList>
              <CommandEmpty>Marca nu a fost găsită.</CommandEmpty>
              <CommandGroup>
                {CAR_BRANDS.map((brand) => (
                  <CommandItem
                    key={brand.value}
                    value={brand.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === brand.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {brand.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <input type="hidden" id="marca" name="marca" value={value} />
    </>
  );
};

export default MarcaCombobox;
