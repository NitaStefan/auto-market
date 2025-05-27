import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CheckedState } from "@radix-ui/react-checkbox"
import React from "react"

const LabeledCheckbox = ({
  checked,
  onChange,
  label,
  labelFor,
}: {
  checked: boolean
  onChange: (checked: CheckedState) => void
  label: string
  labelFor: string
}) => {
  return (
    <div className="flex items-center grow">
      <Label
        htmlFor={labelFor}
        className="cursor-pointer border-3 py-2 pl-4 pr-10 rounded-md w-full text-center"
      >
        {label}
      </Label>
      <div className="-translate-x-8">
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
