import React, { Dispatch, SetStateAction, useState } from "react"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Masina } from "@/types"
import { archivo } from "@/app/fonts"

const TipSelect = ({
  tip,
  setTip,
}: {
  tip: Masina["tip"]
  setTip: Dispatch<SetStateAction<Masina["tip"]>>
}) => {
  return (
    <>
      <Label htmlFor="tip">
        Tipul <span className="text-red-300">*</span>
      </Label>
      <Select value={tip} onValueChange={(tip: Masina["tip"]) => setTip(tip)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="De vânzare sau dezmembrări?" />
        </SelectTrigger>
        <SelectContent className={archivo.className}>
          <SelectItem value="vanzare">De vânzare</SelectItem>
          <SelectItem value="dezmembrari">Dezmembrări</SelectItem>
        </SelectContent>
      </Select>
      <input type="hidden" id="tip" name="tip" value={tip} />
    </>
  )
}

export default TipSelect
