import { Button } from "@/components/ui/button"
import { addCar, addFacebookPostData } from "@/lib/actions/app/actions"
import { makeFacebookPost } from "@/lib/actions/facebook/actions"
import { useDialog } from "@/lib/hooks/useDialog"
import { Masina } from "@/types"
import { getAddCarButtonLabel } from "@/utils/utils"
import { LoaderCircle } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"
import LabeledCheckbox from "./LabeledCheckbox"

const AddCar = ({ car, imageFiles }: { car: Masina; imageFiles: File[] }) => {
  const { closeDialog } = useDialog()
  const [loadingState, setLoadingState] = useState<
    "idle" | "addingCar" | "postingFb" | "savingFbData"
  >("idle")
  const [isPostCarChecked, setIsPostCarChecked] = useState(false)

  //TODO: handle success and error states proeprly
  const handleAddCar = async () => {
    setLoadingState("addingCar")
    const { success, message, carId } = await addCar(
      car,
      imageFiles,
      !isPostCarChecked
    )

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
    const carId = await handleAddCar()

    if (isPostCarChecked && carId) {
      const { postId, mediaIds } = await handleFacebookPost(carId)
      if (postId && mediaIds)
        await handleAddFacebookPostData(carId, postId, mediaIds)
    }

    toast.success("Anunț adăugat cu succes")
    closeDialog()
  }

  return (
    <>
      <LabeledCheckbox
        labelFor="facebook-post"
        checked={isPostCarChecked}
        onChange={checked => setIsPostCarChecked(checked === true)}
        label="Postează și pe facebook"
      />
      <Button
        onClick={handleSubmit}
        className="mt-8 w-full"
        disabled={loadingState !== "idle"}
      >
        {loadingState !== "idle" && (
          <LoaderCircle className="mr-2 animate-spin" />
        )}
        {getAddCarButtonLabel(loadingState, isPostCarChecked)}
      </Button>
    </>
  )
}

export default AddCar
