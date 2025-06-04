import { Masina } from "@/types/app-types";
import React, { useState } from "react";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const CutieVitezeSelect = ({
  initCutieViteze,
}: {
  initCutieViteze: Masina["cutie_viteze"];
}) => {
  const [cutieViteze, setCutieViteze] = useState(initCutieViteze);

  return (
    <>
      <Label htmlFor="cutie_viteze">Cutia de viteze</Label>
      <Select
        value={cutieViteze || "necompletat"}
        onValueChange={(val) => setCutieViteze(val as Masina["cutie_viteze"])}
      >
        <SelectTrigger size="sm" className="mb-2 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            className="text-muted-foreground italic"
            key="necompletat"
            value="necompletat"
          >
            Necompletat
          </SelectItem>
          <SelectItem value="manuala">Manuală</SelectItem>
          <SelectItem value="automata">Automată</SelectItem>
        </SelectContent>
      </Select>
      <input
        type="hidden"
        id="cutie_viteze"
        name="cutie_viteze"
        value={cutieViteze || "necompletat"}
      />
    </>
  );
};

export default CutieVitezeSelect;
