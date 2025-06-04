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
import { formatLabel } from "@/utils/format-utils";
import { euroPoluantOptions } from "@/utils/constants";

const EuroPoluantSelect = ({
  initEuroPoluant,
}: {
  initEuroPoluant: Masina["euro_poluant"];
}) => {
  const [euroPoluant, setEuroPoluant] = useState(initEuroPoluant ?? undefined);

  return (
    <>
      <Label htmlFor="euro_poluant">Euro poluant</Label>
      <Select
        value={euroPoluant || "necompletat"}
        onValueChange={(val) => setEuroPoluant(val as Masina["euro_poluant"])}
      >
        <SelectTrigger size="sm" className="mb-6 w-full">
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
          {euroPoluantOptions.map((value) => (
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
        value={euroPoluant || "necompletat"}
      />
    </>
  );
};

export default EuroPoluantSelect;
