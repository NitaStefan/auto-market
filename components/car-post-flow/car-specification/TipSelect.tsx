import React, { Dispatch, SetStateAction } from "react";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Masina } from "@/types/app-types";

const TipSelect = ({
  tip,
  setTip,
}: {
  tip: Masina["tip"];
  setTip: Dispatch<SetStateAction<Masina["tip"]>>;
}) => {
  return (
    <>
      <Label htmlFor="tip">
        Tipul <span className="text-red-300">*</span>
      </Label>
      <Select value={tip} onValueChange={(tip: Masina["tip"]) => setTip(tip)}>
        <SelectTrigger size="sm" className="mb-2 w-full">
          <SelectValue placeholder="De vânzare sau dezmembrări?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="vanzare">De vânzare</SelectItem>
          <SelectItem value="dezmembrari">Dezmembrări</SelectItem>
        </SelectContent>
      </Select>
      <input type="hidden" id="tip" name="tip" value={tip} />
    </>
  );
};

export default TipSelect;
