import { Masina } from "@/types"
import React, { useState } from "react"
import { Label } from "../../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import { archivo } from "@/app/fonts"
import { tipCombustibilOptions } from "@/lib/constants"
import { formatLabel } from "@/lib/custom-utils"

const TipCombustibilSelect = ({
  initTipCombustibil,
}: {
  initTipCombustibil: Masina["tip_combustibil"]
}) => {
  const [tipCombustibil, setTipCombustibil] = useState(
    initTipCombustibil ?? undefined
  )

  return (
    <>
      <Label htmlFor="tip_combustibil">Tipul combustibilului</Label>
      <Select
        value={tipCombustibil}
        onValueChange={value =>
          setTipCombustibil(value as Masina["tip_combustibil"])
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Alege tipul de combustibil" />
        </SelectTrigger>
        <SelectContent className={archivo.className}>
          {tipCombustibilOptions.map(value => (
            <SelectItem key={value} value={value}>
              {formatLabel(value)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input
        type="hidden"
        id="tip_combustibil"
        name="tip_combustibil"
        value={tipCombustibil ?? ""}
      />
    </>
  )
}

export default TipCombustibilSelect
