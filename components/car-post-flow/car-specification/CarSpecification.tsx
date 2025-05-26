"use client"

import { FormEvent, useState } from "react"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { Label } from "../../ui/label"
import { Masina } from "@/types"
import ImagePreviews from "../../ImagePreviews"
import TipSelect from "./TipSelect"
import TipCombustibilSelect from "./TipCombustibilSelect"
import CutieVitezeSelect from "./CutieVitezeSelect"
import DisplayErrors from "./DisplayErrors"
import EuroPoluantSelect from "./EuroPoluantSelect"

type CarSpecificationProps = {
  initCar?: Masina
  imageFiles: File[]
  handleCarSpecification: (car: Masina) => void
  handleImageFiles: (imageFiles: File[]) => void
}

const CarSpecification = ({
  initCar,
  imageFiles,
  handleCarSpecification,
  handleImageFiles,
}: CarSpecificationProps) => {
  const [tip, setTip] = useState<Masina["tip"]>(initCar?.tip ?? "vanzare")
  const [errors, setErrors] = useState<string[]>([])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const carData = {
      tip: formData.get("tip") as Masina["tip"],
      marca: (formData.get("marca") as string).trim(),
      model: (formData.get("model") as string).trim(),
      an: Number(formData.get("an")) || undefined,
      motorizare: (formData.get("motorizare") as string).trim() || undefined,
      kilometraj: Number(formData.get("kilometraj")) || undefined,
      cai_putere: Number(formData.get("cai_putere")) || undefined,
      cutie_viteze:
        (formData.get("cutie_viteze") as Masina["cutie_viteze"]) || undefined,
      euro_poluant:
        (formData.get("euro_poluant") as Masina["euro_poluant"]) || undefined,
      tip_combustibil:
        (formData.get("tip_combustibil") as Masina["tip_combustibil"]) ||
        undefined,
      pret: Number(formData.get("pret")) || undefined,
      negociabil: formData.has("negociabil"),
    }

    const errors = []
    if (!imageFiles.length && !initCar?.car_images)
      errors.push("Pune măcar o poza")
    if (!carData.marca) errors.push("Marca este obligatorie")
    if (!carData.model) errors.push("Modelul este obligatoriu")
    if (tip === "vanzare" && !carData.pret)
      errors.push("Prețul este obligatoriu")

    if (errors.length === 0)
      handleCarSpecification({
        ...carData,
        id: initCar?.id,
        detalii: initCar?.detalii,
        car_images: initCar?.car_images,
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
          handleImageFiles(files)
        }}
      />

      <ImagePreviews imageFiles={imageFiles} imageUrls={initCar?.car_images} />

      <TipSelect tip={tip} setTip={setTip} />

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
              defaultValue={initCar?.pret ?? ""}
            />
          </div>
          <div>
            <Label htmlFor="negociabil">Negociabil?</Label>
            <Input
              className="h-6 mt-2"
              id="negociabil"
              name="negociabil"
              type="checkbox"
              defaultChecked={initCar?.negociabil ?? false}
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
        defaultValue={initCar?.marca ?? ""}
      />

      <Label htmlFor="model">
        Modelul <span className="text-red-300">*</span>
      </Label>
      <Input
        id="model"
        name="model"
        placeholder="Modelul"
        defaultValue={initCar?.model ?? ""}
      />

      <Label htmlFor="an">Anul</Label>
      <Input
        type="number"
        id="an"
        name="an"
        placeholder="Anul"
        defaultValue={initCar?.an ?? ""}
      />

      <Label htmlFor="motorizare">Motorizarea</Label>
      <Input
        id="motorizare"
        name="motorizare"
        placeholder="Motorizarea"
        defaultValue={initCar?.motorizare ?? ""}
      />

      <TipCombustibilSelect initTipCombustibil={initCar?.tip_combustibil} />

      <Label htmlFor="kilometraj">Kilometrajul</Label>
      <Input
        id="kilometraj"
        type="number"
        name="kilometraj"
        placeholder="Kilometrajul"
        defaultValue={initCar?.kilometraj ?? ""}
      />

      <CutieVitezeSelect initCutieViteze={initCar?.cutie_viteze} />

      <Label htmlFor="cai_putere">Cai putere</Label>
      <Input
        type="number"
        id="cai_putere"
        name="cai_putere"
        placeholder="Cai putere"
        defaultValue={initCar?.cai_putere ?? ""}
      />

      <EuroPoluantSelect initEuroPoluant={initCar?.euro_poluant} />

      <DisplayErrors errors={errors} />

      <Button type="submit">Mai Departe</Button>
    </form>
  )
}

export default CarSpecification
