import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import React, { FormEvent, useState } from "react"

const DetailsTextarea = ({
  handleSetDetails,
  detalii,
}: {
  handleSetDetails: (detalii: string) => void
  detalii?: string
}) => {
  const [isAddingDetails, setIsAddingDetails] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    handleSetDetails((formData.get("detalii") as string).trim())
    setIsAddingDetails(false)
  }

  return isAddingDetails ? (
    <form onSubmit={onSubmit}>
      <Label htmlFor="detalii">Alte detalii</Label>
      <Textarea
        placeholder="Adaugă și alte detalii..."
        id="detalii"
        name="detalii"
        defaultValue={detalii ?? ""}
      />
      <Button type="submit">Salvează mesajul</Button>
    </form>
  ) : (
    <div>
      <p className="text-gray-400">- Componentul pentru detalii -</p>
      <p className="whitespace-pre">{detalii}</p>
      <Button onClick={() => setIsAddingDetails(prev => !prev)}>
        {detalii ? "Modifică detaliile" : "Adaugă detalii"}
      </Button>
    </div>
  )
}

export default DetailsTextarea
