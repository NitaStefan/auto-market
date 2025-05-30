import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { CheckedState } from "@radix-ui/react-checkbox"
import Image from "next/image"
import React from "react"
import ActionIcon from "./ActionIcon"

const LabeledCheckbox = ({
  checked,
  onChange,
  label,
  labelFor,
  icon = "app",
  disable = false,
}: {
  checked: boolean
  onChange: (checked: CheckedState) => void
  label: string
  labelFor: string
  icon?: "facebook" | "app"
  disable?: boolean
}) => {
  return (
    <div
      className={cn(
        "flex-1 relative",
        disable && "pointer-events-none opacity-50"
      )}
    >
      <Label
        htmlFor={labelFor}
        className={cn(
          "cursor-pointer flex items-center h-full border-3 border-gray-200 py-2 pl-2 pr-8 rounded-md w-full text-center",
          checked && "border-primary"
        )}
      >
        <Image
          className="rounded-lg mr-1 self-center"
          src={`/logos/${icon}.svg`}
          width={22}
          height={22}
          alt={`${icon} logo`}
        />
        <div className="w-full">
          <div className="flex justify-center gap-1 items-center">
            <ActionIcon iconFor={labelFor} />
            <span className="text-left">{label}</span>
          </div>
          {labelFor === "update-post" && (
            <p className="text-xs text-txt-secondary-300 mt-[-2px]">
              postarea actuală
            </p>
          )}
        </div>
      </Label>
      <Checkbox
        id={labelFor}
        className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2"
        checked={checked}
        onCheckedChange={onChange}
      />
    </div>
  )
}

export default LabeledCheckbox
