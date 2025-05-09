import { Button } from "@/components/ui/button"
import { addCar } from "@/lib/actions/app-actions"
import { Masina } from "@/types"
import React, { useState } from "react"
import { toast } from "sonner"

const AddCar = ({ car, imageFiles }: { car: Masina; imageFiles: File[] }) => {
  const [isPosting, setIsPosting] = useState(false)

  const handleAddCar = async () => {
    setIsPosting(true)
    const { success, message } = await addCar(car, imageFiles)

    if (success) toast.success(message)
    else toast.error(message || "Eroare la postare")

    setIsPosting(false)
  }

  return (
    <div className="flex">
      <Button onClick={handleAddCar} className="font-bold" disabled={isPosting}>
        Posteaza anuntul pe platforma {isPosting && "......"}
      </Button>
      <Button className="opacity-30">Posteaza pe fb</Button>
    </div>
  )
}

export default AddCar
