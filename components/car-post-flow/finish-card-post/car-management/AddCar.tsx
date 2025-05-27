import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { addCar, addFacebookPostData } from "@/lib/actions/app/actions"
import { makeFacebookPost } from "@/lib/actions/facebook/actions"
import { Masina } from "@/types"
import { getAddCarButtonLabel } from "@/utils/utils"
import React, { useState } from "react"
import { toast } from "sonner"

const AddCar = ({ car, imageFiles }: { car: Masina; imageFiles: File[] }) => {
  const [loadingState, setLoadingState] = useState<
    "idle" | "addingCar" | "postingFb" | "savingFbData" | "finished"
  >("idle")
  const [isPostCarChecked, setIsPostCarChecked] = useState(false)

  const handleAddCar = async (car: Masina) => {
    setLoadingState("addingCar")
    const { success, message, carId } = await addCar(car, imageFiles)

    if (!success) toast.error(message || "Eroare la adăugare anunț")

    return carId
  }

  const handleFacebookPost = async (carId: number) => {
    const postMessage = `${car.marca}, ${car.model} - ${car.tip}`
    setLoadingState("postingFb")
    const { success, message, postId, mediaIds } = await makeFacebookPost(
      postMessage,
      carId,
      imageFiles.length
    )

    if (!success) toast.error(message || "Eroare la postare pe facebook")

    return { postId, mediaIds }
  }

  const handleAddFacebookPostData = async (
    carId: number,
    postId: string,
    mediaIds: string[]
  ) => {
    setLoadingState("savingFbData")
    const { success, message } = await addFacebookPostData(
      carId,
      postId,
      mediaIds
    )
    if (!success)
      toast.error(message || "Eroare la postare inserarea datelor facebook")
  }

  const handleSubmit = async () => {
    const carId = await handleAddCar(car)

    if (isPostCarChecked && carId) {
      const { postId, mediaIds } = await handleFacebookPost(carId)
      if (postId && mediaIds)
        await handleAddFacebookPostData(carId, postId, mediaIds)
    }

    setLoadingState("finished")
  }

  return (
    <>
      <div className="flex items-center">
        <Label
          htmlFor="facebook"
          className="cursor-pointer border-3 py-2 pl-4 pr-10 rounded-md w-full text-center"
        >
          Postează și pe facebook
        </Label>
        <div className="-translate-x-8">
          <Checkbox
            id="facebook"
            className="cursor-pointer"
            checked={isPostCarChecked}
            onCheckedChange={checked => setIsPostCarChecked(checked === true)}
          />
        </div>
      </div>
      <Button onClick={handleSubmit} className="mt-8 w-full">
        {getAddCarButtonLabel(loadingState, isPostCarChecked)}
      </Button>
    </>
  )
}

export default AddCar
