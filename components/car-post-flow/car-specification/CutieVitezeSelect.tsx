import { Masina } from "@/types/app-types"
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

const CutieVitezeSelect = ({
  initCutieViteze,
}: {
  initCutieViteze: Masina["cutie_viteze"]
}) => {
  const [cutieViteze, setCutieViteze] = useState(initCutieViteze ?? undefined)

  return (
    <>
      <Label htmlFor="cutie_viteze">Cutia de viteze</Label>
      <Select
        value={cutieViteze}
        onValueChange={val => setCutieViteze(val as Masina["cutie_viteze"])}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Alege cutia de viteze" />
        </SelectTrigger>
        <SelectContent className={archivo.className}>
          <SelectItem value="manuala">Manuală</SelectItem>
          <SelectItem value="automata">Automată</SelectItem>
        </SelectContent>
      </Select>
      <input
        type="hidden"
        id="cutie_viteze"
        name="cutie_viteze"
        value={cutieViteze ?? ""}
      />
    </>
  )
}

export default CutieVitezeSelect
