import { Masina } from "@/types"
import React, { FormEvent, useState } from "react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

const FinishCarPost = ({
  car,
  handleSetDetails,
  imagePreviews,
  goToSpecifications,
}: {
  car: Masina
  handleSetDetails: (detalii: string) => void
  imagePreviews: string[]
  goToSpecifications: () => void
}) => {
  const [isAddingDetails, setIsAddingDetails] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    handleSetDetails((formData.get("detalii") as string).trim())
    setIsAddingDetails(false)
  }

  return (
    <div className="px-1">
      <Button onClick={goToSpecifications}>Intoarce-te la specificatii</Button>
      <h1 className="text-2xl">Finalizeaza postarea</h1>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {imagePreviews.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`preview-${index}`}
            className="w-full aspect-square object-cover rounded-sm border"
          />
        ))}
      </div>

      {isAddingDetails ? (
        <form onSubmit={onSubmit}>
          <Label htmlFor="detalii">Your message</Label>
          <Textarea
            placeholder="Adaugă și alte detalii..."
            id="detalii"
            name="detalii"
            defaultValue={car.detalii ?? ""}
          />
          <Button type="submit">Salvează mesajul</Button>
        </form>
      ) : (
        <div>
          <p>- Componentul pentru detalii -</p>
          <p>{car.detalii}</p>
          <Button onClick={() => setIsAddingDetails(prev => !prev)}>
            Adauga detalii
          </Button>
        </div>
      )}

      <pre>{JSON.stringify(car, null, 2)}</pre>
    </div>
  )
}

export default FinishCarPost
