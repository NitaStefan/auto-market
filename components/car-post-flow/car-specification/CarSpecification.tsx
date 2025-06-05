"use client";

import { FormEvent, useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Masina } from "@/types/app-types";
import ImagePreviews from "../../ImagePreviews";
import TipSelect from "./TipSelect";
import TipCombustibilSelect from "./TipCombustibilSelect";
import CutieVitezeSelect from "./CutieVitezeSelect";
import DisplayErrors from "./DisplayErrors";
import EuroPoluantSelect from "./EuroPoluantSelect";
import ImageInput from "./ImageInput";
import MarcaCombobox from "./MarcaCombobox";

type CarSpecificationProps = {
  initCar?: Masina;
  imageFiles: File[];
  handleCarSpecification: (car: Masina) => void;
  handleImageFiles: (imageFiles: File[]) => void;
};

const CarSpecification = ({
  initCar,
  imageFiles,
  handleCarSpecification,
  handleImageFiles,
}: CarSpecificationProps) => {
  const [tip, setTip] = useState<Masina["tip"]>(initCar?.tip ?? "vanzare");
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const carData = {
      tip: formData.get("tip") as Masina["tip"],
      marca: formData.get("marca") as string,
      model: (formData.get("model") as string).trim(),
      an: Number(formData.get("an")) || undefined,
      motorizare: (formData.get("motorizare") as string).trim() || undefined,
      kilometraj: Number(formData.get("kilometraj")) || undefined,
      cai_putere: Number(formData.get("cai_putere")) || undefined,
      cutie_viteze:
        formData.get("cutie_viteze") === "necompletat"
          ? undefined
          : (formData.get("cutie_viteze") as Masina["cutie_viteze"]),
      euro_poluant:
        formData.get("euro_poluant") === "necompletat"
          ? undefined
          : (formData.get("euro_poluant") as Masina["euro_poluant"]),
      tip_combustibil:
        formData.get("tip_combustibil") === "necompletat"
          ? undefined
          : (formData.get("tip_combustibil") as Masina["tip_combustibil"]),
      pret: Number(formData.get("pret")) || undefined,
      negociabil: formData.has("negociabil"),
    };

    const errors = [];
    if (!imageFiles.length && !initCar?.car_images)
      errors.push("Pune măcar o poză");
    if (!carData.marca) errors.push("Marca este obligatorie");
    if (!carData.model) errors.push("Modelul este obligatoriu");
    if (tip === "vanzare" && !carData.pret)
      errors.push("Prețul este obligatoriu");

    if (errors.length === 0)
      handleCarSpecification({
        ...carData,
        id: initCar?.id,
        detalii: initCar?.detalii,
        car_images: initCar?.car_images,
        facebook_posts: { id: initCar?.facebook_posts?.id },
      });
    else setErrors(errors);
  };

  return (
    <form onSubmit={onSubmit} className="pr-3.5 pl-1">
      <ImageInput handleImageFiles={handleImageFiles} />

      <ImagePreviews imageFiles={imageFiles} imageUrls={initCar?.car_images} />

      <TipSelect tip={tip} setTip={setTip} />

      {tip === "vanzare" && (
        <div className="flex gap-4">
          <div className="relative grow">
            <Label htmlFor="pret">
              Prețul <span className="text-red-300">*</span>
            </Label>
            <Input
              id="pret"
              name="pret"
              type="number"
              placeholder="ex: 15000"
              className="pl-9"
              defaultValue={initCar?.pret ?? ""}
            />
            <span className="absolute bottom-4 left-2 border-r-2 pr-2 leading-none text-gray-600">
              €
            </span>
          </div>

          <div>
            <Label className="cursor-pointer" htmlFor="negociabil">
              Negociabil?
            </Label>
            <Input
              className="mt-1 h-6 cursor-pointer"
              id="negociabil"
              name="negociabil"
              type="checkbox"
              defaultChecked={initCar?.negociabil ?? false}
            />
          </div>
        </div>
      )}

      <MarcaCombobox marca={initCar?.marca} />

      <Label htmlFor="model">
        Modelul <span className="text-red-300">*</span>
      </Label>
      <Input
        id="model"
        name="model"
        placeholder="ex: Sharan"
        defaultValue={initCar?.model ?? ""}
      />

      <Label htmlFor="an">Anul</Label>
      <Input
        type="number"
        id="an"
        name="an"
        placeholder="ex: 2018"
        defaultValue={initCar?.an ?? ""}
      />

      <Label htmlFor="motorizare">Motorizarea</Label>
      <Input
        id="motorizare"
        name="motorizare"
        placeholder="ex: 2.0 TDI"
        defaultValue={initCar?.motorizare ?? ""}
      />

      <TipCombustibilSelect initTipCombustibil={initCar?.tip_combustibil} />

      <div className="relative">
        <Label htmlFor="kilometraj">Kilometrajul</Label>
        <Input
          id="kilometraj"
          type="number"
          name="kilometraj"
          placeholder="ex: 135000"
          className="pl-11.5"
          defaultValue={initCar?.kilometraj ?? ""}
        />
        <span className="absolute bottom-2 left-2 border-r-2 pr-2 text-sm leading-none text-gray-600">
          km
        </span>
      </div>

      <CutieVitezeSelect initCutieViteze={initCar?.cutie_viteze} />

      <Label htmlFor="cai_putere">Cai putere</Label>
      <Input
        type="number"
        id="cai_putere"
        name="cai_putere"
        placeholder="ex: 190"
        defaultValue={initCar?.cai_putere ?? ""}
      />

      <EuroPoluantSelect initEuroPoluant={initCar?.euro_poluant} />

      <DisplayErrors errors={errors} />

      <Button className="w-full font-semibold" type="submit">
        Mai Departe
      </Button>
    </form>
  );
};

export default CarSpecification;
