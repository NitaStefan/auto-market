import { Button } from "@/components/ui/button"
import { addCar } from "@/lib/actions/app-actions"
import { makeFacebookPost } from "@/lib/actions/facebook-actions"
import { Masina } from "@/types"
import React, { useState } from "react"
import { toast } from "sonner"

const AddCar = ({ car, imageFiles }: { car: Masina; imageFiles: File[] }) => {
  const [isAddingCar, setIsAddingCar] = useState(false)
  const [isPostingOnFb, setIsPostingOnFb] = useState(false)

  const handleAddCar = async (updatedCar: Masina) => {
    setIsAddingCar(true)
    const { success, message } = await addCar(updatedCar, imageFiles)

    if (success) toast.success(message)
    else toast.error(message || "Eroare la adăugare anunț")

    setIsAddingCar(false)
  }

  const handlePostOnFb = async () => {
    const postMessage = "Bugatti Veyron de vanzare \nnegociabil 185.000$"
    setIsPostingOnFb(true)

    const { success, message, postId } = await makeFacebookPost(postMessage)
    if (success) {
      toast.success(message)

      const updatedCar = { ...car, post_id: postId }
      await handleAddCar(updatedCar)
    } else toast.error(message || "Eroare la postare")

    setIsPostingOnFb(false)
  }

  const isDisabled = isAddingCar || isPostingOnFb

  return (
    <div className="flex">
      {/* <Button disabled={true}>
        Posteaza anuntul pe platforma {isAddingCar && "......"}
      </Button> */}
      <Button onClick={handlePostOnFb} disabled={isDisabled}>
        Posteaza pe site si pe fb {isDisabled && "......"}
      </Button>
    </div>
  )
}

export default AddCar
