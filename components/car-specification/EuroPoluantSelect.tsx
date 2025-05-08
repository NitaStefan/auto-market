import { Masina } from "@/types"
import React, { useState } from "react"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { archivo } from "@/app/fonts"
import { formatLabel } from "@/lib/custom-utils"
import { euroPoluantOptions } from "@/lib/constants"

const EuroPoluantSelect = ({
  initEuroPoluant,
}: {
  initEuroPoluant: Masina["euro_poluant"]
}) => {
  const [euroPoluant, setEuroPoluant] = useState(initEuroPoluant)

  return (
    <>
      <Label htmlFor="euro_poluant">Euro poluant</Label>
      <Select
        value={euroPoluant}
        onValueChange={val => setEuroPoluant(val as Masina["euro_poluant"])}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Alege euro poluant" />
        </SelectTrigger>
        <SelectContent className={archivo.className}>
          {euroPoluantOptions.map(value => (
            <SelectItem key={value} value={value}>
              {formatLabel(value)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input
        type="hidden"
        id="euro_poluant"
        name="euro_poluant"
        value={euroPoluant}
      />
    </>
  )
}

export default EuroPoluantSelect
