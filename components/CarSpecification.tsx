"use client"

import { FormEvent, useState } from "react"
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
import { Masina } from "@/types"
import { euroPoluantOptions, tipCombustibilOptions } from "@/lib/constants"
import { formatLabel } from "@/lib/custom-utils"

const CarSpecification = ({
  initCar,
  imagePreviews,
  handleCarSpecification,
  handleImagePreview,
}: {
  initCar: Partial<Masina>
  imagePreviews: string[]
  handleCarSpecification: (car: Masina) => void
  handleImagePreview: (imageFiles: File[]) => void
}) => {
  const [tip, setTip] = useState<Masina["tip"]>(initCar.tip ?? "vanzare")
  const [tipCombustibil, setTipCombustibil] = useState<
    Masina["tipCombustibil"]
  >(initCar.tipCombustibil)
  const [cutieViteze, setCutieViteze] = useState<Masina["cutieViteze"]>(
    initCar.cutieViteze
  )
  const [euroPoluant, setEuroPoluant] = useState<Masina["euroPoluant"]>(
    initCar.euroPoluant
  )
  const [errors, setErrors] = useState<string[]>([])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const uncontrolledCar = {
      marca: (formData.get("marca") as string).trim(),
      model: (formData.get("model") as string).trim(),
      an: Number(formData.get("an")) || undefined,
      motorizare: (formData.get("motorizare") as string).trim() || undefined,
      kilometraj: Number(formData.get("kilometraj")) || undefined,
      caiPutere: Number(formData.get("caiPutere")) || undefined,
      pret: Number(formData.get("pret")) || undefined,
    }

    const errors = []
    if (!imagePreviews.length) errors.push("Pune măcar o poza")
    if (!uncontrolledCar.marca) errors.push("Marca este obligatorie")
    if (!uncontrolledCar.model) errors.push("Modelul este obligatoriu")
    if (tip === "vanzare" && !uncontrolledCar.pret)
      errors.push("Prețul este obligatoriu")

    if (errors.length === 0)
      handleCarSpecification({
        tip,
        tipCombustibil,
        cutieViteze,
        euroPoluant,
        detalii: initCar.detalii,
        ...uncontrolledCar,
      })
    else setErrors(errors)
  }

  return (
    <form onSubmit={onSubmit} className="pr-4 pl-1">
      <Label htmlFor="poze">
        Pozele <span className="text-red-300">*</span>
      </Label>
      <Input
        id="poze"
        type="file"
        multiple
        accept="image/*"
        onChange={e => {
          const files = Array.from(e.target.files || [])
          handleImagePreview(files)
        }}
      />
      {imagePreviews.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-2">
          {imagePreviews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`preview-${index}`}
              className="w-full aspect-square object-cover rounded border"
            />
          ))}
        </div>
      )}

      <Label id="tip-label">
        Tipul <span className="text-red-300">*</span>
      </Label>
      <Select
        aria-labelledby="tip-label"
        value={tip}
        onValueChange={(tip: Masina["tip"]) => setTip(tip)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="De vânzare sau dezmembrări?" />
        </SelectTrigger>
        <SelectContent className={archivo.className}>
          <SelectItem value="vanzare">De vânzare</SelectItem>
          <SelectItem value="dezmembrari">Dezmembrări</SelectItem>
        </SelectContent>
      </Select>

      {tip === "vanzare" && (
        <div className="flex gap-4">
          <div className="grow">
            <Label htmlFor="pret">
              Prețul <span className="text-red-300">*</span>
            </Label>
            <Input
              id="pret"
              name="pret"
              type="number"
              placeholder="Prețul"
              defaultValue={initCar.pret ?? ""}
            />
          </div>
          <div>
            <Label htmlFor="negociabil">Negociabil?</Label>
            <Input
              className="h-6 mt-2"
              id="negociabil"
              name="negociabil"
              type="checkbox"
            />
          </div>
        </div>
      )}

      <Label htmlFor="marca">
        Marca <span className="text-red-300">*</span>
      </Label>
      <Input
        id="marca"
        name="marca"
        placeholder="Marca"
        defaultValue={initCar.marca ?? ""}
      />

      <Label htmlFor="model">
        Modelul <span className="text-red-300">*</span>
      </Label>
      <Input
        id="model"
        name="model"
        placeholder="Modelul"
        defaultValue={initCar.model ?? ""}
      />

      <Label htmlFor="an">Anul</Label>
      <Input
        type="number"
        id="an"
        name="an"
        placeholder="Anul"
        defaultValue={initCar.an ?? ""}
      />

      <Label htmlFor="motorizare">Motorizarea</Label>
      <Input
        id="motorizare"
        name="motorizare"
        placeholder="Motorizarea"
        defaultValue={initCar.motorizare ?? ""}
      />

      <Label id="tipCombustibil-label">Tipul combustibilului</Label>
      <Select
        aria-labelledby="tipCombustibil-label"
        value={tipCombustibil}
        onValueChange={value =>
          setTipCombustibil(value as Masina["tipCombustibil"])
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

      <Label htmlFor="kilometraj">Kilometrajul</Label>
      <Input
        id="kilometraj"
        type="number"
        name="kilometraj"
        placeholder="Kilometrajul"
        defaultValue={initCar.kilometraj ?? ""}
      />

      <Label id="cutieViteze-label">Cutia de viteze</Label>
      <Select
        aria-labelledby="cutieViteze-label"
        value={cutieViteze}
        onValueChange={val => setCutieViteze(val as Masina["cutieViteze"])}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Alege cutia de viteze" />
        </SelectTrigger>
        <SelectContent className={archivo.className}>
          <SelectItem value="manuala">Manuală</SelectItem>
          <SelectItem value="automata">Automată</SelectItem>
        </SelectContent>
      </Select>

      <Label htmlFor="caiPutere">Cai putere</Label>
      <Input
        type="number"
        id="caiPutere"
        name="caiPutere"
        placeholder="Cai putere"
        defaultValue={initCar.caiPutere ?? ""}
      />

      <Label id="euroPoluant-label">Euro poluant</Label>
      <Select
        aria-labelledby="euroPoluant-label"
        value={euroPoluant}
        onValueChange={val => setEuroPoluant(val as Masina["euroPoluant"])}
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
      <div className="flex flex-col gap-2 py-2">
        {errors.map(error => (
          <p
            key={error}
            className="text-sm font-medium rounded-md px-2 py-1 bg-red-100 text-red-500"
          >
            {error}
          </p>
        ))}
      </div>
      <Button type="submit">Mai Departe</Button>
    </form>
  )
}

export default CarSpecification
