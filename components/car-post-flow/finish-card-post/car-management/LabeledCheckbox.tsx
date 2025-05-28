import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { CheckedState } from "@radix-ui/react-checkbox"
import Image from "next/image"
import React from "react"

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
        "flex items-center flex-1",
        disable && "pointer-events-none opacity-50"
      )}
    >
      <Label
        htmlFor={labelFor}
        className="cursor-pointer flex items-center h-full border-3 py-2 pl-2 pr-8 rounded-md w-full text-center"
      >
        <Image
          className="rounded-lg mr-1 self-center"
          src={`/logos/${icon}.svg`}
          width={22}
          height={22}
          alt={`${icon} logo`}
        />
        <span className="mx-auto">{label}</span>
      </Label>
      <div className="-translate-x-7">
        <Checkbox
          id={labelFor}
          className="cursor-pointer"
          checked={checked}
          onCheckedChange={onChange}
        />
      </div>
    </div>
  )
}

export default LabeledCheckbox
