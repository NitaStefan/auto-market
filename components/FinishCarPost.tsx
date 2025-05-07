import { Masina } from "@/types"
import React, { FormEvent, useState } from "react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { addCar } from "@/app/actions/app-actions"
import ImagePreviews from "./ImagePreviews"

const FinishCarPost = ({
  car,
  handleSetDetails,
  imageFiles,
  goToSpecifications,
}: {
  car: Masina
  handleSetDetails: (detalii: string) => void
  imageFiles: File[]
  goToSpecifications: () => void
}) => {
  const [isAddingDetails, setIsAddingDetails] = useState(false)
  const [isPosting, setIsPosting] = useState(false)

  const handleCarPost = async () => {
    setIsPosting(true)
    await addCar(car, imageFiles)
    setIsPosting(false)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    handleSetDetails((formData.get("detalii") as string).trim())
    setIsAddingDetails(false)
  }

  return (
    <div className="px-1">
      <Button variant="outline" onClick={goToSpecifications}>
        Intoarce-te la specificatii
      </Button>
      <h1 className="text-2xl">Finalizeaza postarea</h1>

      <ImagePreviews imageFiles={imageFiles} />

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
          <Button onClick={handleCarPost} className="font-bold">
            Posteaza anuntul pe platforma {isPosting && "......"}
          </Button>
        </div>
      )}

      <pre>{JSON.stringify(car, null, 2)}</pre>
    </div>
  )
}

export default FinishCarPost
