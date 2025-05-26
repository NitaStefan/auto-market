import { Button } from "@/components/ui/button"
import { updateCar } from "@/lib/actions/app/actions"
import { MasinaRecord } from "@/types"
import React, { useState } from "react"
import { toast } from "sonner"

const UpdateCar = ({
  car,
  imageFiles,
}: {
  car: MasinaRecord
  imageFiles: File[]
}) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateCar = async () => {
    setIsUpdating(true)
    const { success, message } = await updateCar(car, imageFiles)

    if (success) toast.success(message)
    else toast.error(message || "Eroare la postare")

    setIsUpdating(false)
  }

  return (
    <div className="flex">
      <Button
        onClick={handleUpdateCar}
        className="font-bold"
        disabled={isUpdating}
      >
        Modifica anuntul {isUpdating && "......"}
      </Button>
      <Button className="opacity-30">Reposteaza pe fb</Button>
    </div>
  )
}

export default UpdateCar
