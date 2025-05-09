import { Button } from "@/components/ui/button"
import { deleteCar } from "@/lib/actions/app-actions"
import { MasinaRecord } from "@/types"
import React, { useState } from "react"
import { toast } from "sonner"

const DeleteCar = ({ car }: { car: MasinaRecord }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteCar = async () => {
    setIsDeleting(true)
    const { success, message } = await deleteCar(car.id, car.car_images)

    if (success) toast.success(message)
    else toast.error(message || "Eroare la postare")

    setIsDeleting(false)
  }

  return (
    <div className="flex">
      <Button
        onClick={handleDeleteCar}
        className="font-bold"
        disabled={isDeleting}
      >
        Sterge de pe platforma {isDeleting && "......"}
      </Button>
      <Button className="opacity-30">Posteaza pe fb</Button>
    </div>
  )
}

export default DeleteCar
