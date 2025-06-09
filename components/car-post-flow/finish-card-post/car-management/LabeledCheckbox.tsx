import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";
import Image from "next/image";
import React from "react";
import ActionIcon from "./ActionIcon";

const LabeledCheckbox = ({
  checked,
  onChange,
  label,
  labelFor,
  icon = "app",
  disable = false,
  isOnFb,
}: {
  checked: boolean;
  onChange: (checked: CheckedState) => void;
  label: string;
  labelFor: string;
  icon?: "facebook" | "app";
  disable?: boolean;
  isOnFb?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative flex-1",
        disable && "pointer-events-none opacity-50",
      )}
    >
      <Label
        htmlFor={labelFor}
        className={cn(
          "flex h-full w-full cursor-pointer items-center rounded-md border-3 border-gray-200 py-2 pr-8 pl-2 text-center",
          checked && "border-primary",
        )}
      >
        <Image
          className="mr-1 self-center rounded-lg"
          src={`/logos/${icon}.svg`}
          width={icon === "facebook" ? 22 : 30}
          height={icon === "facebook" ? 22 : 30}
          alt={`${icon} logo`}
        />
        <div className="w-full">
          <div className="flex items-center justify-center gap-1">
            <ActionIcon iconFor={labelFor} />
            <span className="text-left">{label}</span>
          </div>
          {labelFor === "update-post" && (
            <p className="text-txt-secondary-300 mt-[-2px] text-xs">
              postarea actuală
            </p>
          )}
          {labelFor === "update-record" && isOnFb === false && (
            <p className="text-txt-secondary-300 mt-[-2px] text-xs">
              dacă e nevoie
            </p>
          )}
        </div>
      </Label>
      <Checkbox
        id={labelFor}
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
        checked={checked}
        onCheckedChange={onChange}
      />
    </div>
  );
};

export default LabeledCheckbox;
