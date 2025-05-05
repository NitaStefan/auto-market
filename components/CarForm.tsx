"use client"

import { addCar } from "@/app/actions/app-actions"
import { useActionState, useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { archivo } from "@/app/fonts"

const CarForm = () => {
  const [state, action, isPending] = useActionState(addCar, null)
  const [tip, setTip] = useState("vanzare")
  const [tipCombustibil, setTipCombustibil] = useState("")
  const [cutieViteze, setCutieViteze] = useState("")
  const [euroPoluant, setEuroPoluant] = useState("")

  return (
    <form action={action}>
      <Label htmlFor="tip">Tipul</Label>
      <Select value={tip} onValueChange={setTip}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className={archivo.className}>
          <SelectItem value="vanzare">De vânzare</SelectItem>
          <SelectItem value="dezmembrari">Dezmembrări</SelectItem>
        </SelectContent>
      </Select>
      <input type="hidden" name="tip" value={tip} />

      {tip === "vanzare" && (
        <div className="flex gap-4">
          <div className="grow">
            <Label htmlFor="pret">Prețul</Label>
            <Input
              name="pret"
              type="number"
              placeholder="Prețul"
              defaultValue={state?.fieldData?.pret}
            />
            {state?.errors?.pret && (
              <p className="text-sm text-red-500">{state?.errors.pret}</p>
            )}
          </div>
          <div>
            <Label htmlFor="negociabil">Negociabil?</Label>
            <Input className="h-6 mt-2" name="negociabil" type="checkbox" />
          </div>
        </div>
      )}

      <Label htmlFor="marca">Marca</Label>
      <Input
        name="marca"
        placeholder="Marca"
        defaultValue={state?.fieldData?.marca}
      />
      {state?.errors?.marca && (
        <p className="text-sm text-red-500">{state?.errors.marca}</p>
      )}

      <Label htmlFor="model">Modelul</Label>
      <Input
        name="model"
        placeholder="Modelul"
        defaultValue={state?.fieldData?.model}
      />
      {state?.errors?.model && (
        <p className="text-sm text-red-500">{state?.errors.model}</p>
      )}

      <Label htmlFor="an">Anul</Label>
      <Input
        defaultValue={state?.fieldData?.an}
        type="number"
        name="an"
        placeholder="Anul"
      />

      <Label htmlFor="motorizare">Motorizarea</Label>
      <Input
        name="motorizare"
        placeholder="Motorizarea"
        defaultValue={state?.fieldData?.motorizare}
      />

      <Label htmlFor="tipCombustibil">Tipul combustibilului</Label>
      <Select value={tipCombustibil} onValueChange={setTipCombustibil}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Alege tipul de combustibil" />
        </SelectTrigger>
        <SelectContent className={archivo.className}>
          <SelectItem value="motorina">Motorină</SelectItem>
          <SelectItem value="benzina">Benzină</SelectItem>
          <SelectItem value="gpl">GPL</SelectItem>
          <SelectItem value="cng">CNG</SelectItem>
          <SelectItem value="electricitate">Electricitate</SelectItem>
          <SelectItem value="hibrid_clasic">Hibrid Clasic</SelectItem>
          <SelectItem value="plug-in_hybrid">Plug-in Hybrid</SelectItem>
          <SelectItem value="mild_hybrid">Mild Hybrid</SelectItem>
          <SelectItem value="biodiesel">Biodiesel</SelectItem>
          <SelectItem value="etanol">Etanol</SelectItem>
          <SelectItem value="hidrogen">Hidrogen</SelectItem>
        </SelectContent>
      </Select>
      <input type="hidden" name="tipCombustibil" value={tipCombustibil} />

      <Label htmlFor="kilometraj">Kilometrajul</Label>
      <Input
        defaultValue={state?.fieldData?.kilometraj}
        type="number"
        name="kilometraj"
        placeholder="Kilometrajul"
      />

      <Label htmlFor="cutieViteze">Cutia de viteze</Label>
      <Select value={cutieViteze} onValueChange={setCutieViteze}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Alege cutia de viteze" />
        </SelectTrigger>
        <SelectContent className={archivo.className}>
          <SelectItem value="manuala">Manuală</SelectItem>
          <SelectItem value="automata">Automată</SelectItem>
        </SelectContent>
      </Select>
      <input type="hidden" name="cutieViteze" value={cutieViteze} />

      <Label htmlFor="caiPutere">Cai putere</Label>
      <Input
        defaultValue={state?.fieldData?.caiPutere}
        type="number"
        name="caiPutere"
        placeholder="Cai putere"
      />

      <Label htmlFor="euroPoluant">Euro poluant</Label>
      <Select value={euroPoluant} onValueChange={setEuroPoluant}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Alege euro poluant" />
        </SelectTrigger>
        <SelectContent className={archivo.className}>
          <SelectItem value="non-euro">Non-Euro</SelectItem>
          <SelectItem value="euro_1">Euro 1</SelectItem>
          <SelectItem value="euro_2">Euro 2</SelectItem>
          <SelectItem value="euro_3">Euro 3</SelectItem>
          <SelectItem value="euro_4">Euro 4</SelectItem>
          <SelectItem value="euro_5">Euro 5</SelectItem>
          <SelectItem value="euro_6">Euro 6</SelectItem>
          <SelectItem value="euro_6a">Euro 6a</SelectItem>
          <SelectItem value="euro_6b">Euro 6b</SelectItem>
          <SelectItem value="euro_6c">Euro 6c</SelectItem>
          <SelectItem value="euro_6d-temp">Euro 6d-TEMP</SelectItem>
          <SelectItem value="euro_6d">Euro 6d</SelectItem>
        </SelectContent>
      </Select>
      <input type="hidden" name="euroPoluant" value={euroPoluant} />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Adăugare..." : "Adaugă"}
      </Button>
      {state?.message && (
        <p className="text-sm text-green-500">{state.message}</p>
      )}
    </form>
  )
}

export default CarForm
